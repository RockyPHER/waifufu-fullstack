// import { useQuery } from "@tanstack/react-query";
// import { AxiosError, AxiosResponse } from "axios";
// import { getWaifus } from "./api/waifus/waifusApi";
// import Waifu from "./api/waifus/WaifusApiModel";
import { Carousel } from "./components/Carousel/Carousel";

export default function App() {

  // const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
  //   queryKey: ["waifus"],
  //   queryFn: getWaifus
  // })


  const waifusMock = [
    {
      id: 1,
      name: "Hatsune Miku",
      age: 16,
      imageUrl: "https://r4.wallpaperflare.com/wallpaper/997/47/663/anime-anime-girls-hatsune-miku-blue-hair-wallpaper-4b06ec1d63512f3945c49ba94d4c7cb0.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Hatsune Miku",
      age: 16,
      imageUrl: "https://r4.wallpaperflare.com/wallpaper/406/423/783/vocaloid-hatsune-miku-twintails-headphones-wallpaper-d9f038ed513a0deb66b7d82f9071560d.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "Hatsune Miku",
      age: 16,
      imageUrl: "https://r4.wallpaperflare.com/wallpaper/883/495/782/anime-anime-girls-hatsune-miku-vocaloid-wallpaper-120192901d26fedbca5892c5c048e922.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Carousel waifus={waifusMock} />
    </div>
  );
}