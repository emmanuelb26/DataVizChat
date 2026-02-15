"use client";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import type { DataPreview } from "@/types";
import { styles } from "./DataPreviewMessage.styles";

interface DataPreviewMessageProps {
  preview: DataPreview;
}

const MAX_PREVIEW_ROWS = 5;
const MAX_PREVIEW_COLS = 8;

export default function DataPreviewMessage({ preview }: DataPreviewMessageProps) {
  const displayColumns = preview.columns.slice(0, MAX_PREVIEW_COLS);
  const displayRows = preview.previewRows.slice(0, MAX_PREVIEW_ROWS);
  const hasMoreCols = preview.columns.length > MAX_PREVIEW_COLS;
  const hasMoreRows = preview.totalRows > MAX_PREVIEW_ROWS;

  return (
    <Box sx={styles.root}>
      {/* Header */}
      <Box sx={styles.header}>
        <DescriptionIcon sx={styles.headerIcon} />
        <Box sx={styles.headerInfo}>
          <Typography sx={styles.fileName}>{preview.fileName}</Typography>
          <Typography sx={styles.sheetName}>
            Sheet: {preview.sheetName}
          </Typography>
        </Box>
        <Box sx={styles.chipContainer}>
          <Chip label={`${preview.totalRows} rows`} size="small" sx={styles.chip} />
          <Chip label={`${preview.columns.length} cols`} size="small" sx={styles.chip} />
        </Box>
      </Box>

      {/* Data table */}
      <TableContainer sx={styles.tableContainer}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {displayColumns.map((col) => (
                <TableCell key={col.name} sx={styles.headerCell}>
                  {col.name}
                  <Typography component="span" sx={styles.headerCellType}>
                    ({col.type})
                  </Typography>
                </TableCell>
              ))}
              {hasMoreCols && (
                <TableCell sx={styles.headerCellMore}>
                  +{preview.columns.length - MAX_PREVIEW_COLS} more
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((row, idx) => (
              <TableRow key={idx}>
                {displayColumns.map((col) => (
                  <TableCell key={col.name} sx={styles.bodyCell}>
                    {row[col.name] !== null && row[col.name] !== undefined
                      ? String(row[col.name])
                      : "—"}
                  </TableCell>
                ))}
                {hasMoreCols && (
                  <TableCell sx={styles.bodyCellMore}>…</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer with row count */}
      {hasMoreRows && (
        <Box sx={styles.footer}>
          <Typography sx={styles.footerText}>
            Showing {MAX_PREVIEW_ROWS} of {preview.totalRows} rows
          </Typography>
        </Box>
      )}
    </Box>
  );
}
