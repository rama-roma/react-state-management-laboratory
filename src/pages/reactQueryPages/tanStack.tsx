import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteUser,
  getUser,
  editUser,
  addUser,
  addImage,
  deleteImage,
  checkout,
} from '../../state/reactQuery/tanStack';

import { useState } from "react";
import { Modal, Input, Checkbox, Button } from "antd";
import { Link } from "react-router";
import { queryClient } from "../../main";

const TanStack = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [addImageId, setAddImageId] = useState(null);
  const [idx, setIdx] = useState(null);
  const [openImage, setOpenImage] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getUser,
  });

  const deleteData = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deleteImageData = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const editData = useMutation({
    mutationFn: editUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const addData = useMutation({
    mutationFn: addUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const addImageData = useMutation({
    mutationFn: addImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const checkoutData = useMutation({
    mutationFn: checkout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleAddImage = () => {
    const formData = new FormData();
    for (let i = 0; i < addImageId.length; i++) {
      formData.append("Images", addImageId[i]);
    }
    addImageData.mutate({ id: idx, formData });
    setOpenImage(false);
    setAddImageId(null);
    setIdx(null);
  };

  const handleEdit = () => {
    editData.mutate({
      id: editId,
      name: editName,
      description: editDesc,
      isCompleted: editStatus,
    });
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditDesc("");
    setEditStatus(false);
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("Name", newName);
    formData.append("Description", newDesc);
    formData.append("Status", newStatus);
    if (newImage) formData.append("Images", newImage);
    addData.mutate(formData);
    setOpenAdd(false);
    setNewName("");
    setNewDesc("");
    setNewStatus(false);
    setNewImage(null);
  };

  const filteredData = data?.data
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => {
      if (selected === "active") return e.isCompleted === true;
      if (selected === "inactive") return e.isCompleted === false;
      return true;
    });

  return (
    <>
      <main>
        <header className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todos</h1>
          <div className="flex items-center gap-3 ">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56"
            />
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="px-4 py-2 rounded-lg border"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button
              type="primary"
              className="!bg-black !hover:bg-gray-800"
              onClick={() => setOpenAdd(true)}
            >
              + Add
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData?.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {e.name}
                </h2>
                <p className="text-gray-500 mb-2">{e.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      e.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {e.isCompleted ? "Active" : "Inactive"}
                  </span>
                  <Checkbox
                    checked={e.isCompleted}
                    onChange={() => checkoutData.mutate(e.id)}
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-3">
                {e.images.map((img) => (
                  <div key={img.id} className="relative">
                    <img
                      className="w-14 h-14 object-cover rounded-lg"
                      src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                      alt=""
                    />
                    <button
                      onClick={() => deleteImageData.mutate(img.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setOpenImage(true);
                    setIdx(e.id);
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <div className="flex gap-2">
                <Button danger size="small" onClick={() => deleteData.mutate(e.id)}>
                  Delete
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditDesc(e.description);
                    setEditStatus(e.isCompleted);
                  }}
                >
                  Edit
                </Button>
                <Link to={`/infoTanStack/${e.id}`}>
                  <button className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600">
                    Info
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Modal title="Edit Todo" open={openEdit} onOk={handleEdit} onCancel={() => setOpenEdit(false)}>
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <Input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
        <Checkbox checked={editStatus} onChange={(e) => setEditStatus(e.target.checked)} />
      </Modal>

      <Modal title="Add Todo" open={openAdd} onOk={handleAdd} onCancel={() => setOpenAdd(false)}>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
        <Checkbox checked={newStatus} onChange={(e) => setNewStatus(e.target.checked)} />
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
      </Modal>

      <Modal title="Add Image" open={openImage} onOk={handleAddImage} onCancel={() => setOpenImage(false)}>
        <input type="file" multiple onChange={(e) => setAddImageId(e.target.files)} />
      </Modal>
    </>
  );
};

export default TanStack;
