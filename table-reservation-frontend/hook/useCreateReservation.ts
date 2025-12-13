import { createReservation as createReservationAPI } from "../lib/api/reservations";
import { Reservation } from "../types/reservations";

export const useCreateReservation = () => {
    const createReservation = async (reservation: Reservation) => {
        const response = await createReservationAPI(reservation);
        return response;
    };
    return { createReservation };
};
