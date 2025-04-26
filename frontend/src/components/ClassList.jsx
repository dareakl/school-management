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

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/classes").then((res) => {
      setClasses(res.data.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      {classes.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: 200 }}
        >
          <Typography variant="body1" color="text.secondary" gutterBottom>
            There are no existing classes yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/classes/add")}
            startIcon={<Add />}
          >
            Add Class
          </Button>
        </Box>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Class Level</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Class Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Form Teacher</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow key={index}>
                  <TableCell>{cls.level}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.formTeacher?.name || "N/A"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/classes/edit/${cls.id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={async () => {
                        if (
                          window.confirm("Are you sure to delete this class?")
                        ) {
                          await api.delete(`/classes/${cls.id}`);
                          setClasses(classes.filter((c) => c.id !== cls.id));
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
