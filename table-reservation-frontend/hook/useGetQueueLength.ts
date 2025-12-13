import { getQueueLength as getQueueLengthAPI } from "../lib/api/reservations";

export const useGetQueueLength = () => {
    const getQueueLength = async () => {
        const response = await getQueueLengthAPI();
        return response;
    };
    return { getQueueLength };
};