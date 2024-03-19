import { expect, test } from "vitest";
import { mockLocalStorage, mockWaifusData } from "./scripts";
import { resetWaifus } from "../src/api/waifus/fetch";
import waifusData from "../src/api/waifus.json"

(global as any).localStorage = {
    getItem: (key: string) => mockLocalStorage[key] || null,
    setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
    removeItem: (key: string) => { delete mockLocalStorage[key]; }
};

test("Resets and returns value of localStorage", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData))
    const result = resetWaifus();
    expect(result).toEqual(waifusData);
});