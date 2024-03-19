import { expect, test } from "vitest";
import { deleteWaifus } from "../src/api/waifus/fetch";
import { mockLocalStorage, mockWaifusData } from "./scripts";
import { error } from "console";

(global as any).localStorage = {
    getItem: (key: string) => mockLocalStorage[key] || null,
    setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
    removeItem: (key: string) => { delete mockLocalStorage[key]; }
};

test("Returns deleted waifus if indices are valid", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const result = deleteWaifus([1, 2]);
    // id and array index are different
    expect(result).toEqual([mockWaifusData[0], mockWaifusData[1]]);
})

test("Returns deleted waifu if only one index is gived", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const result = deleteWaifus([1]);
    expect(result).toEqual([mockWaifusData[0]]);
})

test("Throws error if indices are invalid", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const result = deleteWaifus([4, 6, 7]);
    expect(result).toBe(error("Invalid indices: 4, 6, 7"));
})

test("Throws error if at least one index is invalid", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const result = deleteWaifus([1, 4, 6, 7]);
    expect(result).toBe(error("Invalid indices: 4, 6, 7"));
})
