import { useNavigate, useParams } from "react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { dataById, getbyId } from "../../state/jotai/atomTodos";
import { Button } from "antd";

const InfoAsyncJotai = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(dataById);
  const [, fetchUserById] = useAtom(getbyId);

  useEffect(() => {
    if (id) fetchUserById(Number(id));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <Button onClick={() => navigate(-1)} type="default">
        Back
      </Button>

      <div className="mt-6 space-y-4">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>

      </div>
    </main>
  );
};

export default InfoAsyncJotai;
