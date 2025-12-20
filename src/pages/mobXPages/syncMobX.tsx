import { useState } from "react";
import { observer } from "mobx-react-lite";
import {  Link as RouterLink } from "react-router-dom";
import { todo } from "../../state/mobX/mobXTodo";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";

const SyncMobX = observer(() => {

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const handleAdd = () => {
    todo.addUser({ id: Date.now(), name: newName, status: newStatus });
    setOpenAdd(false);
    setNewName("");
    setNewStatus(false);
  };

  const handleEdit = () => {
    if (editId !== null) {
      todo.editUser(editId, { name: editName, status: editStatus });
    }
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditStatus(false);
  };

  const filteredData = todo.data
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => {
      if (selected === "active") return u.status;
      if (selected === "inactive") return !u.status;
      return true;
    });

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
        <Select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        <Button variant="contained" color="warning" onClick={() => setOpenAdd(true)}>
          Add User
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {filteredData.map((u) => (
          <Card
            key={u.id}
            sx={{
              minWidth: 250,
              backgroundColor: "#fff8e1",
              border: "1px solid #ffecb3",
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {u.name}
              </Typography>
              <Typography
                sx={{
                  display: "inline-block",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: u.status ? "#fff59d" : "#ffe082",
                  color: u.status ? "green" : "red",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {u.status ? "Active" : "Inactive"}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => todo.deleteUser(u.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => {
                    setEditId(u.id);
                    setEditName(u.name);
                    setEditStatus(u.status);
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={u.status}
                      onChange={() => todo.checkout(u.id)}
                      color="success"
                    />
                  }
                  label=""
                />
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/infoSyncMobX/${u.id}`}
                  size="small"
                >
                  Info
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>


      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newStatus}
                onChange={(e) => setNewStatus(e.target.checked)}
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" color="warning" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" color="warning" onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default SyncMobX;
