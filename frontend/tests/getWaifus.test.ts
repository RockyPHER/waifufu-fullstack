import { getWaifus } from "../src/api/waifus/fetch";
import { expect, test } from "vitest";
import { defaultWaifusData, mockLocalStorage, mockWaifusData } from "./scripts";

(global as any).localStorage = {
    getItem: (key: string) => mockLocalStorage[key] || null,
    setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
    removeItem: (key: string) => { delete mockLocalStorage[key]; }
};

test("Returns waifus when they are found on local storage", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const result = getWaifus();
    expect(result).toEqual(mockWaifusData);
})

test("Returns waifus when they are not found on local storage", async () => {
    localStorage.removeItem("waifus");
    const result = getWaifus();
    expect(result).toEqual(defaultWaifusData);
})

test("Returns waifus when local storage data is not in the expected format", async () => {
    localStorage.setItem("waifus", JSON.stringify([1, 2, 3]));
    const result = getWaifus();
    expect(result).toEqual(defaultWaifusData);
})