import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  addAtom,
  dataAtom,
  deleteAtom,
  getAtom,
  editAtom,
} from "../../state/jotai/atomTodos";
import { Modal, Input, Button } from "antd";
import { Formik } from "formik";
import { Link } from "react-router";

const AsyncJotai = () => {
  const [data] = useAtom(dataAtom);
  const [, getUser] = useAtom(getAtom);
  const [, deleteUser] = useAtom(deleteAtom);
  const [, addUser] = useAtom(addAtom);
  const [, editUser] = useAtom(editAtom);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async (values, { resetForm }) => {
        if (editId !== null) {
          await editUser({ id: editId, name: values.name });
          setEditId(null);
          setOpenEdit(false);
        } else {
          await addUser(values);
          setOpenAdd(false);
        }
        resetForm();
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, resetForm }) => (
        <>
          <Modal
            title="Add User"
            open={openAdd}
            onCancel={() => setOpenAdd(false)}
            onOk={handleSubmit}
            okText="Add"
          >
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="User name"
            />
          </Modal>

          <Modal
            title="Edit User"
            open={openEdit}
            onCancel={() => setOpenEdit(false)}
            onOk={handleSubmit}
            okText="Save"
          >
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="User name"
            />
          </Modal>

          <main className="mt-10">
            <div className="flex gap-[10px]">
              <Button
                type="primary"
                onClick={() => {
                  resetForm();
                  setOpenAdd(true);
                }}
              >
                Add User
              </Button>
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <section className="mt-5 space-y-3">
              {data
                ?.filter((e) =>
                  e.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between border p-3 rounded-md shadow-sm"
                  >
                    <h1>{e.name}</h1>
                    <div className="flex gap-2">
                      <Button danger onClick={() => deleteUser(e.id)}>
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setFieldValue("name", e.name);
                          setEditId(e.id);
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Link to={`/infoAsyncJotai/${e.id}`}>
                        <Button>Info</Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </section>
          </main>
        </>
      )}
    </Formik>
  );
};

export default AsyncJotai;
