import { beforeEach, expect, test } from "vitest";
import { resetWaifus } from "../src/api/waifus/fetch";
import waifusData from "../src/api/waifus.json";
import { installMockLocalStorage, mockWaifusData } from "./scripts";

installMockLocalStorage();

beforeEach(() => {
  localStorage.clear();
});

test("Resets and returns value of localStorage", () => {
  localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
  const result = resetWaifus();
  expect(result).toEqual(waifusData);
});
