import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const subjects = [
  "English Language",
  "Mother Tongue Language",
  "Mathematics",
  "Science",
  "Art",
  "Physical Education",
  "Social Studies",
  "Character and Citizenship Education",
];

export default function TeacherForm({ onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    contactNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/teachers", form);
      setForm({ name: "", subject: "", email: "", contactNumber: "" });
      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Teacher
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography>Name</Typography>
          <TextField
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Enter Teacher's Name"
          />
        </Box>

        <Box mb={2}>
          <Typography>Subject</Typography>
          <TextField
            select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            fullWidth
            required
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return (
                    <span style={{ color: "#aaa" }}>Select a Subject</span>
                  );
                }
                return selected;
              },
            }}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box mb={2}>
          <Typography>Email Address</Typography>
          <TextField
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Enter Valid Email Address"
          />
        </Box>

        <Box mb={2}>
          <Typography>Work Contact Number</Typography>
          <TextField
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Enter Contact Number"
          />
        </Box>

        {error && <Typography color="error">{error}</Typography>}

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" onClick={() => navigate("/teachers")}>
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
