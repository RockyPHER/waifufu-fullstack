import { getWaifus } from "../src/api/waifus/fetch";
import { beforeEach, expect, test } from "vitest";
import {
  defaultWaifusData,
  installMockLocalStorage,
  mockWaifusData,
} from "./scripts";

installMockLocalStorage();

beforeEach(() => {
  localStorage.clear();
});

test("Returns waifus when they are found on local storage", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const result = getWaifus();
  expect(result).toEqual(mockWaifusData);
});

test("Returns waifus when they are not found on local storage", () => {
  localStorage.removeItem("waifus");
  const result = getWaifus();
  expect(result).toEqual(defaultWaifusData);
});

test("Returns waifus when local storage data is not in the expected format", () => {
  localStorage.setItem("waifus", JSON.stringify([1, 2, 3]));
  const result = getWaifus();
  expect(result).toEqual(defaultWaifusData);
});
