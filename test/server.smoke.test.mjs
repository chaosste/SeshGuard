import test, { after } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

async function getAvailablePort() {
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");

  const address = probe.address();
  if (!address || typeof address === "string") {
    probe.close();
    throw new Error("FAILED_TO_RESOLVE_PORT");
  }

  const { port } = address;
  probe.close();
  await once(probe, "close");
  return port;
}

async function waitForServer(url, timeoutMs = 10000) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) {
        return;
      }
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw lastError || new Error("SERVER_START_TIMEOUT");
}

async function startServer() {
  const port = await getAvailablePort();
  const cwd = fileURLToPath(new URL("..", import.meta.url));
  const server = spawn("node", ["server.js"], {
    cwd,
    env: {
      ...process.env,
      PORT: String(port),
      SHARED_ENV_PATH: "/tmp/definitely-missing-seshguard.env",
      GEMINI_API_KEY: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  server.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const url = `http://127.0.0.1:${port}`;
  await waitForServer(url);

  const stop = async () => {
    if (server.exitCode !== null) {
      return;
    }

    server.kill("SIGINT");
    await once(server, "exit");
  };

  after(stop);

  return { url, stop };
}

test("health endpoint reports ok", async () => {
  const { url } = await startServer();
  const response = await fetch(`${url}/api/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test("interaction explanation endpoint validates required fields", async () => {
  const { url } = await startServer();
  const response = await fetch(`${url}/api/interaction-explanation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ drug1: "LSD" }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: {
      code: "REQUEST_FAILED",
      message: "Missing required interaction fields.",
    },
  });
});

test("drug summary endpoint surfaces missing API key as a service outage", async () => {
  const { url } = await startServer();
  const response = await fetch(`${url}/api/drug-summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ drug1Name: "LSD" }),
  });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: {
      code: "API_KEY_MISSING",
      message: "AI features are currently unavailable.",
    },
  });
});
