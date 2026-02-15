"use client";

import { useRef, useState, useCallback } from "react";
import type { DragEvent } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { styles } from "./DataSourceScreen.styles";

interface DataSourceScreenProps {
  onFileSelect: (files: FileList) => Promise<void>;
}

export default function DataSourceScreen({
  onFileSelect,
}: DataSourceScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      if (fileList.length === 0) return;
      setError(null);
      setIsUploading(true);
      try {
        await onFileSelect(fileList);
      } catch {
        setError("Failed to upload file. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
        e.target.value = "";
      }
    },
    [handleFiles]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <Box sx={styles.root}>
      {/* Logo / Icon */}
      <Box sx={styles.iconContainer}>
        <AutoGraphIcon sx={styles.icon} />
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={styles.title}>
        Data Viz Chat
      </Typography>

      {/* Subtitle */}
      <Typography sx={styles.subtitle}>
        Upload your Excel files to start analyzing your data with AI-powered
        visualizations.
      </Typography>

      {/* Drop zone */}
      <Box
        sx={isDragging ? styles.dropzoneActive : styles.dropzone}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isUploading ? (
          <Box sx={styles.loadingContainer}>
            <CircularProgress size={36} sx={{ color: "custom.textMuted" }} />
            <Typography sx={styles.loadingText}>
              Parsing your file...
            </Typography>
          </Box>
        ) : (
          <>
            <CloudUploadOutlinedIcon sx={styles.uploadIcon} />
            <Typography sx={styles.dropzoneText}>
              Drag &amp; drop your Excel files here
            </Typography>
            <Button variant="outlined" sx={styles.browseButton}>
              Browse files
            </Button>
          </>
        )}
      </Box>

      {/* Accepted formats */}
      <Typography sx={styles.formatsHint}>
        Accepted formats: .xlsx, .xls, .csv
      </Typography>

      {/* Error message */}
      {error && (
        <Typography sx={styles.errorText}>{error}</Typography>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </Box>
  );
}
