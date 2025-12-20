import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Button, Typography, Tag } from "antd";
import { useTodos } from "../../state/zustand/useTodos";

const { Title, Text } = Typography;

const InfoAsyncZustand = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataById, getIdZustand } = useTodos();

  useEffect(() => {
    getIdZustand(id);
  }, [id]);

  return (
    <main style={{ maxWidth: 500, margin: "40px auto" }}>
      <Button type="link" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card style={{ marginTop: 20 }}>
        <Title level={4}>{dataById?.name}</Title>
        <Tag color={dataById?.status ? "green" : "red"}>
          {dataById?.status ? "Active" : "Inactive"}
        </Tag>
      </Card>
    </main>
  );
};

export default InfoAsyncZustand;
