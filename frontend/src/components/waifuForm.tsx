import { Save, X } from "lucide-react";
import { useState } from "react";
import { schema } from "../api/waifus/schema";
import { WaifuData } from "../api/waifus/model";

interface WaifuFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WaifuForm({ setIsOpen }: WaifuFormProps) {
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

    validateWaifu(getFormValues());
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
            required
            placeholder="Waifu name"
            id="name"
            name="name"
            type="text"
          ></input>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[245px] flex flex-col">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              placeholder="16"
              type="number"
              min={0}
            ></input>
          </div>
          <div className="w-[245px] flex flex-col">
            <label htmlFor="birthday">birthday</label>
            <div className="w-full flex justify-between">
              <select
                id="birth-month"
                name="birthday"
                className="select-month"
                onChange={(e) => handleBirthdayOption(e)}
              >
                <option>none</option>
                {months.map((month, index) => (
                  <option key={index}>{month}</option>
                ))}
              </select>
              <select id="birth-day" name="birthday" className="select-day">
                <option>--</option>
                {Array.from({ length: maxDays }, (_, index) => (
                  <option key={index}>{index + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[245px] flex flex-col">
            <label htmlFor="origin">Origin</label>
            <input
              required
              id="origin"
              name="origin"
              placeholder="Anime/Origin name"
              type="text"
            ></input>
          </div>
          <div className="w-[245px] flex flex-col">
            <label htmlFor="origin-url">Origin Url</label>
            <input
              id="origin-url"
              name="origin-url"
              placeholder="https://exampleorigin.com"
              type="text"
            ></input>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[245px] flex flex-col">
            <label htmlFor="hair">Hair Color</label>
            <input
              id="hair"
              name="hair"
              placeholder="purple"
              type="text"
            ></input>
          </div>
          <div className="w-[245px] flex flex-col">
            <label htmlFor="eye">Eye Color</label>
            <input id="eye" name="eye" placeholder="blue" type="text"></input>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[245px] flex flex-col">
            <label htmlFor="height">height</label>
            <input
              id="height"
              name="height"
              placeholder="157"
              type="number"
              min={0}
            ></input>
          </div>
          <div className="w-[245px] flex flex-col">
            <label htmlFor="weight">weight</label>
            <input
              id="weight"
              name="weight"
              placeholder="45"
              type="number"
              min={0}
            ></input>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label htmlFor="background">background url</label>
          <input
            required
            id="background"
            name="background"
            placeholder="https://examplebackground.com"
            type="text"
          ></input>
        </div>
        <button
          value="submit"
          className="my-6 px-10 py-2 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-all"
        >
          <Save className="w-8 h-8" />
        </button>
      </form>
    </div>
  );
}

function getFormValues() {
  let waifu = {
    name: (
      document.getElementById("name") as HTMLInputElement & { value: string }
    ).value,
    age: (
      document.getElementById("age") as HTMLInputElement & { value: number }
    )?.value,
    birthday:
      (
        document.querySelector("#birth-month") as HTMLSelectElement & {
          value: string;
        }
      ).value +
      "_" +
      (
        document.querySelector("#birth-day") as HTMLSelectElement & {
          value: string;
        }
      ).value,
    origin: (
      document.getElementById("origin") as HTMLInputElement & { value: string }
    ).value,
    originUrl: (
      document.getElementById("origin-url") as HTMLInputElement & {
        value: string;
      }
    ).value,
    hairColor: (
      document.getElementById("hair") as HTMLInputElement & { value: string }
    ).value,
    eyeColor: (
      document.getElementById("eye") as HTMLInputElement & { value: string }
    ).value,
    height: (
      document.getElementById("height") as HTMLInputElement & { value: number }
    ).value,
    weight: (
      document.getElementById("weight") as HTMLInputElement & { value: number }
    ).value,
    backgroundUrl: (
      document.getElementById("background") as HTMLInputElement & {
        value: string;
      }
    ).value,
  };

  return waifu;
}

function validateWaifu(waifu: WaifuData) {
  let test = schema.validate(waifu);
  console.log(test);
  return test;
}
