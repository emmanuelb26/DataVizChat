"use client";

import { createTheme } from "@mui/material/styles";

// -- Module augmentation for custom palette tokens --
declare module "@mui/material/styles" {
  interface Palette {
    custom: typeof customTokens;
  }
  interface PaletteOptions {
    custom?: typeof customTokens;
  }
}

const customTokens = {
  // Surfaces
  sidebar: "#171717",
  surface: "rgba(255,255,255,0.03)",
  surfaceLight: "rgba(255,255,255,0.06)",
  tableHeader: "#1a1a1a",
  tooltip: "#2d2d2d",
  codeBlock: "rgba(0,0,0,0.3)",

  // Avatars
  userAvatar: "#5C5C5C",

  // Text (beyond MUI's text.primary / text.secondary / text.disabled)
  textBright: "rgba(255,255,255,0.9)",
  textBody: "rgba(255,255,255,0.75)",
  textMuted: "rgba(255,255,255,0.5)",
  textFaint: "rgba(255,255,255,0.35)",
  textFaintest: "rgba(255,255,255,0.25)",

  // Borders
  borderSubtle: "rgba(255,255,255,0.04)",
  borderLight: "rgba(255,255,255,0.06)",
  borderMedium: "rgba(255,255,255,0.15)",
  borderStrong: "rgba(255,255,255,0.25)",
  borderHover: "rgba(255,255,255,0.35)",
  borderFocus: "rgba(255,255,255,0.5)",

  // Drag & drop
  dragBorder: "rgba(100,180,255,0.6)",
  dragBg: "rgba(100,180,255,0.06)",

  // Chart colors
  chartColors: [
    "#7B61FF",
    "#00D1B2",
    "#FF6B6B",
    "#4ECDC4",
    "#FFE66D",
    "#A8E6CF",
    "#FF8A80",
    "#82B1FF",
    "#B388FF",
    "#F48FB1",
  ],
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#212121",
      paper: "#2f2f2f",
    },
    primary: {
      main: "#7B61FF",
    },
    text: {
      primary: "rgba(255,255,255,0.85)",
      secondary: "rgba(255,255,255,0.55)",
      disabled: "rgba(255,255,255,0.3)",
    },
    error: {
      main: "#ef5350",
    },
    divider: "rgba(255,255,255,0.08)",
    action: {
      hover: "rgba(255,255,255,0.06)",
      selected: "rgba(255,255,255,0.1)",
      disabled: "rgba(255,255,255,0.3)",
      disabledBackground: "rgba(255,255,255,0.1)",
    },
    custom: customTokens,
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.background.default,
          margin: 0,
          padding: 0,
          overflow: "hidden",
        },
        "*::-webkit-scrollbar": {
          width: 6,
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          background: themeParam.palette.custom.borderMedium,
          borderRadius: 3,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: themeParam.palette.custom.borderStrong,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
