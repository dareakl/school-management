import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Class levels to show in dropdown
const levels = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
];

export default function ClassForm({ onSuccess }) {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    level: "",
    name: "",
    teacherEmail: "",
  });
  const [error, setError] = useState("");

  // Fetch teacher list from API
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
        {/* Class Level */}
        <Box mb={2}>
          <Typography>Class Level</Typography>
          <TextField
            select
            name="level"
            value={form.level}
            onChange={handleChange}
            fullWidth
            required
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Class Name */}
        <Box mb={2}>
          <Typography>Class Name</Typography>
          <TextField
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        {/* Form Teacher */}
        <Box mb={2}>
          <Typography>Form Teacher</Typography>
          <TextField
            select
            name="teacherEmail"
            value={form.teacherEmail}
            onChange={handleChange}
            fullWidth
            required
          >
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <MenuItem key={teacher.email} value={teacher.email}>
                  {teacher.name} ({teacher.email})
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                No teachers available
              </MenuItem>
            )}
          </TextField>

          {/* Show message and Add Teacher link if no teachers exist */}
          {teachers.length === 0 && (
            <Box mt={1}>
              <Typography variant="body2" color="text.secondary">
                No existing teachers.
              </Typography>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/teachers/add")}
              >
                Add Teacher
              </Link>
            </Box>
          )}
        </Box>

        {/* Error Message */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
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
