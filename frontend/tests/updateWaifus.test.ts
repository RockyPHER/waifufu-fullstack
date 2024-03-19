import { expect, test } from "vitest";
import { mockLocalStorage, mockWaifusData } from "./scripts";
import { updateWaifus } from "../src/api/waifus/fetch.ts";

(global as any).localStorage = {
    getItem: (key: string) => mockLocalStorage[key] || null,
    setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
    removeItem: (key: string) => { delete mockLocalStorage[key]; }
};

test("Returns updated waifu if id is found", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const updatedWaifu = [{ id: 1, name: "Updated Waifu 1" }];
    const result = updateWaifus(updatedWaifu);
    const expectedResult = [{ id: 1, name: "Waifu 1" }, { id: 1, name: "Updated Waifu 1" }];
    expect(result).toEqual(expectedResult);
})

test("Throws error if input is not in the expected format", async () => {
    const updatedWaifu = [{ x: "xD" }];
    expect(() => updateWaifus(updatedWaifu)).toThrowError(/^Waifu is not in the expected format/);
})

test("Throws error if id is not found", async () => {
    const updatedWaifu = [{ id: 10000, name: "Updated Waifu 1" }];
    expect(() => updateWaifus(updatedWaifu)).toThrowError(/^Waifu not found/);
})