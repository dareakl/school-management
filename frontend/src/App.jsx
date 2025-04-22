import React, { useState } from "react";
import { container, Typography, Divider, Container } from "@mui/material";
import TeacherForm from "./components/TeacherForm";

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        School Management
      </Typography>
    </Container>
  );
}
