import { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
        {["name", "subject", "email", "contactNumber"].map((field) => (
          <TextField
            key={field}
            label={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        ))}
        {error && <Typography color="error">{error}</Typography>}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
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
