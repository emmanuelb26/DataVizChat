"use client";

import { useState, useCallback } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import DataSourceScreen from "@/components/DataSourceScreen";
import type { UploadedFile, ChatMessage, DataPreview, ChatResponse } from "@/types";
import { styles } from "./page.styles";

export default function Home() {
  // File state
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | undefined>();

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Get active file's first sheet name for context
  const activeFile = files.find((f) => f.id === activeFileId);
  const activeSheetName = activeFile?.sheets[0]?.name;

  /**
   * Handle file upload via the attach button or drag & drop.
   */
  const handleFileSelect = useCallback(async (fileList: FileList) => {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!result.success) {
          setError(result.error || "Failed to upload file");
          continue;
        }

        const uploadedFile = result.file as UploadedFile;

        // Add file to state
        setFiles((prev) => [...prev, uploadedFile]);
        setActiveFileId((prev) => prev || uploadedFile.id);

        // Create a data preview message in the chat
        const firstSheet = uploadedFile.sheets[0];
        if (firstSheet) {
          const preview: DataPreview = {
            fileName: uploadedFile.fileName,
            sheetName: firstSheet.name,
            columns: firstSheet.columns,
            previewRows: firstSheet.rows.slice(0, 5),
            totalRows: firstSheet.totalRows,
          };

          const previewMessage: ChatMessage = {
            id: `msg_${Date.now()}_preview`,
            role: "assistant",
            content: `File "${uploadedFile.fileName}" uploaded successfully! Here's a preview of the data:`,
            dataPreview: preview,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, previewMessage]);
        }
      } catch {
        setError(`Failed to upload "${file.name}". Please try again.`);
      }
    }
  }, []);

  /**
   * Send a chat message and get a response from Claude.
   */
  const handleSend = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          files,
          activeFileId,
          activeSheetName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = (await response.json()) as ChatResponse;

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: "assistant",
        content: data.answer,
        chart: data.chart,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMsg);

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: "assistant",
        content: `Sorry, I encountered an error: ${errorMsg}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, files, activeFileId, activeSheetName]);

  /**
   * Handle suggestion click from the welcome screen.
   */
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      if (files.length === 0) return;
      setInputValue(suggestion);
    },
    [files]
  );

  /**
   * Remove a file from the loaded files.
   */
  const handleRemoveFile = useCallback(
    (fileId: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      if (activeFileId === fileId) {
        setActiveFileId((prev) => {
          const remaining = files.filter((f) => f.id !== fileId);
          return remaining.length > 0 ? remaining[0].id : undefined;
        });
      }
    },
    [activeFileId, files]
  );

  // Show the landing page when no files are loaded
  if (files.length === 0) {
    return (
      <>
        <DataSourceScreen onFileSelect={handleFileSelect} />

        {/* Error snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <Box sx={styles.layout}>
      {/* Sidebar */}
      <Sidebar
        files={files}
        activeFileId={activeFileId}
        onSelectFile={setActiveFileId}
        onRemoveFile={handleRemoveFile}
      />

      {/* Main chat area */}
      <ChatInterface
        messages={messages}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSend}
        onSuggestionClick={handleSuggestionClick}
        isLoading={isLoading}
      />

      {/* Error snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
