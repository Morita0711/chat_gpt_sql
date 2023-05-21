import {create, State, SetState } from 'zustand';

type SharedStoreState = {
  myVariable: string;
  setMyVariable: (value: string) => void;
};

const useSharedStore = create<SharedStoreState>((set: SetState<SharedStoreState>) => ({
  myVariable: '',
  setMyVariable: (value: string) => set({ myVariable: value }),
}));

export default useSharedStore;