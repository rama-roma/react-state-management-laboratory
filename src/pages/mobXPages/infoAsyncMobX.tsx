import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { todos } from "../../state/mobX/mobXTodos";

const InfoAsyncMobX = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      todos.getById(Number(id));
    }
  }, [id]);

  const user = todos.dataByID;

  return (
    <main>
      <button
        onClick={() => navigate(-1)}
        className="self-start px-4 py-2 mb-6 bg-yellow-200 hover:bg-yellow-300 rounded-lg shadow transition font-medium"
      >
        Back
      </button>
      <div className="max-w-md w-full p-6 rounded-2xl bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border border-yellow-300 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
        <h1 className="text-2xl font-bold text-yellow-800 mb-3">{user?.name}</h1>
        <p
          className={`inline-block px-4 py-2 rounded-full font-medium text-sm ${
            user?.status
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-700"
          }`}
        >
          {user?.status ? "Active" : "Inactive"}
        </p>
        <div className="mt-4 text-yellow-700">
          <p className="text-sm">User ID: {user?.id}</p>
        </div>
      </div>
    </main>
  );
};

export default InfoAsyncMobX;
