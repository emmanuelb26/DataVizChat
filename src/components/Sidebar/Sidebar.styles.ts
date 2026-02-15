import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: (theme: Theme) => ({
    width: 260,
    minWidth: 260,
    height: "100vh",
    bgcolor: theme.palette.custom.sidebar,
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${theme.palette.divider}`,
  }),

  fileListContainer: {
    flex: 1,
    overflow: "auto",
    py: 1,
  } as SxProps<Theme>,

  emptyText: {
    color: "text.disabled",
    fontSize: 13,
    textAlign: "center",
    mt: 3,
    px: 2,
  } as SxProps<Theme>,

  sectionTitle: (theme: Theme) => ({
    color: theme.palette.custom.textFaint,
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    px: 2,
    py: 1,
  }),

  fileItem: {
    mx: 1,
    borderRadius: 1.5,
    mb: 0.5,
    "&.Mui-selected": {
      bgcolor: "action.selected",
    },
    "&:hover": {
      bgcolor: "action.hover",
    },
  } as SxProps<Theme>,

  fileIcon: {
    minWidth: 32,
  } as SxProps<Theme>,

  fileIconSvg: {
    fontSize: 18,
    color: "custom.textMuted",
  },

  filePrimaryText: {
    fontSize: 13,
    color: "text.primary",
    noWrap: true,
  },

  fileSecondaryText: {
    fontSize: 11,
    color: "custom.textFaint",
  },

  deleteButton: {
    opacity: 0.4,
    "&:hover": { opacity: 1, color: "error.main" },
  } as SxProps<Theme>,

  deleteIcon: {
    fontSize: 16,
  },

  footer: (theme: Theme) => ({
    p: 2,
    borderTop: `1px solid ${theme.palette.divider}`,
  }),

  footerText: {
    color: "custom.textFaintest",
    fontSize: 11,
    textAlign: "center",
  } as SxProps<Theme>,
};
