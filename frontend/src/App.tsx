import api from "./services/api";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";


export interface Waifu {
  id: number,
  name: string,
  age: number,
  hairColor?: string,
  eyeColor?: string,
  height?: number,
  weight?: number,
  birthday?: Date,
  bio?: string,
  createdAt: Date,
  updatedAt: Date,
}

export default function App() {
  
  const { data, isLoading, error, isError } = useQuery<AxiosResponse<Waifu[]>, Error>("waifus", getWaifus);

  async function getWaifus() {
    return await api.get<Waifu[]>("/waifus")
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Ocorreu o seguinte erro: {error.message}</div>;
  }

  const waifus = data?.data
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-40 p-3 rounded">
        <table className=" rounded-lg">
          <thead className="border-b-2">
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody className="">
            {waifus && waifus.map((waifu) => (
              <tr key={waifu.id}>
                <th>{waifu.id}</th>
                <th>{waifu.name}</th>
                <th>{waifu.age}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}