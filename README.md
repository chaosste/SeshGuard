<div align="center">

# SeshGuard

**Psychedelic + medication interaction checker for practical harm reduction**

**Live demo:** [seshguard.azurewebsites.net](https://seshguard.azurewebsites.net)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## About

SeshGuard helps people quickly assess interaction risk between substances and medication classes, then provides plain-language guidance to support safer decision-making.

The app combines curated interaction classifications with concise explanatory output for user readability.

## Features

- Interaction lookup for common psychedelic and medication pairings
- Risk-level outputs designed for fast scanning
- AI-assisted plain-language explanations (when configured)
- Local-first UX with transparent safety framing
- Mobile-friendly interface for in-the-moment checks

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| AI | Google Gemini API (`@google/genai`) |
| Deployment | Azure App Service (Linux) |

## Installation

```bash
# Clone
git clone https://github.com/chaosste/SeshGuard.git
cd SeshGuard

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# set GEMINI_API_KEY in .env.local

# Run locally
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Related Projects

- [EntheoGen](https://github.com/chaosste/EntheoGen) - ceremonial interaction guidance variant
- [NeuroPhenom-AI](https://github.com/chaosste/NeuroPhenom-AI) - interview + analysis platform
- [MicroPhenom-AI-1](https://github.com/chaosste/MicroPhenom-AI-1) - focused reporting edition
- [Anubis](https://github.com/chaosste/Anubis) - themed trip-report interview system

## Disclaimer

SeshGuard is educational harm-reduction software. It is not medical advice and does not replace professional clinical guidance.

---

<div align="center">

Built by [Steve Beale](https://newpsychonaut.com)

[newpsychonaut.com](https://newpsychonaut.com)

</div>
