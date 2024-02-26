import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Slider } from "./components/slider";
import Waifu from "./api/waifus/model";
import { getWaifus } from "./api/waifus/fetch";

export default function App() {
  const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
    queryKey: ["waifus"],
    queryFn: getWaifus,
  });

  const waifusData = MyQuery.data?.data;

  console.log(waifusData);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Slider waifuData={waifusData} />
    </div>
  );
}
