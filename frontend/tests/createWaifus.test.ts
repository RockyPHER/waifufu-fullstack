import { expect, test } from "vitest";
import { mockLocalStorage, mockWaifusData } from "./scripts";
import { createWaifus } from "../src/api/waifus/fetch";

(global as any).localStorage = {
    getItem: (key: string) => mockLocalStorage[key] || null,
    setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
    removeItem: (key: string) => { delete mockLocalStorage[key]; }
};

test("Returns waifus when multiple waifus is input", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const newWaifus = [
        {
            id: 23,
            name: "Horikita"
        },
        {
            id: 65,
            name: "Nanakusa"
        }
    ];
    const result = createWaifus(newWaifus);
    expect(result).toEqual([...mockWaifusData, ...newWaifus]);
})

test("Returns waifus when a single waifu is input", async () => {
    localStorage.setItem("waifus", JSON.stringify(mockWaifusData));
    const newWaifus = [
        {
            id: 33,
            name: "Anohara"
        }
    ];
    const result = createWaifus(newWaifus);
    expect(result).toEqual([...mockWaifusData, ...newWaifus])
})

test("Throws error when input is not in a valid format", async () => {
    const newWaifu = [
        {
            x: 21,
            quadrado: "bolinha"
        }
    ]
    expect(() => createWaifus(newWaifu)).toThrowError(/^Waifu is not in the expected format/)
})