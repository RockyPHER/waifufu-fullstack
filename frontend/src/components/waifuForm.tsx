import { Check, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { schema } from "../api/waifus/schema";
import Backdrop from "./backdrop";
import { createWaifu, updateWaifus } from "../api/waifus/fetch";
import { WaifuData } from "../api/waifus/model";

interface WaifuFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  waifu?: WaifuData;
  editMode: boolean;
}

export default function WaifuForm({
  setIsOpen,
  editMode,
  waifu,
}: WaifuFormProps) {
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
  const [success, setSuccess] = useState(false);

  function setFormValues(): void {
    (document.getElementById("name") as HTMLInputElement).value =
      waifu?.name || "";
    (document.getElementById("age") as HTMLInputElement).value =
      waifu?.age?.toString() || "";
    (document.querySelector("#birth-month") as HTMLSelectElement).value =
      waifu?.birthday?.split("_")[0] || "";
    (document.querySelector("#birth-day") as HTMLSelectElement).value =
      waifu?.birthday?.split("_")[1] || "";
    (document.getElementById("hair") as HTMLInputElement).value =
      waifu?.hairColor || "";
    (document.getElementById("eye") as HTMLInputElement).value =
      waifu?.eyeColor || "";
    (document.getElementById("height") as HTMLInputElement).value =
      waifu?.height?.toString() || "";
    (document.getElementById("weight") as HTMLInputElement).value =
      waifu?.weight?.toString() || "";
  }

  function getFormValues() {
    let waifu = {
      id: editMode ? getWaifuId() : Math.floor(Math.random() * 100000),
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
        document.getElementById("origin") as HTMLInputElement & {
          value: string;
        }
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
        document.getElementById("height") as HTMLInputElement & {
          value: number;
        }
      ).value,
      weight: (
        document.getElementById("weight") as HTMLInputElement & {
          value: number;
        }
      ).value,
      backgroundUrl: (
        document.getElementById("background") as HTMLInputElement & {
          value: string;
        }
      ).value,
    };

    return waifu;
  }

  function getWaifuId() {
    return waifu
      ? waifu.id
      : (() => {
          throw new Error("Waifu ID not found");
        })();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const waifus = getFormValues();
    try {
      schema.validate(waifus);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSuccess(false);
      alert("Please check your input");
    }
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleBirthdayOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const month = e.target.value;
    setSelectedMonth(month);
    setMaxDays(days[month]);
  }

  useEffect(() => {
    if (success) {
      if (editMode) {
        updateWaifus(getFormValues());
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 500);
      } else {
        createWaifu(getFormValues());
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 500);
      }
    }
  }, [success]);
  useEffect(() => {
    if (editMode) {
      setFormValues();
    }
  });

  return (
    <div className="w-[600px] h-auto bg-white bg-opacity-30 rounded-xl overflow-hidden">
      {success && (
        <Backdrop isOpen={success}>
          <div className="w-full h-full flex justify-center items-center">
            <Check className="w-20 h-20 text-green-700" />
          </div>
        </Backdrop>
      )}
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
                <option>unknown</option>
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
