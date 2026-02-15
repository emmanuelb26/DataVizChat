import { NextRequest, NextResponse } from "next/server";
import { parseExcelBuffer } from "@/lib/excel-parser";
import type { UploadResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" } as UploadResponse,
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    const validExtensions = [".xlsx", ".xls", ".csv"];
    const hasValidExtension = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!validTypes.includes(file.type) && !hasValidExtension) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Please upload an Excel (.xlsx, .xls) or CSV file.",
        } as UploadResponse,
        { status: 400 }
      );
    }

    // Parse the file
    const buffer = await file.arrayBuffer();
    const parsedFile = parseExcelBuffer(buffer, file.name);

    return NextResponse.json({
      success: true,
      file: parsedFile,
    } as UploadResponse);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to parse the file. Please check the file format.",
      } as UploadResponse,
      { status: 500 }
    );
  }
}
