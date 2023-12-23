import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { getWaifus } from "./api/waifus/waifusApi";
import Waifu from "./api/waifus/WaifusApiModel";
import { Carousel } from "./components/Carousel/Carousel";

export default function App() {

  const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
    queryKey: ["waifus"],
    queryFn: getWaifus
  })



  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Carousel waifus={MyQuery.data?.data || []} />
    </div>
  );
}