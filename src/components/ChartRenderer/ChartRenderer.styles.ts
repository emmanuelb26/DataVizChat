import type { SxProps, Theme } from "@mui/material";

export const styles = {
  loadingContainer: (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    bgcolor: theme.palette.custom.surface,
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`,
    mt: 2,
  }),

  loadingSpinner: (theme: Theme) => ({
    color: theme.palette.custom.textFaint,
  }),

  chartContainer: (theme: Theme) => ({
    width: "100%",
    mt: 2,
    bgcolor: theme.palette.custom.surface,
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",
    p: 1,
  }),
};

/**
 * Build Highcharts dark theme defaults using MUI theme tokens.
 * Call this from the component with access to the theme.
 */
export function buildDarkThemeDefaults(palette: Theme["palette"]) {
  return {
    chart: {
      backgroundColor: "transparent",
      style: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      },
    },
    title: {
      style: { color: palette.text.primary, fontSize: "15px" },
    },
    subtitle: {
      style: { color: palette.custom.textMuted },
    },
    xAxis: {
      labels: { style: { color: palette.text.secondary } },
      title: { style: { color: palette.text.secondary } },
      gridLineColor: palette.custom.borderLight,
      lineColor: palette.action.selected,
      tickColor: palette.action.selected,
    },
    yAxis: {
      labels: { style: { color: palette.text.secondary } },
      title: { style: { color: palette.text.secondary } },
      gridLineColor: palette.custom.borderLight,
    },
    legend: {
      itemStyle: { color: palette.custom.textBody },
      itemHoverStyle: { color: palette.custom.textBright },
    },
    tooltip: {
      backgroundColor: palette.custom.tooltip,
      borderColor: palette.custom.borderMedium,
      style: { color: "#ffffff" },
    },
    plotOptions: {
      series: {
        borderColor: "transparent",
      },
    },
    colors: palette.custom.chartColors,
    credits: {
      enabled: false,
    },
  };
}
