interface StorageItem {
  [key: string]: any;
}

export const getArrayStorage = <T extends StorageItem>(key: string): T[] => {
  const value = localStorage.getItem(key) || "";
  return value.length > 0 ? (JSON.parse(value) as T[]) : [];
};

export const getItemStorage = (key: string): string => {
  const value = localStorage.getItem(key) || "";
  return value.length > 0 ? value : "";
};

export const getStorage = <T extends StorageItem>(key: string): T | null => {
  const value = localStorage.getItem(key) || "";
  return value.length > 0 ? (JSON.parse(value) as T) : null;
};

export const setArrayStorage = <T extends StorageItem>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export const setItemStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const setStorage = <T extends StorageItem>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeStorage = (key: string) => localStorage.removeItem(key);
