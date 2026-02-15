import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: {
    display: "flex",
    gap: 2,
    py: 2.5,
    px: { xs: 2, md: 0 },
    maxWidth: 768,
    mx: "auto",
    width: "100%",
  } as SxProps<Theme>,

  avatar: (isUser: boolean) =>
    (theme: Theme) => ({
      width: 28,
      height: 28,
      mt: 0.5,
      bgcolor: isUser ? theme.palette.custom.userAvatar : theme.palette.primary.main,
      flexShrink: 0,
    }),

  avatarIcon: {
    fontSize: 16,
  },

  content: {
    flex: 1,
    minWidth: 0,
  } as SxProps<Theme>,

  roleLabel: {
    color: "text.primary",
    fontSize: 13,
    fontWeight: 600,
    mb: 0.5,
  } as SxProps<Theme>,

  messageText: (theme: Theme) => ({
    color: theme.palette.custom.textBody,
    fontSize: 14,
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  }),

  attachmentWrapper: {
    mt: 1.5,
  } as SxProps<Theme>,
};

export const markdownStyles = (theme: Theme): SxProps<Theme> => ({
  color: theme.palette.custom.textBody,
  fontSize: 14,
  lineHeight: 1.7,
  wordBreak: "break-word",
  "& p": {
    m: 0,
    mb: 1,
    "&:last-child": { mb: 0 },
  },
  "& strong": {
    color: theme.palette.custom.textBright,
    fontWeight: 600,
  },
  "& em": {
    fontStyle: "italic",
  },
  "& ul, & ol": {
    pl: 2.5,
    my: 1,
  },
  "& li": {
    mb: 0.5,
  },
  "& code": {
    bgcolor: theme.palette.divider,
    borderRadius: 0.5,
    px: 0.75,
    py: 0.25,
    fontSize: 13,
    fontFamily: "monospace",
  },
  "& pre": {
    bgcolor: theme.palette.custom.codeBlock,
    borderRadius: 1,
    p: 1.5,
    my: 1,
    overflow: "auto",
    "& code": {
      bgcolor: "transparent",
      p: 0,
    },
  },
  "& h1, & h2, & h3, & h4": {
    color: theme.palette.custom.textBright,
    mt: 1.5,
    mb: 0.75,
    fontWeight: 600,
  },
  "& h1": { fontSize: 20 },
  "& h2": { fontSize: 18 },
  "& h3": { fontSize: 16 },
  "& h4": { fontSize: 15 },
  "& blockquote": {
    borderLeft: `3px solid ${theme.palette.custom.borderStrong}`,
    pl: 2,
    ml: 0,
    color: theme.palette.text.secondary,
  },
  "& table": {
    borderCollapse: "collapse",
    my: 1,
    width: "100%",
  },
  "& th, & td": {
    border: `1px solid ${theme.palette.custom.borderMedium}`,
    px: 1.5,
    py: 0.75,
    fontSize: 13,
    textAlign: "left",
  },
  "& th": {
    bgcolor: theme.palette.custom.surfaceLight,
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
});
