"use client";

import { useState } from "react";
import { CirclePlus, CircleMinus } from 'lucide-react';
import { Button } from "@heroui/button";
import { useCreateReservation } from "@/hook/useCreateReservation";
import { useGetQueueLength } from "@/hook/useGetQueueLength";
import { generateQueueID } from "@/lib/utils/IDGenerate";

export default function Reservation(){
    const [number, setNumber] = useState(1);
    const { createReservation } = useCreateReservation();
    const { getQueueLength } = useGetQueueLength();

    const handleAdd = () => {
            setNumber(number + 1);
    }

    const handleMinus = () => {
        if(number>1){
            setNumber(number - 1);
        }
    }
    
    const handleCreateReservation = async () => {
        try {
            // Fetch queue length only when creating reservation
            const queueLength = await getQueueLength();
            const queueID = generateQueueID(queueLength);
            
            const reservation = {
                id: queueID,
                people: number,
                reserved_at: new Date().toISOString(),
                status: "pending",
            };
            createReservation(reservation);
        } catch (error) {
            console.error("Failed to create reservation:", error);
        }
    }    

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xl text-center font-medium text-[#656565]">จำนวนลูกค้า (ท่าน)</p>
            <div className="relative">
                <div className="flex flex-row gap-10">
                    <button className="text-[#2EC563]" onClick={handleMinus}><CircleMinus size={35}/></button>
                    <p className="text-[80px] font-bold text-black text-center py-10">{number}</p>
                    <button className="text-[#2EC563]" onClick={handleAdd}><CirclePlus size={35}/></button>
                </div>
                <p className="text-center text-[#656565] absolute left-1/2 -translate-x-1/2 bottom-0 whitespace-nowrap">สูงสุด 10 ท่าน / โต๊ะ</p>
            </div>
            <div className="left-1/2 -translate-x-1/2 absolute bottom-15 w-full px-15">
                <Button onClick={handleCreateReservation} className="font-medium text-lg rounded-[6px] bg-linear-to-tr from-[#59BD9E] to-[#5DD099] text-white shadow-lg py-2 w-full">
                    จองคิว
                </Button>
            </div>
        </div>
    );
}