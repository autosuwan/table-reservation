'use client';

import { useQueue } from "@/context/QueueContext";
import { useGetQueuePosition } from "@/hook/useGetQueuePosition";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Reservation() {
    const router = useRouter();
    const { queueId, people } = useQueue();
    const { getQueuesBeforeCurrent, getEstimatedWaitTime } = useGetQueuePosition();
    const [queuesBeforeCurrent, setQueuesBeforeCurrent] = useState<number>(0);
    const [estimatedWaitTime, setEstimatedWaitTime] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleCancel = () => {
        router.push('/');
    }

    useEffect(() => {
        const fetchQueuePosition = async () => {
            if (queueId) {
                setIsLoading(true);
                const queuesBefore = await getQueuesBeforeCurrent(queueId);
                const waitTime = getEstimatedWaitTime(queuesBefore);
                setQueuesBeforeCurrent(queuesBefore);
                setEstimatedWaitTime(waitTime);
                setIsLoading(false);
            }
        };

        fetchQueuePosition();
        
        const interval = setInterval(fetchQueuePosition, 30000);
        
        return () => clearInterval(interval);
    }, [queueId]);
    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#59BD9E] to-[#5DD099]">
            <div className="flex flex-col justify-center items-center pt-15 py-15 md:p-15 gap-10">
                <p className="text-2xl font-bold text-white">จองคิวสำเร็จ!</p>
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] p-0 flex flex-col items-center relative overflow-hidden mb-6 w-[90%] md:w-1/2">
                
                {/* Header Ticket */}
                <div className="w-full bg-slate-50 p-4 border-b border-dashed border-gray-200 text-center">
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">QUEUE NUMBER</p>
                </div>

                <div className="p-8 flex flex-col items-center w-full">
                  <h1 className="text-8xl font-black text-slate-800 mb-2 tracking-tighter leading-none">
                    {queueId}
                  </h1>
                  <p className="text-emerald-500 font-medium bg-emerald-50 px-3 py-1 rounded-full text-sm mb-6">
                    บัตรจองคิว
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full bg-slate-50 rounded-2xl p-4">
                    <div className="flex flex-col items-center border-r border-gray-200">
                      <span className="text-gray-400 text-xs mb-1">จำนวน</span>
                      <span className="text-xl font-bold text-slate-700">{people} ท่าน</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-400 text-xs mb-1">คิวก่อนหน้า</span>
                      {isLoading ? (
                        <span className="text-xl font-bold text-gray-400">กำลังโหลด...</span>
                      ) : (
                        <>
                          <span className="text-xl font-bold text-emerald-600">{queuesBeforeCurrent} คิว</span>
                          {estimatedWaitTime > 0 && (
                            <span className="text-xs text-gray-500 mt-1">~{estimatedWaitTime} นาที</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-[60px] -left-3 w-6 h-6 bg-emerald-500 rounded-full"></div>
                <div className="absolute top-[60px] -right-3 w-6 h-6 bg-emerald-500 rounded-full"></div>
              </div>

            </div>
            <button onClick={handleCancel} className="w-1/2 left-1/2 -translate-x-1/2 absolute bg-white text-red-500 font-semibold py-4 rounded-xl shadow-lg mt-4 hover:bg-red-50 transition-colors">
                ยกเลิกการจอง
            </button>

            <div className="text-center text-xs text-white pt-40">*กรุณาแคปหน้าเจอตั่วไว้ เผื่อกรณีเผลอปิดหน้าเว็บ</div>
        </div>
    );
}
    