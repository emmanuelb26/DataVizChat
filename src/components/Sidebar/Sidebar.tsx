"use client";

import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { UploadedFile } from "@/types";
import { styles } from "./Sidebar.styles";

interface SidebarProps {
  files: UploadedFile[];
  activeFileId: string | undefined;
  onSelectFile: (fileId: string) => void;
  onRemoveFile: (fileId: string) => void;
}

export default function Sidebar({
  files,
  activeFileId,
  onSelectFile,
  onRemoveFile,
}: SidebarProps) {
  return (
    <Box sx={styles.root}>
      {/* Loaded files list */}
      <Box sx={styles.fileListContainer}>
        {files.length === 0 ? (
          <Typography sx={styles.emptyText}>
            No files loaded yet. Use the attach button to upload Excel files.
          </Typography>
        ) : (
          <>
            <Typography sx={styles.sectionTitle}>Loaded Files</Typography>
            <List dense disablePadding>
              {files.map((file) => {
                const totalRows = file.sheets.reduce(
                  (sum, s) => sum + s.totalRows,
                  0
                );
                const sheetCount = file.sheets.length;

                return (
                  <ListItemButton
                    key={file.id}
                    selected={file.id === activeFileId}
                    onClick={() => onSelectFile(file.id)}
                    sx={styles.fileItem}
                  >
                    <ListItemIcon sx={styles.fileIcon}>
                      <DescriptionIcon sx={styles.fileIconSvg} />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.fileName}
                      secondary={`${sheetCount} sheet${sheetCount > 1 ? "s" : ""} · ${totalRows} rows`}
                      primaryTypographyProps={styles.filePrimaryText}
                      secondaryTypographyProps={styles.fileSecondaryText}
                    />
                    <Tooltip title="Remove file">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile(file.id);
                        }}
                        sx={styles.deleteButton}
                      >
                        <DeleteOutlineIcon sx={styles.deleteIcon} />
                      </IconButton>
                    </Tooltip>
                  </ListItemButton>
                );
              })}
            </List>
          </>
        )}
      </Box>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Typography sx={styles.footerText}>
          Data Viz Chat · Powered by Claude
        </Typography>
      </Box>
    </Box>
  );
}
