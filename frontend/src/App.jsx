import React, { useState } from "react";
import { Typography, Divider, Container } from "@mui/material";
import TeacherForm from "./components/TeacherForm";
import TeacherList from "./components/TeacherList";
import ClassForm from "./components/ClassForm";
import ClassList from "./components/ClassList";

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        School Portal
      </Typography>
      <TeacherForm onSuccess={handleRefresh} />
      <TeacherList key={refresh + "-teachers"} />

      <Divider sx={{ my: 4 }} />
      <ClassForm onSuccess={handleRefresh} />
      <ClassList key={refresh + "-classes"} />
    </Container>
  );
}
