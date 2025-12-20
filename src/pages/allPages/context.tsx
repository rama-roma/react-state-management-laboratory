import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { TodoContext } from "../../state/contextApi/todosApi";

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (name: string, status: boolean) => void;
  editTodo: (id: number, name: string, status: boolean) => void;
  toggleStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const Context = () => {
  const context = useContext(TodoContext) as TodoContextType;
  const { todos, addTodo, editTodo, toggleStatus, deleteTodo } = context;

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
    addTodo(newName, newStatus);
    setOpenAdd(false);
    setNewName("");
    setNewStatus(false);
  };

  const handleEdit = () => {
    if (editId !== null) {
      editTodo(editId, editName, editStatus);
      setOpenEdit(false);
      setEditId(null);
      setEditName("");
      setEditStatus(false);
    }
  };

  const filteredData = todos
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (selected === "active") return item.status === true;
      if (selected === "inactive") return item.status === false;
      return true;
    });

  return (
    <>
      <main className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80"
            variant="outlined"
          />
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-32"
            variant="outlined"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <Button
            onClick={() => setOpenAdd(true)}
            variant="contained"
            color="secondary"
            className="px-6 py-2"
          >
            Add User
          </Button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{e.name}</h2>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                    e.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {e.status ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
                <Button
                  onClick={() => deleteTodo(e.id)}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditStatus(e.status);
                  }}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Edit
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={e.status}
                      onChange={() => toggleStatus(e.id)}
                      color="secondary"
                    />
                  }
                  label=""
                />
                <Link to={`/infoSyncContextApi/${e.id}`}>
                  <Button variant="outlined" color="secondary" size="small">
                    Info
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newStatus}
                onChange={(e) => setNewStatus(e.target.checked)}
                color="secondary"
              />
            }
            label="Status Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
                color="secondary"
              />
            }
            label="Status Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Context;