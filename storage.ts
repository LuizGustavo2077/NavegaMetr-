const HISTORY_KEY = 'navegametro_history';

export type Trip = {
  id: string;
  userEmail: string;
  origin?: string;
  destination: string;
  timestamp: number;
  routeSummary?: string;
  coords?: { lat:number, lng:number }[];
};

export const StorageService = {
  saveTrip: (trip: Trip) => {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(trip);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
  },
  getTripsForUser: (userEmail: string): Trip[] => {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr: Trip[] = raw ? JSON.parse(raw) : [];
    return arr.filter(t => t.userEmail === userEmail);
  },
  clearAll: () => localStorage.removeItem(HISTORY_KEY)
};
