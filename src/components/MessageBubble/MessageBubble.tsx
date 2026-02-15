"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ReactMarkdown from "react-markdown";
import ChartRenderer from "@/components/ChartRenderer";
import DataPreviewMessage from "@/components/DataPreviewMessage";
import type { ChatMessage } from "@/types";
import { styles, markdownStyles } from "./MessageBubble.styles";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const muiTheme = useTheme();

  return (
    <Box sx={styles.root}>
      {/* Avatar */}
      <Avatar sx={styles.avatar(isUser)}>
        {isUser ? (
          <PersonIcon sx={styles.avatarIcon} />
        ) : (
          <AutoGraphIcon sx={styles.avatarIcon} />
        )}
      </Avatar>

      {/* Content */}
      <Box sx={styles.content}>
        {/* Role label */}
        <Typography sx={styles.roleLabel}>
          {isUser ? "You" : "Data Viz Chat"}
        </Typography>

        {/* Text content */}
        {message.content && (
          <Box sx={markdownStyles(muiTheme)}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Box>
        )}

        {/* Data preview (for upload messages) */}
        {message.dataPreview && (
          <Box sx={styles.attachmentWrapper}>
            <DataPreviewMessage preview={message.dataPreview} />
          </Box>
        )}

        {/* Chart visualization */}
        {message.chart && (
          <Box sx={styles.attachmentWrapper}>
            <ChartRenderer config={message.chart} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
