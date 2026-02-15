# Data Viz Chat

A ChatGPT-style application that lets you upload Excel files and ask questions about your data using natural language. Powered by Claude Opus 4.6 via OpenRouter, it returns clear answers along with interactive Highcharts visualizations.

## Features

- **Landing page with data upload** -- Upload Excel files via drag & drop or file browser before accessing the chat
- **ChatGPT-style UI** -- Dark theme, centered chat, left sidebar with loaded files
- **Excel file upload** -- Support for `.xlsx`, `.xls`, and `.csv` files (multiple files, multiple sheets)
- **Data preview** -- Automatic table preview displayed in the chat after upload
- **Natural language Q&A** -- Ask questions about your data in plain English
- **Auto-generated visualizations** -- Claude analyzes your data and generates Highcharts configs (pie, bar, line, area, scatter, heatmap, etc.)
- **Markdown rendering** -- Rich text formatting in assistant responses (bold, lists, tables, code blocks)
- **Typing indicator** -- Animated dots while Claude is generating a response

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: MUI (Material UI) with custom dark theme and semantic palette tokens
- **Charts**: Highcharts
- **LLM**: Claude Opus 4.6 via Vercel AI SDK + OpenRouter provider
- **Excel parsing**: SheetJS (xlsx)
- **Markdown**: react-markdown
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenRouter API key ([openrouter.ai/keys](https://openrouter.ai/keys))

### Installation

```bash
npm install
```

### Configuration

Create a `.env.local` file at the project root:

```
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx                  -- Root layout with MUI ThemeProvider
    page.tsx                    -- Main page, state orchestration
    page.styles.ts              -- Page-level styles
    globals.css                 -- Base styles
    api/
      upload/route.ts           -- API: Excel file parsing
      chat/route.ts             -- API: Claude integration via OpenRouter
  components/
    ChartRenderer/              -- Dynamic Highcharts rendering
    ChatInput/                  -- Input bar with send button
    ChatInterface/              -- Chat area (messages + input)
    DataPreviewMessage/         -- Data table preview in chat
    DataSourceScreen/           -- Landing page with file upload
    MessageBubble/              -- User/assistant message bubble with Markdown
    Sidebar/                    -- Left sidebar with loaded files
    TypingIndicator/            -- Animated typing dots
    WelcomeScreen/              -- Welcome screen with suggestion chips
  lib/
    excel-parser.ts             -- Excel to JSON parsing utilities
    prompt-builder.ts           -- System prompt construction with data context
    theme.ts                    -- MUI dark theme with custom palette tokens
  types/
    index.ts                    -- Shared TypeScript types
```

## How It Works

1. Open the app -- a landing page invites you to upload an Excel file (drag & drop or browse)
2. The file is parsed server-side and the app transitions to the chat view with a data preview
3. Ask a question in natural language (e.g. "Show me a breakdown by category as a pie chart")
4. The question + data schema + data rows are sent to Claude Opus 4.6 via OpenRouter
5. Claude returns a JSON response: text answer + Highcharts config
6. The answer (rendered as Markdown) and chart are displayed in the chat
