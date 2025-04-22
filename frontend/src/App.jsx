import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import TeacherForm from "./components/TeacherForm";
import TeacherList from "./components/TeacherList";
import ClassForm from "./components/ClassForm";
import ClassList from "./components/ClassList";

export default function App() {
  const [view, setView] = useState("teachers");
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  const renderContent = () => {
    if (view === "teachers") {
      return (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Teachers</Typography>
            {!showForm && (
              <Button variant="contained" onClick={() => setShowForm(true)}>
                Add Teacher
              </Button>
            )}
          </Box>
          {showForm ? (
            <TeacherForm
              onSuccess={() => {
                handleRefresh();
                setShowForm(false);
              }}
            />
          ) : (
            <TeacherList
              key={refresh + "-teachers"}
              onAddClick={() => setShowForm(true)}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Classes</Typography>
            {!showForm && (
              <Button variant="contained" onClick={() => setShowForm(true)}>
                Add Class
              </Button>
            )}
          </Box>
          {showForm ? (
            <ClassForm
              onSuccess={() => {
                handleRefresh();
                setShowForm(false);
              }}
            />
          ) : (
            <ClassList
              key={refresh + "-classes"}
              onAddClick={() => setShowForm(true)}
            />
          )}
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img
              src="/logo.png"
              alt="Logo"
              height="30"
              style={{ marginRight: 10 }}
            />
            School Portal
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setView("classes");
              setShowForm(false);
            }}
          >
            Classes
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setView("teachers");
              setShowForm(false);
            }}
          >
            Teachers
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {renderContent()}
      </Container>
    </>
  );
}
