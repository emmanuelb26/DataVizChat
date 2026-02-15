import { describe, it, expect } from "vitest";
import * as XLSX from "xlsx";
import { parseExcelBuffer } from "../excel-parser";

/**
 * Helper to create a mock Excel buffer from row data.
 */
function createExcelBuffer(
  sheetName: string,
  rows: Record<string, string | number | boolean | null>[]
): ArrayBuffer {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  return buffer;
}

describe("parseExcelBuffer", () => {
  it("parses a simple Excel file with string and number columns", () => {
    const rows = [
      { Name: "Alice", Age: 30, City: "Paris" },
      { Name: "Bob", Age: 25, City: "London" },
      { Name: "Charlie", Age: 35, City: "Berlin" },
    ];

    const buffer = createExcelBuffer("Sheet1", rows);
    const result = parseExcelBuffer(buffer, "test.xlsx");

    expect(result.fileName).toBe("test.xlsx");
    expect(result.id).toMatch(/^file_/);
    expect(result.sheets).toHaveLength(1);

    const sheet = result.sheets[0];
    expect(sheet.name).toBe("Sheet1");
    expect(sheet.totalRows).toBe(3);
    expect(sheet.columns).toHaveLength(3);
    expect(sheet.columns.map((c) => c.name)).toEqual(["Name", "Age", "City"]);
  });

  it("detects column types correctly", () => {
    const rows = [
      { Label: "A", Value: 100, Active: true },
      { Label: "B", Value: 200, Active: false },
      { Label: "C", Value: 300, Active: true },
    ];

    const buffer = createExcelBuffer("Data", rows);
    const result = parseExcelBuffer(buffer, "typed.xlsx");

    const sheet = result.sheets[0];
    const typeMap = Object.fromEntries(sheet.columns.map((c) => [c.name, c.type]));

    expect(typeMap["Label"]).toBe("string");
    expect(typeMap["Value"]).toBe("number");
    expect(typeMap["Active"]).toBe("boolean");
  });

  it("handles an empty sheet gracefully", () => {
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empty");
    const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });

    const result = parseExcelBuffer(buffer, "empty.xlsx");

    expect(result.sheets).toHaveLength(1);
    expect(result.sheets[0].totalRows).toBe(0);
    expect(result.sheets[0].columns).toHaveLength(0);
    expect(result.sheets[0].rows).toHaveLength(0);
  });

  it("includes sample values in column info", () => {
    const rows = [
      { Product: "Widget", Price: 9.99 },
      { Product: "Gadget", Price: 14.99 },
      { Product: "Doohickey", Price: 4.99 },
    ];

    const buffer = createExcelBuffer("Products", rows);
    const result = parseExcelBuffer(buffer, "products.xlsx");

    const productCol = result.sheets[0].columns.find((c) => c.name === "Product");
    expect(productCol).toBeDefined();
    expect(productCol!.sampleValues).toHaveLength(3);
    expect(productCol!.sampleValues).toContain("Widget");
  });

  it("limits sample values to 5 entries", () => {
    const rows = Array.from({ length: 20 }, (_, i) => ({
      Index: i,
      Value: i * 10,
    }));

    const buffer = createExcelBuffer("Large", rows);
    const result = parseExcelBuffer(buffer, "large.xlsx");

    const indexCol = result.sheets[0].columns.find((c) => c.name === "Index");
    expect(indexCol!.sampleValues).toHaveLength(5);
  });
});
