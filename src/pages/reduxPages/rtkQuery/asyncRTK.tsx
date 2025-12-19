import { useState } from "react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetPokemonByNameQuery,
} from "../../../state/redux/api/rtk";

import { Input, Modal } from "antd";
import { Link } from "react-router";

const AsyncRTK = () => {
  const { data, loading, error } = useGetPokemonByNameQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [addCategory] = useAddCategoryMutation();

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const [search, setSearch] = useState("");

  const handleEdit = () => {
    editCategory({ id: editId, name: editName });
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
  };

  const handleAdd = () => {
    addCategory({ name: newName });
    setOpenAdd(false);
    setNewName("");
  };

  return (
    <>
      <main>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <button
            onClick={() => setOpenAdd(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
           + Add User
          </button>

          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs rounded-lg shadow-sm"
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {error ? (
            <div className="text-red-500 text-center col-span-full">
              Something went wrong
            </div>
          ) : loading ? (
            <div className="text-gray-400 text-center col-span-full">
              Loading...
            </div>
          ) : data ? (
            data.data
              .filter((e) =>
                e.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((e) => (
                <div
                  key={e.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-2xl transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {e.name}
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-auto">
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteCategory(e.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => {
                          setOpenEdit(true);
                          setEditId(e.id);
                          setEditName(e.name);
                        }}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                    </div>

                    <Link to={`/infoAsyncRTK/${e.id}`}>
                      <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                        Info
                      </button>
                    </Link>
                  </div>
                </div>
              ))
          ) : null}
        </section>
      </main>

      <Modal
        title="Edit Category"
        open={openEdit}
        onOk={handleEdit}
        onCancel={() => setOpenEdit(false)}
      >
        <Input
          placeholder="Name..."
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="rounded-lg"
        />
      </Modal>

      <Modal
        title="Add Category"
        open={openAdd}
        onOk={handleAdd}
        onCancel={() => setOpenAdd(false)}
      >
        <Input
          placeholder="Name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="rounded-lg"
        />
      </Modal>
    </>
  );
};

export default AsyncRTK;
