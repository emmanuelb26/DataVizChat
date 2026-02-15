// Shared TypeScript types for the ChatGPT Data Viz application

/** Possible cell values in an Excel spreadsheet */
export type CellValue = string | number | boolean | Date | null;

export interface ParsedSheet {
  name: string;
  columns: ColumnInfo[];
  rows: Record<string, CellValue>[];
  totalRows: number;
}

export interface ColumnInfo {
  name: string;
  type: "string" | "number" | "date" | "boolean" | "unknown";
  sampleValues: CellValue[];
}

export interface UploadedFile {
  id: string;
  fileName: string;
  sheets: ParsedSheet[];
  uploadedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  // Chart configuration returned by the LLM
  chart?: ChartConfig | null;
  // Data preview attached after file upload
  dataPreview?: DataPreview | null;
  timestamp: Date;
}

export interface DataPreview {
  fileName: string;
  sheetName: string;
  columns: ColumnInfo[];
  previewRows: Record<string, CellValue>[];
  totalRows: number;
}

export interface ChartConfig {
  type: string;
  title: string;
  options: Record<string, Record<string, string>>;
}

export interface UploadResponse {
  success: boolean;
  file: UploadedFile;
  error?: string;
}

export interface ChatRequest {
  message: string;
  files: UploadedFile[];
  activeFileId?: string;
  activeSheetName?: string;
}

export interface ChatResponse {
  answer: string;
  chart?: ChartConfig | null;
}
