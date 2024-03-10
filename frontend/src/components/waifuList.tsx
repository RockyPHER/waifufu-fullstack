import { useQuery } from "@tanstack/react-query";
import { getWaifus } from "../api/waifus/fetch";
import { RotateCw, Save, Trash, Undo2, X } from "lucide-react";

interface WaifuListProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function WaifuList({ close }: WaifuListProps) {
  const { data } = useQuery({ queryKey: [Object], queryFn: getWaifus });

  const waifus = data;

  function handleResetList() {}

  function handleUndoDelete() {}

  function handleSaveList() {}
  return (
    <div className="w-[440px] max-h-[450px] flex flex-col overflow-hidden bg-white bg-opacity-50 rounded-xl">
      {/* header */}
      <div className="w-full h-auto px-5 py-4 flex justify-between items-center bg-black bg-opacity-80">
        <h1 className="w-auto h-auto flex items-center select-none font-bold text-4xl text-gray-300">
          WaifuList
        </h1>
        <button
          onClick={() => close(false)}
          className="p-1 hover:bg-white hover:bg-opacity-30 rounded-full"
        >
          <X className="w-8 h-8" />
        </button>
      </div>
      {/* body */}
      <div className="overflow-y-auto">
        <ol className="text-xl text-black">
          {waifus &&
            waifus.map((waifu, index) => (
              <li
                className="px-5 py-2 flex items-center justify-between hover:bg-black hover:bg-opacity-20"
                key={index}
              >
                {waifu.name}
                <button className="p-1 hover:bg-white hover:bg-opacity-20 active:bg-black active:bg-opacity-80 rounded-full active:text-gray-300">
                  <Trash />
                </button>
              </li>
            ))}
        </ol>
      </div>
      <div className="w-full h-auto flex justify-center ">
        <div className="w-2/3 h-px bg-black bg-opacity-30 rounded-full" />
      </div>
      <div className="w-full h-auto p-4 flex justify-evenly items-center">
        <button
          onClick={handleSaveList}
          className="px-6 py-1 bg-black bg-opacity-30 hover:bg-opacity-50 active:bg-gray-800 active:bg-opacity-80 text-white rounded"
        >
          <Save className="w-8 h-8" />
        </button>
        <button
          onClick={handleUndoDelete}
          className="px-6 py-1 bg-blue-500 bg-opacity-30 hover:bg-blue-700 hover:bg-opacity-50 active:bg-blue-800 active:bg-opacity-80 text-white rounded"
        >
          <Undo2 className="w-8 h-8" />
        </button>
        <button
          onClick={handleResetList}
          className="px-6 py-1 bg-red-500 bg-opacity-30 hover:bg-red-700 hover:bg-opacity-50 active:bg-red-800 active:bg-opacity-80 text-white rounded"
        >
          <RotateCw className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
