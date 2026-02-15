import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    px: 3,
  } as SxProps<Theme>,

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    bgcolor: "action.hover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,

  icon: (theme: Theme) => ({
    fontSize: 32,
    color: theme.palette.custom.textBody,
  }),

  title: {
    color: "text.primary",
    fontWeight: 600,
    textAlign: "center",
  } as SxProps<Theme>,

  subtitle: (theme: Theme) => ({
    color: theme.palette.custom.textFaint,
    fontSize: 14,
    textAlign: "center",
    maxWidth: 440,
    lineHeight: 1.6,
  }),

  suggestionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    justifyContent: "center",
    maxWidth: 520,
    mt: 1,
  } as SxProps<Theme>,

  suggestionChip: (theme: Theme) => ({
    borderColor: theme.palette.custom.borderMedium,
    color: theme.palette.custom.textMuted,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.15s",
    "&:hover": {
      borderColor: theme.palette.custom.borderHover,
      bgcolor: theme.palette.custom.surface,
      color: theme.palette.text.primary,
    },
  }),
};
