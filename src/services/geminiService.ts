type ApiErrorCode = "API_KEY_MISSING" | "QUOTA_EXCEEDED" | "REQUEST_FAILED";

type ApiErrorResponse = {
  error?: {
    code?: ApiErrorCode | string;
    message?: string;
  };
};

async function postJson<TResponse>(path: string, body: Record<string, unknown>) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let payload: ApiErrorResponse | null = null;

    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    throw new Error(payload?.error?.code || "REQUEST_FAILED");
  }

  return response.json() as Promise<TResponse>;
}

export async function getInteractionExplanation(
  drug1: string,
  drug2: string,
  interactionLabel: string,
  interactionDescription: string
) {
  const payload = await postJson<{ text: string }>("/api/interaction-explanation", {
    drug1,
    drug2,
    interactionLabel,
    interactionDescription,
  });

  return payload.text;
}

export async function getDrugSummary(drug1Name: string, drug2Name?: string) {
  const payload = await postJson<{ text: string }>("/api/drug-summary", {
    drug1Name,
    drug2Name,
  });

  return payload.text;
}
