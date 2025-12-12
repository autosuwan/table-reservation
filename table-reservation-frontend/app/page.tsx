import React from "react";
import Header from "../components/Header";  
import Reservation from "../components/Reservation";

export default function Home() {
  return (
    <div className="flex flex-col gap-30">
      <div className="p-8">
        <Header queue_length={1}/>
      </div>
      <div className="flex justify-center items-center">
        <Reservation/>
      </div>
    </div>
  );
}