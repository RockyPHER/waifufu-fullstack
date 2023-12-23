// import { useQuery } from "@tanstack/react-query";
// import { AxiosError, AxiosResponse } from "axios";
// import { getWaifus } from "./api/waifus/waifusApi";
// import Waifu from "./api/waifus/WaifusApiModel";
import { Carousel } from "./components/Carousel/Carousel";
import { useState, useEffect } from 'react';
import waifusData from './waifus.json';
import Waifu from "./api/waifus/WaifusApiModel";


// export default function App() {

//   const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
//     queryKey: ["waifus"],
//     queryFn: getWaifus
//   })



//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <Carousel waifus={MyQuery.data?.data || []} />
//     </div>
//   );
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertWaifus(waifusData: any) {
  const waifus = waifusData.map((waifu: { id: number; name: string; age: number; imageUrl: string; hairColor: string; eyeColor: string; height: number; weight: number; origin: string; birthday: string; createdAt: Date; updatedAt: Date; }) => {
    return {
      id: waifu.id,
      name: waifu.name,
      age: waifu.age,
      imageUrl: waifu.imageUrl,
      hairColor: waifu.hairColor,
      eyeColor: waifu.eyeColor,
      height: waifu.height,
      weight: waifu.weight,
      origin: waifu.origin,
      birthday: waifu.birthday,
      createdAt: waifu.createdAt,
      updatedAt: waifu.updatedAt
    }
  });
  return waifus
}

export default function App() {
  const [waifus, setWaifus] = useState<Waifu[]>([]);
  const waifusDt = convertWaifus(waifusData);
  useEffect(() => {
    setWaifus(waifusDt);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Carousel waifus={waifus} />
    </div>
  );
}