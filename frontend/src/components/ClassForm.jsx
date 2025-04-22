import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ClassForm({ onSuccess }) {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    level: "",
    name: "",
    teacherEmail: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/teachers").then((res) => {
      setTeachers(res.data.data);
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/classes", form);
      setForm({ level: "", name: "", teacherEmail: "" });
      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add class.");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Class
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Level"
          name="level"
          value={form.level}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Class Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          select
          label="Form Teacher"
          name="teacherEmail"
          value={form.teacherEmail}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.email} value={teacher.email}>
              {teacher.name} ({teacher.email})
            </MenuItem>
          ))}
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="outlined" onClick={() => navigate("/classes")}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
