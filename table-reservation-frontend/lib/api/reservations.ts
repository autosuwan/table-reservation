import { Reservation } from "@/types/reservations";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const createReservation = async (reservation: Reservation) => {
    const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
    });
    return response.json();
};

export const getReservations = async () => {
    const response = await fetch(`${API_URL}/reservations`);
    return response.json();
};

export const getQueueLength = async () => {
    const response = await fetch(`${API_URL}/reservations/queue-length`, {cache: 'no-cache'});
    const result = await response.json();
    return result.data; // Extract the actual queue length from {data: queueLength}
};