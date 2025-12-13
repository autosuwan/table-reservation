import { useGetQueueLength } from "../hook/useGetQueueLength";

export default function Header(){
    const { getQueueLength } = useGetQueueLength();
    return (
            <div className="flex flex-col gap-3">
                <p className="text-lg font-normal text-black">สวัสดีครับคุณลูกค้า</p>
                <p className="text-xl text-[#2EC563] font-bold">
                    ตอนนี้มี {getQueueLength()} คิวก่อนหน้า
                </p>
            </div>
    );
}