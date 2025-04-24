import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/teachers").then((res) => {
      setTeachers(res.data.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      {/* <Typography variant="h6" gutterBottom>
        Teachers
      </Typography> */}

      {teachers.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: 200 }}
        >
          <Typography variant="body1" color="text.secondary" gutterBottom>
            There are no existing teachers yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/teachers/add")}
            startIcon={<Add />}
          >
            Add Teacher
          </Button>
        </Box>
      ) : (
        <>
          {/* <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/teachers/add")}
            >
              Add Teacher
            </Button>
          </Box> */}
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Work Contact</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={index}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.contactNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/teachers/edit/${teacher.id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={async () => {
                        if (window.confirm("Delete this teacher?")) {
                          await api.delete(`/teachers/${teacher.id}`);
                          const updated = await api.get("/teachers");
                          setTeachers(updated.data.data);
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Paper>
  );
}
