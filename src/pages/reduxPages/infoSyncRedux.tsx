import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const InfoSyncRedux = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.todo);
  const user = data.find((u) => u.id === Number(id));

  return (
    <main className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 transition"
      >
        ← Back
      </button>

      <div className="max-w-md rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="mb-3 text-2xl font-semibold">
          {user?.name}
        </h1>

        <p
          className={`inline-block rounded-full px-4 py-1 text-sm font-medium ${
            user?.status
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user?.status ? "Active" : "Inactive"}
        </p>
      </div>
    </main>
  );
};

export default InfoSyncRedux;
