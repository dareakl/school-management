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

export default function ClassForm({ classId, onSuccess }) {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    level: "",
    name: "",
    teacherEmail: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all teachers
        const teacherRes = await api.get("/teachers");
        const teacherList = teacherRes.data.data;
        setTeachers(teacherList);

        // If editing an existing class
        if (classId) {
          const classRes = await api.get(`/classes/${classId}`);
          const cls = classRes.data.data;

          console.log("Class Data:", cls);
          console.log("Available Teachers:", teacherList);

          // ✅ Correctly get teacher email from formTeacher
          const cleanedEmail =
            cls.formTeacher?.email?.trim().toLowerCase() || "";

          const teacherExists = teacherList.some(
            (t) => t.email.toLowerCase() === cleanedEmail
          );

          setForm({
            level: cls.level || "",
            name: cls.name || "",
            teacherEmail: teacherExists ? cleanedEmail : "",
          });

          console.log("Set form with teacherEmail:", cleanedEmail);
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Error loading data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (classId) {
        await api.put(`/classes/${classId}`, form);
      } else {
        await api.post("/classes", form);
      }
      setError("");
      if (onSuccess) onSuccess();
      navigate("/classes");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit class.");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {classId ? "Edit Class" : "Add Class"}
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
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) =>
                selected || (
                  <span style={{ color: "#aaa" }}>Select Class Level</span>
                ),
            }}
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
            placeholder="Enter Class Name"
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
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected)
                  return (
                    <span style={{ color: "#aaa" }}>Assign a Form Teacher</span>
                  );
                const teacher = teachers.find(
                  (t) => t.email.toLowerCase() === selected.toLowerCase()
                );
                return teacher?.name || selected;
              },
            }}
          >
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <MenuItem key={teacher.email} value={teacher.email}>
                  {teacher.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                No teachers available
              </MenuItem>
            )}
          </TextField>

          {/* No Teachers Message */}
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

        {/* Error Display */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" onClick={() => navigate("/classes")}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            {classId ? "Update" : "Submit"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
