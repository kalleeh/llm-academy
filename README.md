# LLM Academy

An interactive web app that teaches AI, ML, and Large Language Models through 18 modules with simulated terminals, filesystem explorers, interactive visualizations, and knowledge checks.

**Live:** [llm-academy.gurum.se](https://llm-academy.gurum.se)

## Features

- **Two learning tracks:** Technical (for developers/engineers) and Business (for non-technical professionals)
- **18 modules** covering the full AI/ML/LLM stack — from "What's an AI Problem?" to "Fine-Tuning Hands-On"
- **Interactive elements:** simulated terminals, file explorers, decision trees, cost calculators, step-through demos
- **Learning science:** spaced repetition review, retrieval practice quizzes, self-explanation prompts
- **3 languages:** English, Swedish (Svenska), Korean (한국어)
- **PWA:** installable, works offline
- **Dark theme:** zinc palette with amber accents, monospace for code

## Tech Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- No router — state-based navigation via `useState`
- No external UI/charting libraries — all visualizations are plain HTML/CSS/SVG + React state
- Hosted on AWS: S3 + CloudFront + ACM + Route53

## Getting Started

```bash
npm install
npm run dev     # Start dev server
npm run build   # Build for production (tsc + vite build)
npm run preview # Preview production build
```

## Project Structure

```
src/
├── App.tsx                    # Main app — sidebar nav, module routing, progress tracking
├── DifficultyContext.tsx       # Business/Technical track toggle
├── LanguageContext.tsx         # EN/SV/KO language switching
├── useT.tsx                   # Translation hook
├── ui-labels.ts               # UI string translations + module labels
├── quiz-translations.ts       # Quiz question translations
├── selfexplain-translations.ts # SelfExplain prompt translations
├── components/
│   ├── SimulatedTerminal.tsx   # Step-through CLI with animation
│   ├── FileExplorer.tsx        # Clickable file tree
│   ├── Workspace.tsx           # Terminal + filesystem side-by-side
│   ├── InteractiveDemo.tsx     # Step-through with min-height tracker
│   ├── CodeBlock.tsx           # Syntax-highlighted code display
│   ├── Icon.tsx                # 60+ custom SVG icons
│   ├── KnowledgeCheck.tsx      # MC + free-recall quizzes
│   ├── SelfExplain.tsx         # "Explain it" prompts
│   ├── SpacedReview.tsx        # Spaced repetition system
│   ├── ModuleLayout.tsx        # Module wrapper with scroll-reveal
│   └── Reveal.tsx              # Scroll-triggered animations
└── modules/
    ├── AIProblemModule.tsx      # Module 1: What's an AI Problem?
    ├── DataFoundationsModule.tsx # Module 2: Data Foundations
    ├── TokensModule.tsx         # Module 3: Tokens & Tokenizers
    ├── ...                      # Modules 4-18
    └── [module]/
        ├── SectionName.tsx      # Technical track section
        ├── SectionNameBusiness.tsx # Business track section
        ├── translations.ts      # Business SV/KO translations
        └── tech-translations.ts # Technical SV/KO translations
```

## Deployment

```bash
npm run build
aws s3 sync dist/ s3://llm-academy-gurum-se/ --delete
aws cloudfront create-invalidation --distribution-id E2TWEQEC71DPUY --paths '/*'
```

## License

MIT
