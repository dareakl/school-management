import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import api from "../services/api";

export default function TeacherForm({ onSuccess }) {
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
      await api, post("/teachers", form);
      setForm({ name: "", subject: "", email: "", contactNumber: "" });
      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "submission failed");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">Register Teacher</Typography>
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Paper>
  );
}
