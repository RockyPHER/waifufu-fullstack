import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Slider } from "./components/slider";
import Waifu from "./api/waifus/model";
import { getWaifus } from "./api/waifus/fetch";
import { WaifuCard } from "./components/waifucard";
import WaifuInfo from "./components/waifuInfo";

export default function App() {
  const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
    queryKey: ["waifus"],
    queryFn: getWaifus,
  });

  const waifusData = MyQuery.data?.data;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Slider totalPages={waifusData?.length || 0}>
        <WaifuCard />
      </Slider>
      {
waifusData &&
      <WaifuInfo waifu={waifusData?} />
      }
    </div>
  );
}
