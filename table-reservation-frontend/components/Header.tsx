export default function Header({queue_length}: {queue_length: number}){
    return (
            <div className="flex flex-col gap-3">
                <p className="text-lg font-normal text-black">สวัสดีครับคุณลูกค้า</p>
                <p className="text-xl text-[#2EC563] font-bold">
                    ตอนนี้มี {queue_length} คิวก่อนหน้า
                </p>
            </div>
    );
}