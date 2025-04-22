import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import api from "../services/api";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers").then((res) => {
      setTeachers(res.data.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Teachers</Typography>
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
