import React from "react";

export default function Header(){
    return (
            <div className="flex flex-col rounded-lg border border-[#8a8a8a] bg-white p-5">
                <h1 className="text-2xl font-bold text-green-500">ระบบจองคิว</h1>
                <p className="text-lg text-gray-700 font-normal">
                    ยินดีต้อนรับสู่ระบบจองโต๊ะออนไลน์
                </p>
            </div>
    );
}