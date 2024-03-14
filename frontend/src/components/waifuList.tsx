import { useEffect, useState } from "react";
import { backupWaifus, getWaifus, updateWaifus } from "../api/waifus/fetch";
import { RotateCw, Save, Trash, Undo2, X } from "lucide-react";
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
    <div className="w-[440px] max-h-[500px] flex flex-col overflow-hidden bg-white bg-opacity-50 rounded-xl">
      {/* header */}
      <div className="w-full h-auto px-5 py-4 flex justify-between items-center bg-black bg-opacity-80">
        <h1 className="w-auto h-auto flex items-center select-none font-bold text-4xl text-gray-300">
          WaifuList
        </h1>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-white hover:bg-opacity-30 rounded-full"
        >
          <X className="w-8 h-8" />
        </button>
      </div>
      {/* body */}
      <div className="overflow-y-auto">
        <ol className="text-xl text-black">
          {newWaifus &&
            newWaifus.map((waifu, index) => (
              <li
                className="px-5 py-2 flex items-center justify-between hover:bg-gray-700 hover:bg-opacity-20"
                key={index}
              >
                <span>{index + "/" + waifu.id + ": " + waifu.name}</span>
                <input
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, waifu.id)
                  }
                  className="w-5 h-5 cursor-pointer"
                  type="checkbox"
                  id={index.toString()}
                />
              </li>
            ))}
        </ol>
      </div>
      {/* division line */}
      <div className="w-full h-auto flex justify-center items-center">
        <div className="w-1/6 h-px bg-black bg-opacity-30 rounded-full" />
        <button
          onClick={() => handleUndoDelete()}
          className="p-1 mx-2 bg-blue-500 bg-opacity-30 hover:bg-blue-700 hover:bg-opacity-50 active:bg-blue-800 active:bg-opacity-80 text-white rounded-full transition-all"
        >
          <Undo2 className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleDeleteWaifu(checkedItems)}
          className="p-1 mx-2 bg-gray-500 bg-opacity-30 hover:bg-gray-700 hover:bg-opacity-50 active:bg-gray-800 active:bg-opacity-80 text-white rounded-full transition-all"
        >
          <Trash className="w-6 h-6" />
        </button>
        <div className="w-1/6 h-px bg-black bg-opacity-30 rounded-full" />
      </div>
      {/* footer */}
      <div className="w-full h-auto p-4 flex justify-evenly items-center">
        <button
          onClick={() => handleSaveList()}
          className="px-6 py-1 bg-black bg-opacity-30 hover:bg-opacity-50 active:bg-gray-800 active:bg-opacity-80 text-white rounded"
        >
          <Save className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleResetList()}
          className="px-6 py-1 bg-red-500 bg-opacity-30 hover:bg-red-700 hover:bg-opacity-50 active:bg-red-800 active:bg-opacity-80 text-white rounded"
        >
          <RotateCw className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
