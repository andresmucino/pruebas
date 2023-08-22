import moment, { Moment } from "moment";
import { create } from "zustand";
import { Object } from "ts-toolbelt";

interface FiltersStoreState {
  messengerStatus?: "blocked" | "active" | "registered";
  setMessengerStatus: (status?: "blocked" | "active" | "registered") => void;

  messengerActivity?: "active" | "inactive" | "busy";
  setMessengerActivity: (activity?: "active" | "inactive" | "busy") => void;

  email: string;
  setEmail: (email: string) => void;

  messengerId: string;
  setMessengerId: (email: string) => void;

  fromDate?: Moment;
  setFromDate: (fromDate?: Moment) => void;

  toDate?: Moment;
  setToDate: (toDate?: Moment) => void;

  cityId?: number;
  setCityId: (cityId: number) => void;

  cleanFilters: () => void;
}

type storePropsFields = Object.Filter<FiltersStoreState, Function>;

const initialState: storePropsFields = {
  cityId: 0,
  messengerId: "",
  email: "",
  fromDate: undefined,
  toDate: undefined,
};

export const useFiltersStore = create<FiltersStoreState>((set) => ({
  ...initialState,
  setMessengerStatus: (messengerStatus) => set({ messengerStatus }),
  setMessengerActivity: (messengerActivity) => set({ messengerActivity }),
  setCityId: (cityId) => set({ cityId }),
  setEmail: (email) => set({ email: email.trim() }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setMessengerId: (messengerId) => set({ messengerId }),

  cleanFilters: () => set(initialState),
}));
