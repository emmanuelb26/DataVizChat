"use client";

import { Box, Avatar, Typography } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { styles } from "./TypingIndicator.styles";

export default function TypingIndicator() {
  return (
    <Box sx={styles.root}>
      <Avatar sx={styles.avatar}>
        <AutoGraphIcon sx={styles.avatarIcon} />
      </Avatar>

      <Box>
        <Typography sx={styles.label}>Data Viz Chat</Typography>
        <Box sx={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={styles.dot(i)} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
