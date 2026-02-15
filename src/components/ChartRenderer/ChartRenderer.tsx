"use client";

import { useMemo, useEffect, useState } from "react";
import type { ComponentType } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChartConfig } from "@/types";
import { styles, buildDarkThemeDefaults } from "./ChartRenderer.styles";

// Type for Highcharts module initializer functions
type HighchartsModuleInit = (hc: typeof import("highcharts")) => void;

// Simplified types for the dynamic import results
interface HighchartsModuleResult {
  default?: typeof import("highcharts");
}

/** Props for the Highcharts React wrapper component */
interface HighchartsChartProps {
  highcharts: typeof import("highcharts");
  options: Highcharts.Options;
}

interface ChartRendererProps {
  config: ChartConfig;
}

export default function ChartRenderer({ config }: ChartRendererProps) {
  const muiTheme = useTheme();

  const [HighchartsModule, setHighchartsModule] = useState<{
    Highcharts: typeof import("highcharts");
    HighchartsReact: typeof import("highcharts-react-official");
  } | null>(null);

  // Dynamically import Highcharts only on the client
  useEffect(() => {
    let mounted = true;
    async function loadHighcharts() {
      // Load core Highcharts and React wrapper first
      const [hc, hcReact] = await Promise.all([
        import("highcharts"),
        import("highcharts-react-official"),
      ]);

      const Highcharts = hc.default || hc;

      // Load extension modules sequentially — they depend on the core
      try {
        const hcMore = await import("highcharts/highcharts-more") as HighchartsModuleResult;
        const More = (hcMore.default || hcMore) as HighchartsModuleInit | HighchartsModuleResult;
        if (typeof More === "function") More(Highcharts);
      } catch {
        // highcharts-more is optional
      }

      try {
        const hcHeatmap = await import("highcharts/modules/heatmap") as HighchartsModuleResult;
        const Heatmap = (hcHeatmap.default || hcHeatmap) as HighchartsModuleInit | HighchartsModuleResult;
        if (typeof Heatmap === "function") Heatmap(Highcharts);
      } catch {
        // heatmap module is optional
      }

      if (mounted) {
        setHighchartsModule({
          Highcharts: Highcharts as typeof import("highcharts"),
          HighchartsReact: hcReact as typeof import("highcharts-react-official"),
        });
      }
    }
    loadHighcharts();
    return () => {
      mounted = false;
    };
  }, []);

  const darkThemeDefaults = useMemo(
    () => buildDarkThemeDefaults(muiTheme.palette),
    [muiTheme.palette]
  );

  const chartOptions: Highcharts.Options = useMemo(() => {
    const llmOptions = config.options;
    const getOption = <T,>(key: string): T | undefined =>
      llmOptions[key] as T | undefined;

    return {
      ...darkThemeDefaults,
      chart: {
        ...darkThemeDefaults.chart,
        ...(getOption<Highcharts.ChartOptions>("chart") || {}),
        type: config.type as Highcharts.Options["chart"] extends { type?: infer T } ? T : string,
      },
      title: {
        ...darkThemeDefaults.title,
        text: config.title,
        ...(getOption<Highcharts.TitleOptions>("title") || {}),
      },
      xAxis: {
        ...darkThemeDefaults.xAxis,
        ...(getOption<Highcharts.XAxisOptions>("xAxis") || {}),
      },
      yAxis: {
        ...darkThemeDefaults.yAxis,
        ...(getOption<Highcharts.YAxisOptions>("yAxis") || {}),
      },
      legend: {
        ...darkThemeDefaults.legend,
        ...(getOption<Highcharts.LegendOptions>("legend") || {}),
      },
      tooltip: {
        ...darkThemeDefaults.tooltip,
        ...(getOption<Highcharts.TooltipOptions>("tooltip") || {}),
      },
      colors: (getOption<string[]>("colors") || darkThemeDefaults.colors),
      credits: { enabled: false },
      series: getOption<Highcharts.SeriesOptionsType[]>("series") || [],
    };
  }, [config, darkThemeDefaults]);

  if (!HighchartsModule) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress size={24} sx={styles.loadingSpinner} />
      </Box>
    );
  }

  const { Highcharts, HighchartsReact } = HighchartsModule;
  // Highcharts React's type exports don't support dynamic import patterns cleanly.
  // We extract the default export which is the actual React component.
  const mod = HighchartsReact as { default?: ComponentType<HighchartsChartProps> };
  const HCReactComponent = mod.default;

  if (!HCReactComponent) return null;

  return (
    <Box sx={styles.chartContainer}>
      <HCReactComponent highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
}
