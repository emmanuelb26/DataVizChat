import type { SxProps, Theme } from "@mui/material";
import { keyframes } from "@mui/material";

export const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
`;

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

  avatar: {
    width: 28,
    height: 28,
    mt: 0.5,
    bgcolor: "primary.main",
    flexShrink: 0,
  } as SxProps<Theme>,

  avatarIcon: {
    fontSize: 16,
  },

  label: {
    color: "text.primary",
    fontSize: 13,
    fontWeight: 600,
    mb: 0.5,
  } as SxProps<Theme>,

  dotsContainer: {
    display: "flex",
    gap: 0.6,
    alignItems: "center",
    pt: 0.5,
  } as SxProps<Theme>,

  dot: (index: number) =>
    (theme: Theme) => ({
      width: 6,
      height: 6,
      borderRadius: "50%",
      bgcolor: theme.palette.custom.textMuted,
      animation: `${bounce} 1.2s ease-in-out infinite`,
      animationDelay: `${index * 0.2}s`,
    }),
};
