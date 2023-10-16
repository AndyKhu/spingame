"use client"
import { Button } from "@/components/ui/button";
import { update } from "lodash";
import { useState } from "react";
const MisteriBoxPage = () => {
  const data = [
    {
      value: "10.000",
      x: 0,
      y: 0,
      c: 0
    },
    {
      value: "20.000",
      x: 0,
      y: 0,
      c: 1
    },
    {
      value: "30.000",
      x: 0,
      y: 0,
      c: 2
    },
    {
      value: "40.000",
      x: 0,
      y: 0,
      c: 3
    },
    {
      value: "50.000",
      x: 0,
      y: 0,
      c: 4
    },
    {
      value: "60.000",
      x: 0,
      y: 0,
      c: 5
    },
    {
      value: "70.000",
      x: 0,
      y: 0,
      c: 6
    },
    {
      value: "80.000",
      x: 0,
      y: 0,
      c: 7
    },
  ]
  const [box,setBox] = useState(data)
  const animateTicket = ()=> {
    const animateInterval = setInterval(()=> {
      shuffle()
    },200)
    
    setTimeout(() => {
      clearInterval(animateInterval);
    }, 8000);
  }
  const getRandomNumber = (max:number) => {
    return  Math.floor(Math.random() * max)
  }
  const shuffle = ()=> {
    const boxwidth = 251
    const boxheight = 164
    const boxlength = box.length/2

    const rnd = getRandomNumber(box.length)
    let rnd2
    do{
      rnd2 = getRandomNumber(box.length)
    }
    while(rnd === rnd2)

    const updatedItems = [...box]
    const pc = updatedItems[rnd].c
    const pc2 = updatedItems[rnd2].c
    console.log(updatedItems)
    updatedItems[rnd].x = ((box[rnd2].c % boxlength)-(rnd % boxlength))*boxwidth
    updatedItems[rnd2].x = ((box[rnd].c % boxlength)-(rnd2 % boxlength))*boxwidth
    updatedItems[rnd].y = (rnd < 4 && box[rnd2].c > 3 ? 1 : rnd > 3 && box[rnd2].c < 4 ? -1 : 0) * boxheight
    updatedItems[rnd2].y = (rnd2 < 4 && box[rnd].c > 3? 1 : rnd2 > 3 && box[rnd].c < 4 ? -1 : 0) * boxheight 

    updatedItems[rnd].c = pc2 
    updatedItems[rnd2].c = pc
    console.log(updatedItems)
    setBox(updatedItems)
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <div className="flex justify-center items-center h-[calc(100vh-150px)] bg-black p-5 w-full max-w-5xl flex-col">
        <div className="grid grid-cols-4 gap-5 w-full ">
          {box.map((item,index) => (
            <div key={index} className="h-36 text-3xl bg-white transition-transform duration-200" style={{transform: `translate(${item.x}px,${item.y}px)`}}>{item.value}</div>
          ))}
        </div>
        <Button onClick={animateTicket}>GO</Button>
      </div>
    </div>
  );
}

export default MisteriBoxPage;