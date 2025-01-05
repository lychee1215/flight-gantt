import { create } from 'zustand';

export interface Flight {
    planeId: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
}

interface FlightStore {
    flights: Flight[];
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchFlights: () => Promise<void>;
}

export const useFlightStore = create<FlightStore>((set) => ({
    flights: [],
    loading: false,
    error: null,
    setError: (error: string | null) => set({ error }),
    setLoading: (loading: boolean) => set({ loading }),
    fetchFlights: async () => {
        set({ loading: true });
        try {
            const response = await fetch('http://localhost:3000/api/flights');
            const data = await response.json();
            set({ flights: data, error: null });
        } catch (error) {
            set({ error: 'Failed to fetch flights' });
        } finally {
            set({ loading: false });
        }
    }
}));