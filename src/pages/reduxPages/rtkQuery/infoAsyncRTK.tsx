import { useNavigate, useParams } from "react-router-dom";
import { useGetByIdQuery } from "../../../state/redux/api/rtk";
import { Button } from "antd";


const InfoAsyncRTK = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetByIdQuery(id);
  const navigate = useNavigate();
  return (
    <main>
      <Button onClick={() => navigate(-1)}>Back</Button>
      {error ? (
        <div>Error</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div className="p-6 rounded-2xl bg-white shadow-sm">
          <h1 className="text-2xl font-semibold">{data?.data.name}</h1>
          <p className="text-gray-500 mt-2">ID: {data?.data.id}</p>
        </div>
      ) : null}
    </main>
  );
};

export default InfoAsyncRTK;