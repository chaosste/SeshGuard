<div align="center">

# 🛡️ SeshGuard

**AI-Assisted Educational Harm-Reduction Tool**

*Granular interaction guide for identifying pharmacological risks and interactions*

**Live demo:** [www.seshguard.newpsychonaut.com](https://www.seshguard.newpsychonaut.com/) · [seshguard.azurewebsites.net](https://seshguard.azurewebsites.net)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<img src="docs/assets/seshguard-demo.gif" width="900" alt="SeshGuard demo" />

</div>

---

## What it is

SeshGuard is an interactive safety and harm-reduction guide designed to help users quickly identify potential risks and interactions between various substances. Powered by the Gemini API, it provides rapid interaction readouts and summaries based on established pharmacological data, allowing users to make more informed decisions.

With a dark-mode glassmorphism aesthetic and clear visual risk indicators, SeshGuard keeps critical safety information accessible and easy to digest.
## Why it matters

- 🔍 **Interaction Risk Matrix** — instantly compare substances for contraindicated pairings
- 🤖 **AI-Generated Insights** — clear, synthesized explanations of potential pharmacological interactions
- 💾 **Local Favorites Storage** — save key interaction pairs in browser local storage
- 🎨 **Clear Visual Hierarchy** — color-coded risk levels (Warning, Danger, Unknown) for rapid assessment
- 📱 **Mobile-Responsive Design** — accessible on the go when quick information is needed

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| AI | Google Gemini API |
| Design | Tailwind CSS, Lucide Icons, Framer Motion |
| Deployment | Azure App Service (Linux) |

## Quickstart

```bash
# Clone the repository
git clone https://github.com/chaosste/SeshGuard.git
cd SeshGuard

# Install dependencies
npm install

# Configure your Gemini API key in .env.local
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Type-check
npm run lint
```

## Related Projects

> 💡 **Looking for ceremonial guidance?** See **[EntheoGen Mixed Modality Guide](https://github.com/chaosste/EntheoGen)** — a deterministic, evidence-grounded fork of SeshGuard designed specifically for clinical and ceremonial contexts.

## Disclaimer

SeshGuard provides educational harm-reduction guidance only. It **does not** provide medical, psychological, or therapeutic advice. Interaction ratings are sourced from a curated dataset and can include unknown gaps. If you suspect toxicity, serotonin syndrome, or a hypertensive crisis, seek immediate medical help.

---

<div align="center">

**Built by [Steve Beale](https://newpsychonaut.com)**

[newpsychonaut.com](https://newpsychonaut.com)

© 2026 Stephen Beale. MIT License.

</div>
