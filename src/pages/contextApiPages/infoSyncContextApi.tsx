import { Button, Paper, Typography, Chip, Stack } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../../state/contextApi/todosApi";

const InfoSyncContextApi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos } = useContext(TodoContext);

  const user = todos.find((u) => u.id === Number(id));

  return (
    <Stack spacing={3} alignItems="center" p={4}>
      <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: "100%", maxWidth: 360 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {user?.name}
        </Typography>
        <Chip label={user?.status ? "Active" : "Inactive"} color={user?.status ? "success" : "error"} />
      </Paper>
    </Stack>
  );
};

export default InfoSyncContextApi;
