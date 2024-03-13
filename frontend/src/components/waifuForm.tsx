import { Save, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface WaifuFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WaifuForm({ setIsOpen }: WaifuFormProps) {
  const [birthdayValue, setBirthdayValue] = useState("");
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const days: { [key: string]: number } = {
    january: 31,
    february: 29,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31,
  };
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [maxDays, setMaxDays] = useState(days[selectedMonth]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  function handleClose() {
    setIsOpen(false);
  }

  function handleBirthdayOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const month = e.target.value;
    setSelectedMonth(month);
    setMaxDays(days[month]);
  }
  return (
    <div className="w-[600px] h-auto bg-white bg-opacity-30 rounded-xl overflow-hidden">
      <div className="w-full h-auto px-10 py-4 flex justify-between items-center bg-black bg-opacity-50">
        <h1 className="text-3xl">Add Waifu</h1>
        <button
          className="p-1 border border-transparent rounded-full hover:scale-110 hover:border-white hover:border-opacity-50 active:scale-90 transition-all"
          onClick={handleClose}
        >
          <X className="w-8 h-8" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full pt-4 px-10 flex flex-col gap-2 items-center text-lg text-black"
      >
        <div className="w-full flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Waifu name"
            id="name"
            name="name"
            type="text"
          ></input>
        </div>

        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="age">Age</label>
            <input name="age" placeholder="16" type="number" min={0}></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthday">birthday</label>
            <div className="flex">
              <select onChange={(e) => handleBirthdayOption(e)}>
                {months.map((month, index) => (
                  <option key={index}>{month}</option>
                ))}
              </select>
              <select>
                {Array.from({ length: maxDays }, (_, index) => (
                  <option key={index}>{index + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <label>Origin</label>
            <input></input>
          </div>
          <div className="flex flex-col">
            <label>Origin Url</label>
            <input></input>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <label>Hair Color</label>
            <input></input>
          </div>
          <div className="flex flex-col">
            <label>Eye Color</label>
            <input></input>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <label>height</label>
            <input></input>
          </div>
          <div className="flex flex-col">
            <label>weight</label>
            <input></input>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label>background url</label>
          <input></input>
        </div>
        <button className="my-6 px-10 py-2 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-all">
          <Save className="w-8 h-8" />
        </button>
      </form>
    </div>
  );
}
