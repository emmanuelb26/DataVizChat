"use client";

import { useCallback } from "react";
import type { KeyboardEvent } from "react";
import { Box, IconButton, TextField, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styles } from "./ChatInput.styles";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
  disabled,
}: ChatInputProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !isLoading && !disabled) {
          onSend();
        }
      }
    },
    [value, isLoading, disabled, onSend]
  );

  const hasText = !!value.trim();

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.inputBar}>
        {/* Text input */}
        <TextField
          multiline
          maxRows={6}
          placeholder="Ask a question about your data..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          variant="standard"
          fullWidth
          slotProps={{
            input: {
              disableUnderline: true,
              sx: styles.textFieldInput,
            },
          }}
        />

        {/* Send button */}
        <IconButton
          onClick={onSend}
          disabled={!hasText || isLoading || disabled}
          size="small"
          sx={styles.sendButton(hasText, isLoading)}
        >
          {isLoading ? (
            <CircularProgress size={16} sx={styles.loadingSpinner} />
          ) : (
            <SendIcon sx={styles.sendIcon} />
          )}
        </IconButton>
      </Box>

      {/* Disclaimer */}
      <Box sx={styles.disclaimer}>
        <Box component="span" sx={styles.disclaimerText}>
          Data Viz Chat can make mistakes. Verify important calculations.
        </Box>
      </Box>
    </Box>
  );
}
