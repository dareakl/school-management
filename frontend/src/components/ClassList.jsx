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

export default function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.get("/classes").then((res) => {
      setClasses(res.data.data);
    });
  }, []);
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Classes</Typography>
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
