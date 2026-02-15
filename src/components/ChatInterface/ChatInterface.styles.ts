import type { SxProps, Theme } from "@mui/material";

export const styles = {
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    bgcolor: "background.default",
    overflow: "hidden",
  } as SxProps<Theme>,

  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,

  emptyInputWrapper: {
    width: "100%",
    mt: 4,
  } as SxProps<Theme>,

  messagesArea: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    py: 2,
  } as SxProps<Theme>,

  inputArea: {
    flexShrink: 0,
    pt: 1,
    pb: 1,
  } as SxProps<Theme>,
};
