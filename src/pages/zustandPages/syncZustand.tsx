import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Switch,
  Chip,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTodo } from "../../state/zustand/useTodo";

const SyncZustand = () => {
  const { data, deleteUser, addUser, editUser, checkout } = useTodo();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const filteredData = data
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => {
      if (selected === "active") return i.status;
      if (selected === "inactive") return !i.status;
      return true;
    });

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />

        <Select
          value={selected}
          size="small"
          onChange={(e) => setSelected(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>

        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add user
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {filteredData.map((e) => (
          <Box
            key={e.id}
            sx={{
              width: 260,
              p: 2,
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow: 2,
            }}
          >
            <Typography fontWeight={600}>{e.name}</Typography>

            <Chip
              label={e.status ? "Active" : "Inactive"}
              color={e.status ? "success" : "error"}
              size="small"
              sx={{ mt: 1 }}
            />

            <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
              <Button
                size="small"
                color="error"
                onClick={() => deleteUser(e.id)}
              >
                Delete
              </Button>

              <Button
                size="small"
                onClick={() => {
                  setOpenEdit(true);
                  setEditId(e.id);
                  setEditName(e.name);
                  setEditStatus(e.status);
                }}
              >
                Edit
              </Button>

              <Switch checked={e.status} onChange={() => checkout(e.id)} />

              <Link to={`/infoSyncZustand/${e.id}`}>
                <Button size="small">Info</Button>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box sx={modalStyle}>
          <Typography mb={2}>Add user</Typography>
          <TextField
            fullWidth
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Switch
            checked={newStatus}
            onChange={(e) => setNewStatus(e.target.checked)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              addUser(newName, newStatus);
              setOpenAdd(false);
              setNewName("");
              setNewStatus(false);
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={modalStyle}>
          <Typography mb={2}>Edit user</Typography>
          <TextField
            fullWidth
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Switch
            checked={editStatus}
            onChange={(e) => setEditStatus(e.target.checked)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              editUser(editId, editName, editStatus);
              setOpenEdit(false);
            }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  p: 3,
  borderRadius: 3,
  boxShadow: 24,
};

export default SyncZustand;
