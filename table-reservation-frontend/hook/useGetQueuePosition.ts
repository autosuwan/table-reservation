import { useGetReservations } from "./useGetReservations";

export const useGetQueuePosition = () => {
    const { getReservations } = useGetReservations();

    const getQueuesBeforeCurrent = async (currentQueueId: string): Promise<number> => {
        try {
            const reservations = await getReservations();

            // Count all pending reservations except the current one
            const queuesBeforeCurrent = reservations.filter(r =>
                r.status === 'pending' && r.reservation_id !== currentQueueId
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