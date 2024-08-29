import { initCloudStorage } from '@telegram-apps/sdk-react';
import { StateStorage } from 'zustand/middleware';

const getCloudStorage = (): StateStorage => {
  const cloudStorage = initCloudStorage();

  // Custom storage object based on Telegram Cloud Storage
  return {
    getItem: async (name: string): Promise<string | null> => {
      return (await cloudStorage.get(name)) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      await cloudStorage.set(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
      await cloudStorage.delete(name);
    }
  };
};

export const cloudStorage = getCloudStorage();
