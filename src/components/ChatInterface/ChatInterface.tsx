"use client";

import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInput from "@/components/ChatInput";
import type { ChatMessage } from "@/types";
import { styles } from "./ChatInterface.styles";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSuggestionClick: (suggestion: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({
  messages,
  inputValue,
  onInputChange,
  onSend,
  onSuggestionClick,
  isLoading,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear or loading starts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <Box sx={styles.root}>
      {messages.length === 0 ? (
        /* Empty state: welcome + input centered vertically */
        <Box sx={styles.emptyState}>
          <WelcomeScreen onSuggestionClick={onSuggestionClick} />
          <Box sx={styles.emptyInputWrapper}>
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onSend={onSend}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      ) : (
        /* Conversation: messages scrollable + input pinned at bottom */
        <>
          <Box sx={styles.messagesArea}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </Box>
          <Box sx={styles.inputArea}>
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onSend={onSend}
              isLoading={isLoading}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
