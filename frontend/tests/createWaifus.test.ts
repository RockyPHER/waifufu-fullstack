import { beforeEach, expect, test } from "vitest";
import { installMockLocalStorage, mockWaifusData } from "./scripts";
import { createWaifus } from "../src/api/waifus/fetch";

installMockLocalStorage();

beforeEach(() => {
  localStorage.clear();
});

test("Returns waifus when multiple waifus is input", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const newWaifus = [
    {
      id: 23,
      name: "Horikita",
    },
    {
      id: 65,
      name: "Nanakusa",
    },
  ];
  const result = createWaifus(newWaifus);
  expect(result).toEqual([...mockWaifusData, ...newWaifus]);
});

test("Returns waifus when a single waifu is input", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const newWaifus = [
    {
      id: 33,
      name: "Anohara",
    },
  ];
  const result = createWaifus(newWaifus);
  expect(result).toEqual([...mockWaifusData, ...newWaifus]);
});

test("Throws error when input is not in a valid format", () => {
  const newWaifu = [
    {
      x: 21,
      quadrado: "bolinha",
    },
  ];
  expect(() => createWaifus(newWaifu as never)).toThrowError(
    /^Waifu is not in the expected format/,
  );
});
