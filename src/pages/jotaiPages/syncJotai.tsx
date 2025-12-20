import React, { useState } from "react";
import { Link } from "react-router";
import { useAtom } from "jotai";
import {
  addAtom,
  checkedbox,
  dataAtom,
  deleteAtom,
  editAtom,
} from "../../state/jotai/atomTodo";

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

const SyncJotai: React.FC = () => {
  const [data] = useAtom<Todo[]>(dataAtom);
  const [, deleteUser] = useAtom(deleteAtom);
  const [, addUser] = useAtom(addAtom);
  const [, editUser] = useAtom(editAtom);
  const [, checkout] = useAtom(checkedbox);

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const handleEdit = () => {
    if (editId !== null) {
      editUser({ id: editId, name: editName, status: editStatus });
      setOpenEdit(false);
      setEditId(null);
      setEditName("");
      setEditStatus(false);
    }
  };

  const handleAdd = () => {
    addUser({ id: Date.now(), name: newName, status: newStatus });
    setOpenAdd(false);
    setNewName("");
    setNewStatus(false);
  };

  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (selected === "active") return item.status === true;
      if (selected === "inactive") return item.status === false;
      return true;
    });

  return (
    <>
      <main>
        <div className="mt-10 flex flex-wrap items-center gap-3 mb-8">
          <input
            className="px-4 py-2 border rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded-lg"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => setOpenAdd(true)}
            className="ml-auto px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Add User
          </button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.map((e) => (
            <div
              key={e.id}
              className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-1">{e.name}</h2>

              <span
                className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${
                  e.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {e.status ? "Active" : "Inactive"}
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => deleteUser(e.id)}
                  className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditStatus(e.status);
                  }}
                  className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => checkout(e.id)}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    e.status ? "bg-green-50" : "bg-gray-100"
                  }`}
                >
                  Toggle
                </button>

                <Link
                  to={`/infoSyncJotai/${e.id}`}
                  className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100"
                >
                  Info
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      {openAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Add User</h2>

            <input
              className="w-full mb-3 px-4 py-2 border rounded-lg"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={newStatus}
                onChange={(e) => setNewStatus(e.target.checked)}
              />
              Active
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenAdd(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

            <input
              className="w-full mb-3 px-4 py-2 border rounded-lg"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
              />
              Active
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SyncJotai;
