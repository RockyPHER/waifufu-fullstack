import { beforeEach, expect, test } from "vitest";
import { deleteWaifus } from "../src/api/waifus/fetch";
import { installMockLocalStorage, mockWaifusData } from "./scripts";

installMockLocalStorage();

beforeEach(() => {
  localStorage.clear();
});

test("Returns deleted waifus if indices are valid", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const result = deleteWaifus([1, 2]);
  expect(result).toEqual([mockWaifusData[0], mockWaifusData[1]]);
});

test("Returns deleted waifu if only one index is gived", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const result = deleteWaifus([1]);
  expect(result).toEqual([mockWaifusData[0]]);
});

test("Throws error if indices are invalid", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  expect(() => deleteWaifus([4, 6, 7])).toThrowError(
    /^Invalid indices: 4, 6, 7/,
  );
});

test("Throws error if at least one index is invalid", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  expect(() => deleteWaifus([1, 4, 6, 7])).toThrowError(
    /^Invalid indices: 4, 6, 7/,
  );
});
