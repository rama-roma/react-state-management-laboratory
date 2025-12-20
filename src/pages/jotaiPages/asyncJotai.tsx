import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { dataAtom, deleteAtom, getAtom, addAtom } from "../../state/jotai/atomTodos";
import { Modal, Input, Button } from "antd";
import { Formik } from "formik";

const AsyncJotai = () => {
  const [data] = useAtom(dataAtom);
  const [, getUser] = useAtom(getAtom);
  const [, deleteUser] = useAtom(deleteAtom);
  const [, addUser] = useAtom(addAtom);

  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main>
        <Button type="primary" onClick={() => setOpenAdd(true)}>
          Add User
        </Button>

        <section>
          {data?.data?.map((e) => (
            <div key={e.id}>
              <h1>{e.name}</h1>
              <Button danger onClick={() => deleteUser(e.id)}>
                Delete
              </Button>
            </div>
          ))}
        </section>
      </main>

      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, { resetForm }) => {
          addUser(values);
          resetForm();
          setOpenAdd(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Modal
            title="Add user"
            open={openAdd}
            onCancel={() => setOpenAdd(false)}
            onOk={() => handleSubmit()}
            okText="Add"
          >
            <Input
              name="name"
              placeholder="User name"
              value={values.name}
              onChange={handleChange}
            />
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default AsyncJotai;
