import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImageRedux,
  addRedux,
  checkoutRedux,
  deleteImageRedux,
  deleteRedux,
  editRedux,
  getRedux,
  type Todos,
} from "../../state/redux/reducers/todosSlice";
import { Checkbox, Input, Modal } from "antd";
import { Link } from "react-router-dom";

const AsyncRedux = () => {
  const data = useSelector(
    (state: { todos: { data: Todos[] } }) => state.todos.data
  );
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [addImage, setAddImage] = useState(null);
  const [idx, setIdx] = useState(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const handleAdd = () => {
    const formData = new FormData();

    formData.append("Name", newName);
    formData.append("Description", newDesc);

    if (newImage) formData.append("Images", newImage);

    dispatch(addRedux(formData));
    setOpenAdd(false);
    setNewName("");
    setNewDesc("");
    setNewImage(null);
  };

  const handleEdit = () => {
    dispatch(
      editRedux({
        id: editId,
        name: editName,
        description: editDesc,
      })
    );
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditDesc("");
  };

  const handleAddImage = () => {
    const formData = new FormData();
    for (let i = 0; i < addImage.length; i++) {
      formData.append("Images", addImage[i]);
    }
    dispatch(addImageRedux({ id: idx, formData }));
    setAddImage(null);
    setIdx(null);
  };

  const filteredData = data
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => {
      if (selected === "active") return e.isCompleted === true;
      if (selected === "inactive") return e.isCompleted === false;
      return true;
    });

  useEffect(() => {
    dispatch(getRedux());
  }, [dispatch]);

  return (
    <>
      <main className="p-6  min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="px-4 py-2 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            onClick={() => setOpenAdd(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((e) => (
            <div
              key={e.id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-semibold">{e.name}</h1>
                  <p className="text-gray-600">{e.description}</p>
                  <p
                    className={`font-medium ${
                      e.isCompleted ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {e.isCompleted ? "Active" : "Inactive"}
                  </p>
                </div>
                <Checkbox
                  checked={e.isCompleted}
                  onChange={() => dispatch(checkoutRedux(e.id))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    className="text-sm text-gray-500"
                    onChange={(event) => setAddImage(event.target.files)}
                  />
                  <button
                    onClick={() => {
                      setIdx(e.id);
                      handleAddImage();
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                  >
                    Add Image
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {e.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => dispatch(deleteImageRedux(img.id))}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded hover:bg-red-600 transition"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => dispatch(deleteRedux(e.id))}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditDesc(e.description);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <Link to={`/infoAsyncRedux/${e.id}`}>
                  <button className="h-10 bg-[orange] w-25 text-[white] rounded-[7px]">
                    Info
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>

        <Modal
          title="Add User"
          onOk={handleAdd}
          onCancel={() => setOpenAdd(false)}
          open={openAdd}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Input
              placeholder="Desc..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <input
              type="file"
              className="text-sm text-gray-500"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>
        </Modal>
        
        <Modal
          title="Edit User"
          onOk={handleEdit}
          onCancel={() => setOpenEdit(false)}
          open={openEdit}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Name..."
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              placeholder="Desc..."
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </div>
        </Modal>
      </main>
    </>
  );
};

export default AsyncRedux;
