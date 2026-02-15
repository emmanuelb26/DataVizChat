import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: (theme: Theme) => ({
    bgcolor: theme.palette.custom.surface,
    borderRadius: 2,
    border: `1px solid ${theme.palette.action.selected}`,
    overflow: "hidden",
  }),

  header: (theme: Theme) => ({
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 2,
    borderBottom: `1px solid ${theme.palette.custom.borderLight}`,
  }),

  headerIcon: {
    fontSize: 20,
    color: "primary.main",
  },

  headerInfo: {
    flex: 1,
  } as SxProps<Theme>,

  fileName: {
    color: "text.primary",
    fontSize: 14,
    fontWeight: 600,
  } as SxProps<Theme>,

  sheetName: (theme: Theme) => ({
    color: theme.palette.custom.textFaint,
    fontSize: 12,
  }),

  chipContainer: {
    display: "flex",
    gap: 0.5,
  } as SxProps<Theme>,

  chip: (theme: Theme) => ({
    bgcolor: theme.palette.custom.surfaceLight,
    color: theme.palette.text.secondary,
    fontSize: 11,
    height: 24,
  }),

  tableContainer: {
    maxHeight: 280,
  } as SxProps<Theme>,

  headerCell: (theme: Theme) => ({
    bgcolor: theme.palette.custom.tableHeader,
    color: theme.palette.custom.textBody,
    fontSize: 12,
    fontWeight: 600,
    borderBottom: `1px solid ${theme.palette.divider}`,
    whiteSpace: "nowrap",
    py: 1,
  }),

  headerCellType: {
    ml: 0.5,
    color: "text.disabled",
    fontSize: 10,
  } as SxProps<Theme>,

  headerCellMore: (theme: Theme) => ({
    bgcolor: theme.palette.custom.tableHeader,
    color: theme.palette.text.disabled,
    fontSize: 12,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),

  bodyCell: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: 12,
    borderBottom: `1px solid ${theme.palette.custom.borderSubtle}`,
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    py: 0.75,
  }),

  bodyCellMore: (theme: Theme) => ({
    color: theme.palette.custom.textFaintest,
    fontSize: 12,
    borderBottom: `1px solid ${theme.palette.custom.borderSubtle}`,
  }),

  footer: (theme: Theme) => ({
    p: 1.5,
    borderTop: `1px solid ${theme.palette.custom.borderLight}`,
  }),

  footerText: {
    color: "custom.textFaint",
    fontSize: 11,
    textAlign: "center",
  } as SxProps<Theme>,
};
