"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wheels from "@/components/ui/wheels";
import { TSpiner, TSpinerOption } from "@/lib/type/tspiner";
import { useRef, useState } from "react";
import { trpc } from "../_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactCanvasConfetti from "react-canvas-confetti"
import Confetti from "@/components/ui/confetti";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
interface SpinnerPageProps {
  listOption: TSpinerOption[]
}
const SpinerPage = ({listOption}:SpinnerPageProps) => {
  const [memberId,setMemberId] = useState('')
  const [codeVoucher,setCodeVoucher] = useState('')
  let coupon:TSpiner 
  const [isVisible, setIsVisible] = useState(false);
  const startSpin = () => {
    setIsVisible(false)
    if(childRef.current)
      checkCoupon({memberId,codeVoucher})
  }
  const childRef = useRef<{ spin: (e?:number) => void } | null>(null);
  const { mutate: checkCoupon } = trpc.checkCoupon.useMutation({
    onSuccess: ({ getData }) => {
      if (getData) {
        console.log(getData)
        coupon = getData
        if(childRef.current){
          const winfromOption = listOption.findIndex(item => item.forceWin) === -1? undefined : listOption.findIndex(item => item.forceWin)
          const winfromCoupon = listOption.findIndex(item => item.id === getData.priceId) === -1? undefined : listOption.findIndex(item => item.id === getData.priceId)
          childRef.current.spin(winfromOption?winfromOption:winfromCoupon)
        }
      }
      if (!getData) {
        toast({
          title: "Kode Voucher Tidak valid...",
          description: "Kode voucher tidak valid atau sudah terpakai.",
          variant: "destructive",
        });
      }
    },
  });
  const { mutate: updateCoupon } = trpc.updateCoupon.useMutation()
  const onFinish = (result:string) => {
    console.log("-")
    if(coupon){
      console.log("1")
      setIsVisible(true)
      toast({
        title: "Selamat Kamu Menang",
        description: `Hadiah kamu : ${listOption.find(item => item.id == result)?.option || ""}`,
        variant: "success",
      });
      updateCoupon({id: coupon.id,price: result})
    }
  }
  return (
    <div className="flex items-center justify-center bg-game bg-cover h-screen flex-col overflow-hidden">
      <ScrollArea className="w-full max-h-full h-full bg-black bg-opacity-30">
        <div className="flex items-center justify-center w-full max-h-full h-full flex-col p-5">
          <Wheels ref={childRef} segments={listOption} defaultSize={700} onFinish={onFinish}/>
          <div className="w-full p-5 max-w-[500px] flex items-center justify-center gap-10 flex-col dark text-white">
            <Input value={memberId} onChange={(e) => setMemberId(e.target.value)} placeholder="Masukan Member ID" className="h-14 text-lg"></Input>
            <Input value={codeVoucher} onChange={(e) => setCodeVoucher(e.target.value)} placeholder="Masukan Kode Voucher" className="h-14 text-lg"></Input>
            <Button onClick={startSpin} className="w-56 bg-gradient-to-tr from-[#08e1ae] to-[#98de5b] text-white font-bold text-lg" size={"lg"}>SPIN</Button>
          </div>
        </div>
      </ScrollArea>
      {isVisible && <Confetti/>}
    </div>
  );
};

export default SpinerPage;
