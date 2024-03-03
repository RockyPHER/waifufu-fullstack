import { Menu, MinusCircle, PlusCircle } from "lucide-react";
import MenuButton from "../components/menuButton";

export default function Home() {
  return (
    <div className="w-full h-full relative bg-white">
      <nav className="w-full h-20 absolute top-0 flex justify-start items-center border">
        <MenuButton />
      </nav>
    </div>
  );
}
