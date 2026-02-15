"use client";

import { Box, Typography, Chip } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { styles } from "./WelcomeScreen.styles";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SUGGESTIONS = [
  "Summarize the key metrics in my data",
  "Show me a breakdown by category as a pie chart",
  "What are the top 10 entries by value?",
  "Show the trend over time as a line chart",
];

export default function WelcomeScreen({
  onSuggestionClick,
}: WelcomeScreenProps) {
  return (
    <Box sx={styles.root}>
      {/* Logo / Icon */}
      <Box sx={styles.iconContainer}>
        <AutoGraphIcon sx={styles.icon} />
      </Box>

      {/* Title */}
      <Typography variant="h5" sx={styles.title}>
        Data Viz Chat
      </Typography>

      <Typography sx={styles.subtitle}>
        Ask questions about your data and get instant answers with beautiful
        visualizations.
      </Typography>

      {/* Suggestion chips */}
      <Box sx={styles.suggestionsContainer}>
        {SUGGESTIONS.map((suggestion) => (
          <Chip
            key={suggestion}
            label={suggestion}
            variant="outlined"
            onClick={() => onSuggestionClick(suggestion)}
            sx={styles.suggestionChip}
          />
        ))}
      </Box>
    </Box>
  );
}
