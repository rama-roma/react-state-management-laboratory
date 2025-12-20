import { useNavigate, useParams } from "react-router";
import { useTodo } from "../../state/zustand/useTodo";
import { Box, Button, Chip, Typography } from "@mui/material";

const InfoSyncZustand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTodo();

  const user = data.find((u) => u.id === Number(id));

  return (
    <Box sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Box
        sx={{
          maxWidth: 320,
          p: 3,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {user?.name}
        </Typography>

        <Chip
          label={user?.status ? "Active" : "Inactive"}
          color={user?.status ? "success" : "error"}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default InfoSyncZustand;
