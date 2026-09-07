# Revora 🚀

> **Mobile-First Customer Review Assistant** — Turn real experiences into better, high-converting customer reviews with zero-hallucination AI.

![Revora Banner](public/revora-banner.png)

Revora is a privacy-focused, policy-compliant web application designed to help local businesses collect authentic, high-quality customer reviews. By offering a guided mobile-first feedback experience powered by strictly grounded AI, Revora transforms quick customer thoughts into articulate, detailed reviews for platforms like **Google Business Profile**.

---

## ✨ Features

- ⚡ **Instant Campaign Link & QR Generation**: Create customized review collection flows in seconds without needing account setups or databases.
- 📱 **Mobile-Optimized Guided Flow**: Prompts customers with simple questions (service quality, highlights, atmosphere) to capture authentic feedback effortlessly.
- 🤖 **Grounded Zero-Hallucination AI**: Polishes customer input into cohesive sentences strictly using only the facts provided by the customer—ensuring 100% authenticity.
- 🛡️ **100% Policy Compliant**: Non-gated flow fully compliant with Google and platform guidelines. It encourages honest feedback without hiding negative reviews or offering biased incentives.
- 📋 **One-Tap Google Review Export**: Customers can copy their AI-enhanced draft with one click and jump straight to the business's Google Business Review form.
- 🔗 **URL-Encoded Portable Campaigns**: Campaign data compresses directly into shareable links, enabling zero-database deployment capabilities.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `lz-string` (URL Compression), `qrcode.react` (QR Code Generator), `canvas-confetti`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/revora.git
   cd revora
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.example` to `.env` (or setup backend serverless endpoints):
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

- `npm run dev` — Launches the Vite local development server.
- `npm run build` — Compiles TypeScript (`tsc`) and builds the production bundle with Vite.
- `npm run preview` — Locally previews the built production output.
- `npm run lint` — Runs ESLint to check for code issues.

---

## 🔒 Privacy & AI Grounding Principles

1. **Zero Hallucination Guarantee**: The AI assistant only rephrases user-selected tokens and notes. It never adds unmentioned facts, services, or fake praise.
2. **Privacy First**: Customer feedback remains client-side or processed ephemerally without persistent user tracking.
3. **Google Review Policy Compliance**: Revora does not perform review gating or filter negative feedback, adhering strictly to platform developer & review guidelines.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.
