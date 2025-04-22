import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeacherForm from "../components/TeacherForm";
import TeacherList from "../components/TeacherList";

export default function TeachersPage({ addMode = false }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Teachers</Typography>
        {!addMode && (
          <Button variant="contained" onClick={() => navigate("/teachers/add")}>
            Add Teacher
          </Button>
        )}
      </Box>

      {addMode ? (
        <TeacherForm
          onSuccess={() => {
            handleRefresh();
            navigate("/teachers");
          }}
        />
      ) : (
        <TeacherList
          key={refresh}
          onAddClick={() => navigate("/teachers/add")}
        />
      )}
    </>
  );
}
