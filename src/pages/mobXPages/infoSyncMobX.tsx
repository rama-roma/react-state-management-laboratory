import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todo } from "../../state/mobX/mobXTodo";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const InfoSyncMobX = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = todo.data.find((u) => u.id === Number(id));

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="outlined" color="warning" onClick={() => navigate(-1)}>
        Back
      </Button>

      {user && (
        <Card
          sx={{
            mt: 4,
            maxWidth: 360,
            backgroundColor: "#fff8e1",
            border: "1px solid #ffecb3",
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#f57f17", fontWeight: "bold" }}
            >
              {user.name}
            </Typography>
            <Typography
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                backgroundColor: user.status ? "#fff59d" : "#ffe082",
                color: user.status ? "green" : "red",
                fontWeight: 500,
              }}
            >
              {user.status ? "Active" : "Inactive"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default InfoSyncMobX;
