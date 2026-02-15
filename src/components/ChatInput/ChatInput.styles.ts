import type { SxProps, Theme } from "@mui/material";

export const styles = {
  wrapper: {
    maxWidth: 768,
    mx: "auto",
    width: "100%",
    px: { xs: 2, md: 0 },
    pb: 2,
  } as SxProps<Theme>,

  inputBar: (theme: Theme) => ({
    display: "flex",
    alignItems: "flex-end",
    gap: 0.5,
    bgcolor: theme.palette.background.paper,
    borderRadius: 3,
    border: `1px solid ${theme.palette.action.selected}`,
    px: 1.5,
    py: 1,
    transition: "border-color 0.2s",
    "&:focus-within": {
      borderColor: theme.palette.custom.borderStrong,
    },
  }),

  textFieldInput: (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontSize: 14,
    lineHeight: 1.5,
    py: 0.75,
    "& ::placeholder": {
      color: theme.palette.custom.textFaint,
      opacity: 1,
    },
  }),

  sendButton: (hasText: boolean, isLoading: boolean) =>
    (theme: Theme) => ({
      bgcolor: hasText && !isLoading ? "#ffffff" : theme.palette.action.disabledBackground,
      color: hasText && !isLoading ? "#000000" : theme.palette.text.disabled,
      width: 32,
      height: 32,
      mb: 0.25,
      "&:hover": {
        bgcolor: hasText && !isLoading ? "#e0e0e0" : theme.palette.action.disabledBackground,
      },
      "&.Mui-disabled": {
        bgcolor: theme.palette.action.disabledBackground,
        color: theme.palette.text.disabled,
      },
    }),

  sendIcon: {
    fontSize: 16,
  },

  loadingSpinner: {
    color: "custom.textMuted",
  },

  disclaimer: {
    textAlign: "center",
    mt: 1,
  } as SxProps<Theme>,

  disclaimerText: {
    color: "custom.textFaintest",
    fontSize: 11,
  } as SxProps<Theme>,
};
