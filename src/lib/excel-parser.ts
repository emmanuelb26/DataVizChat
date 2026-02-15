import * as XLSX from "xlsx";
import type { ParsedSheet, ColumnInfo, UploadedFile, CellValue } from "@/types";

/**
 * Detect the type of a column based on sample values.
 */
function detectColumnType(values: CellValue[]): ColumnInfo["type"] {
  const nonNull = values.filter((v) => v !== null && v !== undefined && v !== "");
  if (nonNull.length === 0) return "unknown";

  let numCount = 0;
  let boolCount = 0;
  let dateCount = 0;

  for (const val of nonNull) {
    if (typeof val === "number") {
      numCount++;
    } else if (typeof val === "boolean") {
      boolCount++;
    } else if (val instanceof Date || (typeof val === "number" && !isNaN(val))) {
      dateCount++;
    }
  }

  const total = nonNull.length;
  if (numCount / total > 0.8) return "number";
  if (boolCount / total > 0.8) return "boolean";
  if (dateCount / total > 0.8) return "date";
  return "string";
}

/**
 * Parse a single worksheet into a ParsedSheet object.
 */
function parseSheet(sheet: XLSX.WorkSheet, name: string): ParsedSheet {
  const jsonData = XLSX.utils.sheet_to_json<Record<string, CellValue>>(sheet, {
    defval: null,
  });

  if (jsonData.length === 0) {
    return { name, columns: [], rows: [], totalRows: 0 };
  }

  const columnNames = Object.keys(jsonData[0]);
  const columns: ColumnInfo[] = columnNames.map((colName) => {
    const sampleValues = jsonData.slice(0, 100).map((row) => row[colName]);
    return {
      name: colName,
      type: detectColumnType(sampleValues),
      sampleValues: sampleValues.slice(0, 5),
    };
  });

  return {
    name,
    columns,
    rows: jsonData,
    totalRows: jsonData.length,
  };
}

/**
 * Parse an Excel file buffer into an UploadedFile object.
 */
export function parseExcelBuffer(
  buffer: ArrayBuffer,
  fileName: string
): UploadedFile {
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheets: ParsedSheet[] = workbook.SheetNames.map((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    return parseSheet(worksheet, sheetName);
  });

  return {
    id: `file_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    fileName,
    sheets,
    uploadedAt: new Date(),
  };
}
