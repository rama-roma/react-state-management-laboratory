import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  checkout,
  deleteUser,
  editUser,
} from "../../state/redux/reducers/todoSlice";

import {
  TextField,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router";

const SyncRedux = () => {
  const { data } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const handleAdd = () => {
    dispatch(
      addUser({
        id: Date.now(),
        name: newName,
        status: newStatus,
      })
    );
    setOpenAdd(false);
    setNewName("");
    setNewStatus(false);
  };

  const handleEdit = () => {
    dispatch(
      editUser({
        id: editId,
        name: editName,
        status: editStatus,
      })
    );
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditStatus(false);
  };

  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (selected === "active") return item.status === true;
      if (selected === "inactive") return item.status === false;
      return true;
    });

  return (
    <main>
      <div className="mb-6 flex gap-4">
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded border px-3 py-2"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add User
        </Button>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredData.map((e) => (
          <div key={e.id} className="rounded border p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">{e.name}</h1>
              <Checkbox
                checked={e.status}
                onChange={() => dispatch(checkout(e.id))}
              />
            </div>

            <p className={e.status ? "text-green-500" : "text-red-500"}>
              {e.status ? "Active" : "Inactive"}
            </p>

            <div className="flex gap-5 mt-10">
              <Button
                size="small"
                color="error"
                onClick={() => dispatch(deleteUser(e.id))}
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

              <Link to={`/infoSyncRedux/${e.id}`}>
               <Button size="small">Info</Button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Checkbox
            checked={newStatus}
            onChange={(e) => setNewStatus(e.target.checked)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Checkbox
            checked={editStatus}
            onChange={(e) => setEditStatus(e.target.checked)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default SyncRedux;
