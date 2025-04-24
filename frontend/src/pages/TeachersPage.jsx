import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TeacherForm from "../components/TeacherForm";
import TeacherList from "../components/TeacherList";

export default function TeachersPage({ addMode = false, editMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
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
        {!addMode && !editMode && (
          <Button
            variant="contained"
            onClick={() => navigate("/teachers/add")}
            startIcon={<Add />}
          >
            Add Teacher
          </Button>
        )}
      </Box>

      {addMode || editMode ? (
        <TeacherForm
          teacherId={id}
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
