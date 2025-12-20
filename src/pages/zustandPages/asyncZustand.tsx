import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useTodos } from "../../state/zustand/useTodos";

const { Title, Text } = Typography;

const AsyncZustand = () => {
  const {
    data,
    getZustand,
    deleteZustand,
    addZustand,
    editZustand,
    checkoutZustand,
  } = useTodos();

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    getZustand();
  }, []);

  const handleAdd = () => {
    addZustand({ name: newName, status: newStatus });
    setOpenAdd(false);
    setNewName("");
    setNewStatus(false);
  };

  const handleEdit = () => {
    editZustand({ id: editId, name: editName, status: editStatus });
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditStatus(false);
  };

  const filteredData = data
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => {
      if (selected === "active") return i.status === true;
      if (selected === "inactive") return i.status === false;
      return true;
    });

  return (
    <>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
        <Space style={{ marginBottom: 24 }} wrap>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
          />

          <Select
            value={selected}
            onChange={setSelected}
            style={{ width: 140 }}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />

          <Button type="primary" onClick={() => setOpenAdd(true)}>
            Add User
          </Button>
        </Space>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {filteredData.map((e) => (
            <Card
              key={e.id}
              bordered
              hoverable
              actions={[
                <Button
                  type="link"
                  danger
                  onClick={() => deleteZustand(e.id)}
                >
                  Delete
                </Button>,
                <Button
                  type="link"
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditStatus(e.status);
                  }}
                >
                  Edit
                </Button>,
                <Link to={`/infoAsyncZustand/${e.id}`}>Info</Link>,
              ]}
            >
              <Title level={5}>{e.name}</Title>
              <Space>
                <Text type={e.status ? "success" : "danger"}>
                  {e.status ? "Active" : "Inactive"}
                </Text>
                <Switch
                  checked={e.status}
                  onChange={() => checkoutZustand(e.id)}
                />
              </Space>
            </Card>
          ))}
        </div>
      </main>

      <Modal
        title="Add User"
        open={openAdd}
        onOk={handleAdd}
        onCancel={() => setOpenAdd(false)}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Checkbox
            checked={newStatus}
            onChange={(e) => setNewStatus(e.target.checked)}
          >
            Active
          </Checkbox>
        </Space>
      </Modal>

      <Modal
        title="Edit User"
        open={openEdit}
        onOk={handleEdit}
        onCancel={() => setOpenEdit(false)}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Checkbox
            checked={editStatus}
            onChange={(e) => setEditStatus(e.target.checked)}
          >
            Active
          </Checkbox>
        </Space>
      </Modal>
    </>
  );
};

export default AsyncZustand;
