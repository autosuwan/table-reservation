import { getReservations as getReservationsAPI } from "../lib/api/reservations";
import { Reservation } from "../types/reservations";

export const useGetReservations = () => {
    const getReservations = async () => {
        const response = await getReservationsAPI();
        return response.data as Reservation[];
    };
    return { getReservations };
};
