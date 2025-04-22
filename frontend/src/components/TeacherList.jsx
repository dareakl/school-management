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
export default function TeacherList({ onAddClick }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers").then((res) => {
      setTeachers(res.data.data);
    });
  }, []);

  if (teachers.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No existing teacher yet.</Typography>
        <Button variant="contained" onClick={onAddClick} sx={{ mt: 2 }}>
          Add Teacher
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher, index) => (
            <TableRow key={index}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.contactNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
