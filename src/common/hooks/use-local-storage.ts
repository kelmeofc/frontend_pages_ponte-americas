import { useState, useEffect } from 'react';

interface CacheOptions {
  key: string;
  expirationTime?: number; // em milissegundos
}

export function useLocalStorage<T>({ key, expirationTime = 60 * 60 * 1000 }: CacheOptions) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const { value, timestamp } = JSON.parse(cachedData);
      const now = Date.now();

      if (now - timestamp < expirationTime) {
        setData(value);
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [key, expirationTime]);

  const saveData = (value: T) => {
    const dataToSave = {
      value,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
    setData(value);
  };

  const clearData = () => {
    localStorage.removeItem(key);
    setData(null);
  };

  const refreshData = () => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      setData(JSON.parse(cachedData).value);
    }
  };

  return {
    data,
    refreshData,
    saveData,
    clearData,
  };
} 