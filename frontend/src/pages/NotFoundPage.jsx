import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box textAlign="center" mt={8}>
        <img
          src="/page404.jpg"
          alt="Page not found"
          style={{ width: "300px", maxWidth: "100%", marginBottom: 20 }}
        />
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </motion.div>
  );
}
