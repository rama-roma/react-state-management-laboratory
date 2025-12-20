import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getById } from "../../state/reactQuery/tanStack";

const InfoTanStack = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getById(Number(id)),
  });

  const images = data?.data?.images || [];

  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            {images.map((e) => (
              <div
                key={e.id}
                className="w-32 h-32 rounded-xl overflow-hidden shadow"
              >
                <img
                  className="w-full h-full object-cover"
                  src={`https://to-dos-api.softclub.tj/images/${e.imageName}`}
                  alt=""
                />
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data?.data?.name}
          </h1>
          <p className="text-gray-600 mb-4">{data?.data?.description}</p>

          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              data?.data?.isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {data?.data?.isCompleted ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </main>
  );
};

export default InfoTanStack;
