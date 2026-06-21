import waifusData from "../src/api/waifus.json";

export const defaultWaifusData = waifusData;
export const mockWaifusData = [
  { id: 1, name: "Waifu 1" },
  { id: 2, name: "Waifu 2" },
  { id: 3, name: "Waifu 3" },
];

export const mockLocalStorage: Record<string, string> = {};

export function installMockLocalStorage() {
  const localStorageMock: Storage = {
    clear() {
      Object.keys(mockLocalStorage).forEach((key) => {
        delete mockLocalStorage[key];
      });
    },
    getItem(key: string) {
      return key in mockLocalStorage ? mockLocalStorage[key] : null;
    },
    key(index: number) {
      return Object.keys(mockLocalStorage)[index] ?? null;
    },
    get length() {
      return Object.keys(mockLocalStorage).length;
    },
    removeItem(key: string) {
      delete mockLocalStorage[key];
    },
    setItem(key: string, value: string) {
      mockLocalStorage[key] = value;
    },
  };

  Object.defineProperty(globalThis, "localStorage", {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });
}
