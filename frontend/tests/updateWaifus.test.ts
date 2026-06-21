import { beforeEach, expect, test } from "vitest";
import { updateWaifus } from "../src/api/waifus/fetch.ts";
import { installMockLocalStorage, mockWaifusData } from "./scripts";

installMockLocalStorage();

beforeEach(() => {
  localStorage.clear();
});

test("Returns updated waifu if id is found", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const updatedWaifu = [{ id: 1, name: "Updated Waifu 1" }];
  const result = updateWaifus(updatedWaifu);
  const expectedResult = [
    { id: 1, name: "Waifu 1" },
    { id: 1, name: "Updated Waifu 1" },
  ];
  expect(result).toEqual(expectedResult);
});

test("Throws error if input is not in the expected format", () => {
  const updatedWaifu = [{ x: "xD" }];
  expect(() => updateWaifus(updatedWaifu as never)).toThrowError(
    /^Waifu is not in the expected format/,
  );
});

test("Throws error if id is not found", () => {
  const updatedWaifu = [{ id: 10000, name: "Updated Waifu 1" }];
  expect(() => updateWaifus(updatedWaifu)).toThrowError(/^Waifu not found/);
});
