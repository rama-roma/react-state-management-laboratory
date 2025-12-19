import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getbyIdRedux } from "../../state/redux/reducers/todosSlice";

const InfoAsyncRedux = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { dataById } = useSelector(
    (state: { todos: { dataById: null } }) => state.todos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbyIdRedux(id));
  }, [id, dispatch]);

  return (
    <>
      <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-6 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>

        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-2">{dataById?.name}</h1>
          <p className="text-gray-600 mb-4">{dataById?.description}</p>
          <p
            className={`font-medium mb-4 ${
              dataById?.isCompleted ? "text-green-600" : "text-red-500"
            }`}
          >
            {dataById?.isCompleted ? "Active" : "Inactive"}
          </p>

          <div className="flex flex-wrap gap-4">
            {dataById?.images.map((img) => (
              <div
                key={img.id}
                className="w-32 h-32 rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                  alt={img.imageName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default InfoAsyncRedux;
