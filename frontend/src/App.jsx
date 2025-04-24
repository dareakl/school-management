import { useLocation, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

import TeachersPage from "./pages/TeachersPage";
import ClassesPage from "./pages/ClassesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <img
              src="/logo.jpg"
              alt="Logo"
              height="30"
              style={{ marginRight: 10 }}
            />
            School Portal
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/classes"
              sx={{
                borderBottom: isActive("/classes")
                  ? "2px solid white"
                  : "2px solid transparent",
                borderRadius: 0,
                mx: 1,
              }}
            >
              Classes
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/teachers"
              sx={{
                borderBottom: isActive("/teachers")
                  ? "2px solid white"
                  : "2px solid transparent",
                borderRadius: 0,
                mx: 1,
              }}
            >
              Teachers
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<TeachersPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/add" element={<TeachersPage addMode />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/classes/add" element={<ClassesPage addMode />} />
          <Route
            path="/teachers/edit/:id"
            element={<TeachersPage editMode />}
          />
          <Route
            path="/classes/edit/:classId"
            element={<ClassesPage editMode />}
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}
