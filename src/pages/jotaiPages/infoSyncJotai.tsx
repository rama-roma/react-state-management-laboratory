import { useNavigate, useParams } from "react-router";
import { useAtom } from "jotai";
import { dataAtom } from "../../state/jotai/atomTodo";

const InfoSyncJotai = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data] = useAtom(dataAtom);

  const user = data.find((u) => u.id === Number(id));

  return (
    <main>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-neutral-500 hover:text-neutral-800 transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-neutral-800 mb-3">
          {user?.name}
        </h1>

        <span
          className={`inline-block px-4 py-1 text-sm rounded-full font-medium ${
            user?.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user?.status ? "Active" : "Inactive"}
        </span>
      </div>
    </main>
  );
};

export default InfoSyncJotai;
