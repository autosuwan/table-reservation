import { useGetReservations } from "./useGetReservations";

export const useGetQueuePosition = () => {
    const { getReservations } = useGetReservations();

    const getQueuesBeforeCurrent = async (currentQueueId: string): Promise<number> => {
        try {
            const reservations = await getReservations();

            const parse = (value: string): number => {
                const letter = value[0].toUpperCase();
                const number = parseInt(value.slice(1), 10);

                const letterIndex = letter.charCodeAt(0) - 'A'.charCodeAt(0);

                return letterIndex * 9 + number;
            };

            // Count all pending reservations except the current one
            const queuesBeforeCurrent = reservations.filter(r =>
                r.status === 'pending' && parse(r.reservation_id) < parse(currentQueueId)
            ).length;

            return queuesBeforeCurrent;
        } catch (error) {
            console.error("Failed to get queue position:", error);
            return 0;
        }
    };

    const getEstimatedWaitTime = (queuesBeforeCurrent: number, avgTimePerQueue: number = 15): number => {
        return queuesBeforeCurrent * avgTimePerQueue;
    };

    return {
        getQueuesBeforeCurrent,
        getEstimatedWaitTime
    };
};