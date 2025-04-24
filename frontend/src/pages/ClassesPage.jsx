import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import ClassForm from "../components/ClassForm";
import ClassList from "../components/ClassList";

export default function ClassesPage({ addMode = false, editMode = false }) {
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
        <Typography variant="h6">Classes</Typography>
        {!addMode && !editMode && (
          <Button
            variant="contained"
            onClick={() => navigate("/classes/add")}
            startIcon={<Add />}
          >
            Add Class
          </Button>
        )}
      </Box>

      {addMode || editMode ? (
        <ClassForm
          classId={id}
          onSuccess={() => {
            handleRefresh();
            navigate("/classes");
          }}
        />
      ) : (
        <ClassList key={refresh} onAddClick={() => navigate("/classes/add")} />
      )}
    </>
  );
}
