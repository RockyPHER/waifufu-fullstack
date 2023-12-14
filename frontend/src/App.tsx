import { useEffect, useState } from "react";
import api from "./services/api";


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
  
  const [waifus, setWaifus] = useState<Waifu[]>([]);

  async function getWaifus () {
    const res = await api.get<Waifu[]>("/waifus");
    const waifus = res.data;
    setWaifus(waifus);
  }

  useEffect(() => {
    getWaifus();
  },[])

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