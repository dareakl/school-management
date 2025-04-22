import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import api from "../services/api";

export default function ClassList({ onAddClick }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.get("/classes").then((res) => {
      setClasses(res.data.data);
    });
  }, []);

  if (classes.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No existing class yet.</Typography>
        <Button variant="contained" onClick={onAddClick} sx={{ mt: 2 }}>
          Add Class
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
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
    </Paper>
  );
}
