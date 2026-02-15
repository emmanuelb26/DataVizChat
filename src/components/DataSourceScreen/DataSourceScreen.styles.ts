import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    bgcolor: "background.default",
    px: 3,
    gap: 3,
  } as SxProps<Theme>,

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    bgcolor: "action.hover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,

  icon: (theme: Theme) => ({
    fontSize: 40,
    color: theme.palette.custom.textBody,
  }),

  title: (theme: Theme) => ({
    color: theme.palette.custom.textBright,
    fontWeight: 600,
    textAlign: "center",
  }),

  subtitle: (theme: Theme) => ({
    color: theme.palette.custom.textFaint,
    fontSize: 15,
    textAlign: "center",
    maxWidth: 480,
    lineHeight: 1.6,
  }),

  dropzone: (theme: Theme) => ({
    width: "100%",
    maxWidth: 520,
    border: `2px dashed ${theme.palette.custom.borderMedium}`,
    borderRadius: 3,
    py: 6,
    px: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: theme.palette.custom.borderHover,
      bgcolor: theme.palette.custom.surface,
    },
  }),

  dropzoneActive: (theme: Theme) => ({
    width: "100%",
    maxWidth: 520,
    border: `2px dashed ${theme.palette.custom.dragBorder}`,
    borderRadius: 3,
    py: 6,
    px: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    cursor: "pointer",
    bgcolor: theme.palette.custom.dragBg,
    transition: "all 0.2s ease",
  }),

  uploadIcon: {
    fontSize: 48,
    color: "custom.textFaint",
  },

  dropzoneText: {
    color: "text.secondary",
    fontSize: 15,
    textAlign: "center",
  } as SxProps<Theme>,

  browseButton: (theme: Theme) => ({
    mt: 1,
    textTransform: "none",
    borderColor: theme.palette.custom.borderStrong,
    color: theme.palette.custom.textBody,
    fontSize: 14,
    px: 3,
    py: 1,
    "&:hover": {
      borderColor: theme.palette.custom.borderFocus,
      bgcolor: theme.palette.custom.surfaceLight,
    },
  }),

  formatsHint: {
    color: "text.disabled",
    fontSize: 12,
    textAlign: "center",
  } as SxProps<Theme>,

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    mt: 2,
  } as SxProps<Theme>,

  loadingText: {
    color: "custom.textMuted",
    fontSize: 14,
  } as SxProps<Theme>,

  errorText: {
    color: "error.main",
    fontSize: 13,
    textAlign: "center",
    maxWidth: 480,
  } as SxProps<Theme>,
};
