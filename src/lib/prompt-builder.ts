import type { UploadedFile, ParsedSheet } from "@/types";

const MAX_ROWS_IN_PROMPT = 500;

/**
 * Build the system prompt that instructs Claude how to analyze data
 * and respond with structured answers + Highcharts configurations.
 */
export function buildSystemPrompt(
  files: UploadedFile[],
  activeFileId?: string,
  activeSheetName?: string
): string {
  const dataContext = buildDataContext(files, activeFileId, activeSheetName);

  return `You are a data analysis assistant. The user has uploaded Excel files and will ask questions about their data.

YOUR CAPABILITIES:
- Analyze tabular data from Excel files
- Answer questions with clear, concise explanations
- Generate Highcharts chart configurations when a visualization would help illustrate the answer
- Perform calculations, aggregations, comparisons, and trend analysis

DATA CONTEXT:
${dataContext}

RESPONSE FORMAT:
You must respond with a JSON object containing:
1. "answer": A clear, helpful text explanation of the answer
2. "chart": (optional) A Highcharts configuration object if a visualization would be helpful. Set to null if no chart is needed.

CHART CONFIGURATION RULES:
- Use standard Highcharts options format
- The "chart" field should contain a valid Highcharts options object with at minimum: chart.type, title.text, series
- Supported chart types: pie, bar, column, line, area, scatter, heatmap, spline, areaspline
- Always include meaningful titles and labels
- For pie charts, use the format: series[0].data = [{name: "label", y: value}, ...]
- For bar/column/line charts, include xAxis.categories when appropriate
- Use colors that work well on dark backgrounds
- Keep chart configurations simple and focused on the key insight

ANALYSIS RULES:
- Always base your answers on the actual data provided
- If the data is insufficient to answer, say so clearly
- Round numbers to 2 decimal places when appropriate
- When doing aggregations, show your methodology briefly
- If multiple sheets/files are loaded, focus on the active one unless the user asks about others`;
}

/**
 * Build the data context section of the prompt with schema and data.
 */
function buildDataContext(
  files: UploadedFile[],
  activeFileId?: string,
  activeSheetName?: string
): string {
  if (files.length === 0) {
    return "No data files have been uploaded yet.";
  }

  const parts: string[] = [];

  for (const file of files) {
    const isActive = !activeFileId || file.id === activeFileId;
    parts.push(`\n--- File: "${file.fileName}" ${isActive ? "(ACTIVE)" : ""} ---`);

    for (const sheet of file.sheets) {
      const isActiveSheet = !activeSheetName || sheet.name === activeSheetName;
      if (!isActive && !isActiveSheet) continue;

      parts.push(formatSheetContext(sheet, isActive && isActiveSheet));
    }
  }

  return parts.join("\n");
}

/**
 * Format a single sheet's schema and data for the prompt.
 */
function formatSheetContext(sheet: ParsedSheet, includeFullData: boolean): string {
  const lines: string[] = [];
  lines.push(`\nSheet: "${sheet.name}" (${sheet.totalRows} rows)`);

  // Column schema
  lines.push("Columns:");
  for (const col of sheet.columns) {
    const samples = col.sampleValues
      .filter((v) => v !== null && v !== undefined)
      .slice(0, 3)
      .map((v) => JSON.stringify(v))
      .join(", ");
    lines.push(`  - ${col.name} (${col.type}): e.g. ${samples}`);
  }

  // Include data rows
  if (includeFullData) {
    const rowsToInclude = sheet.rows.slice(0, MAX_ROWS_IN_PROMPT);
    lines.push(`\nData (${rowsToInclude.length} of ${sheet.totalRows} rows):`);
    lines.push(JSON.stringify(rowsToInclude, null, 0));

    if (sheet.totalRows > MAX_ROWS_IN_PROMPT) {
      lines.push(
        `... (${sheet.totalRows - MAX_ROWS_IN_PROMPT} more rows not shown)`
      );
    }
  }

  return lines.join("\n");
}
