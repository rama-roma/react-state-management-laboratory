import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { todos } from "../../state/mobX/mobXTodos";

const AsyncMobX = observer(() => {
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
    if (editId === null) return;
    todos.editData({ id: editId, name: editName, status: editStatus });
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditStatus(false);
  };

  const handleAdd = () => {
    todos.addData({ name: newName, status: newStatus });
    setOpenAdd(false);
    setNewName("");
    setNewStatus(false);
  };

  const filteredData = todos.data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (selected === "active") return item.status === true;
      if (selected === "inactive") return item.status === false;
      return true;
    });

  useEffect(() => {
    todos.getData();
  }, []);

  return (
    <main>
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="px-3 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={() => setOpenAdd(true)}
          className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition"
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((e) => (
          <div
            key={e.id}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow hover:shadow-lg transition relative overflow-hidden group"
          >
            <h2 className="text-lg font-bold text-yellow-800">{e.name}</h2>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full font-medium ${
                e.status
                  ? "bg-yellow-200 text-green-700"
                  : "bg-yellow-100 text-red-600"
              }`}
            >
              {e.status ? "Active" : "Inactive"}
            </span>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => todos.deleteData(e.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                DELETE
              </button>
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditId(e.id);
                  setEditName(e.name);
                  setEditStatus(e.status);
                }}
                className="px-3 py-1 border border-yellow-400 text-yellow-700 rounded-md hover:bg-yellow-50 transition"
              >
                Edit
              </button>
              <button
                onClick={() => todos.checkData(e)}
                className={`px-3 py-1 rounded-full text-white ${
                  e.status ? "bg-green-400" : "bg-gray-400"
                } transition`}
              >
                Toggle
              </button>
              <Link to={`/infoAsyncMobX/${e.id}`}>
                <button className="px-3 py-1 border border-yellow-400 text-yellow-700 rounded-md hover:bg-yellow-50 transition">
                  Info
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {openAdd && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add User</h3>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={newStatus}
                onChange={(e) => setNewStatus(e.target.checked)}
                className="w-5 h-5"
              />
              Active
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenAdd(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
                className="w-5 h-5"
              />
              Active
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
});

export default AsyncMobX;
