import { useEffect, useRef, useState } from "react";
import { deleteWaifus, getWaifus, resetWaifus } from "../api/waifus/fetch";
import { Pencil, RotateCw, Save, Trash, Undo2, X } from "lucide-react";
import { UpdateWaifuData, WaifuData } from "../api/waifus/model";
import WaifuForm from "./waifuForm";
import Backdrop from "./backdrop";

interface WaifuListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WaifuList({ setIsOpen }: WaifuListProps) {
  const [updateList, setUpdateList] = useState(true);
  const [waifus] = useState<WaifuData[]>((): WaifuData[] => {
    if (updateList) {
      setUpdateList(false);
      return getWaifus();
    }
    return waifus;
  });
  const [newWaifus, setNewWaifus] = useState<WaifuData[]>(waifus);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [waifuFormData, setWaifuFormData] = useState<UpdateWaifuData>();
  const [waifusIdToDelete, setWaifusIdToDelete] = useState<number[]>([]);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!firstLoad.current) {
      if (!openBackdrop) setNewWaifus(getWaifus());
    }
    firstLoad.current = false;
  }, [openBackdrop]);

  const handleDeleteWaifu = (index: number | number[]) => {
    setWaifusIdToDelete(() => {
      return Array.isArray(index) ? index : new Array(index);
    });
    setNewWaifus((prevWaifus) => {
      const deletedWaifus = Array.isArray(index)
        ? prevWaifus.filter((waifu) => !index.includes(waifu.id))
        : prevWaifus.filter((waifu) => waifu.id !== index);

      return deletedWaifus;
    });
  };

  const handleResetList = () => {
    setNewWaifus(resetWaifus());
  };

  const handleUndoDelete = () => {
    setNewWaifus(waifus);
  };

  const handleSaveList = () => {
    if (waifusIdToDelete.length > 0) {
      deleteWaifus(waifusIdToDelete);
    }
    setIsOpen(false);
  };

  const handleCheckboxChange = (isChecked: boolean, index: number) => {
    setCheckedItems((prevCheckedItems) =>
      isChecked
        ? [...prevCheckedItems, index]
        : prevCheckedItems.filter((item) => item !== index)
    );
  };
  const handleEditWaifu = (waifu: UpdateWaifuData) => {
    setWaifuFormData(waifu);
    setOpenBackdrop(true);
  };

  return (
    <div className="w-[600px] min-h-[500px] max-h-[500px] flex flex-col overflow-hidden bg-white bg-opacity-50 rounded-xl">
      {openBackdrop && (
        <Backdrop isOpen={openBackdrop}>
          <WaifuForm
            waifu={waifuFormData}
            editMode={true}
            setIsOpen={setOpenBackdrop}
          />
        </Backdrop>
      )}
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
      <div className="overflow-y-auto h-[300px]">
        <table className="w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>backgroundUrl</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {newWaifus &&
              newWaifus.map((waifu, index) => (
                <tr className="row" key={index}>
                  <td className="idCol">{waifu.id}</td>
                  <td className="nameCol">{waifu.name}</td>
                  <td className="backgroundCol">
                    <a
                      className="hover:text-blue-800 hover:text-opacity-70 transition-all"
                      target="_blank"
                      href={waifu.backgroundUrl}
                    >
                      {waifu.backgroundUrl}
                    </a>
                  </td>
                  <td className="optionsCol">
                    <input
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, waifu.id)
                      }
                      className="w-5 h-5 cursor-pointer"
                      type="checkbox"
                      checked={checkedItems.includes(waifu.id)}
                    ></input>
                    <button
                      onClick={() => handleEditWaifu(waifu)}
                      className="edit-button"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
