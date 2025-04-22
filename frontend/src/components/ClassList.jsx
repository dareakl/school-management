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
} from "@mui/material";
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
      <Typography variant="h6" gutterBottom>
        Classes
      </Typography>

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
          <Button variant="contained" onClick={() => navigate("/classes/add")}>
            Add Class
          </Button>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/classes/add")}
            >
              Add Class
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Form Teacher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow key={index}>
                  <TableCell>{cls.level}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.formTeacher?.name || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Paper>
  );
}
