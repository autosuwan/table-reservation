"use client";

import { useState } from "react";
import { CirclePlus, CircleMinus } from 'lucide-react';
import { Button } from "@heroui/button";

export default function Reservation(){
    const [number, setNumber] = useState(1);

    const handleAdd = () => {
            setNumber(number + 1);
    }

    const handleMinus = () => {
        if(number>1){
            setNumber(number - 1);
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
                <Button className="font-medium text-lg rounded-[6px] bg-linear-to-tr from-[#59BD9E] to-[#5DD099] text-white shadow-lg py-2 w-full">
                    จองคิว
                </Button>
            </div>
        </div>
    );
}