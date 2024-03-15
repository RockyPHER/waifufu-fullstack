import { useEffect, useState } from "react";
import { backupWaifus, getWaifus, updateWaifus } from "../api/waifus/fetch";
import { Pen, Pencil, RotateCw, Save, Trash, Undo2, X } from "lucide-react";
import Waifu from "../api/waifus/model";

interface WaifuListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WaifuList({ setIsOpen }: WaifuListProps) {
  const [waifus, setWaifus] = useState<Waifu[]>(getWaifus());
  const [newWaifus, setNewWaifus] = useState<Waifu[]>(waifus);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleDeleteWaifu = (index: number | number[]) => {
    setNewWaifus((prevWaifus) => {
      const updatedWaifus = Array.isArray(index)
        ? prevWaifus.filter((waifu) => !index.includes(waifu.id))
        : prevWaifus.filter((waifu) => waifu.id !== index);

      return updatedWaifus;
    });
  };

  const handleResetList = () => {
    setNewWaifus(backupWaifus());
  };

  const handleUndoDelete = () => {
    setNewWaifus(waifus);
  };

  const handleSaveList = () => {
    updateWaifus(newWaifus);
    setIsOpen(false);
  };

  const handleCheckboxChange = (isChecked: boolean, index: number) => {
    setCheckedItems((prevCheckedItems) =>
      isChecked
        ? [...prevCheckedItems, index]
        : prevCheckedItems.filter((item) => item !== index)
    );
  };

  useEffect(() => {
    setWaifus(getWaifus());
    setNewWaifus(waifus);
    console.log("Waifus updated:", waifus);
  }, []);
  return (
    <div className="w-[600px] max-h-[500px] flex flex-col overflow-hidden bg-white bg-opacity-50 rounded-xl">
      {/* header */}
      <div className="w-full h-auto px-5 py-4 flex justify-between items-center bg-black bg-opacity-50">
        <h1 className="w-auto h-auto flex items-center select-none font-bold text-4xl text-gray-300">
          WaifuList
        </h1>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 border border-transparent rounded-full hover:scale-110 hover:border-white hover:border-opacity-50 active:scale-90 transition-all"
        >
          <X className="w-8 h-8" />
        </button>
      </div>
      {/* body */}
      <div className="overflow-y-auto">
        <ol className="text-black">
          {newWaifus &&
            newWaifus.map((waifu, index) => (
              <li
                className="px-5 py-2 flex items-center justify-between hover:bg-white hover:bg-opacity-30"
                key={index}
              >
                <span className="max-w-[460px] max-h-[50px] text-md overflow-clip">
                  <p>{waifu.id + " : " + waifu.name}</p>
                  <p>{waifu.backgroundUrl}</p>
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-1 border rounded-full">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <input
                    className="w-6 h-6"
                    onChange={(e) =>
                      handleCheckboxChange(e.target.checked, waifu.id)
                    }
                    type="checkbox"
                    id={index.toString()}
                  />
                </div>
              </li>
            ))}
        </ol>
      </div>
      {/* division line */}
      <div className="w-full h-auto flex justify-center items-center">
        <div className="w-1/6 h-px bg-black bg-opacity-30 rounded-full" />
        <button
          onClick={() => handleUndoDelete()}
          className="p-1 mx-2 bg-blue-500 bg-opacity-50 hover:bg-blue-700 hover:bg-opacity-70 active:bg-blue-800 active:bg-opacity-80 text-white rounded-full transition-all"
        >
          <Undo2 className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleDeleteWaifu(checkedItems)}
          className="p-1 mx-2 bg-gray-500 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-70 active:bg-gray-800 active:bg-opacity-80 text-white rounded-full transition-all"
        >
          <Trash className="w-6 h-6" />
        </button>
        <div className="w-1/6 h-px bg-black bg-opacity-30 rounded-full" />
      </div>
      {/* footer */}
      <div className="w-full h-auto p-4 flex justify-evenly items-center">
        <button
          onClick={() => handleSaveList()}
          className="px-6 py-1 bg-black bg-opacity-50 hover:bg-opacity-70 active:bg-gray-800 active:bg-opacity-80 text-white rounded"
        >
          <Save className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleResetList()}
          className="px-6 py-1 bg-red-500 bg-opacity-50 hover:bg-red-700 hover:bg-opacity-70 active:bg-red-800 active:bg-opacity-80 text-white rounded"
        >
          <RotateCw className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
