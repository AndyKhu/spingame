import { db } from "@/db";
import LuckyspinPageClient from "./_clientPage";

const LuckyspinerPage = async () => {
  const listsData = await db.$transaction([db.luckySpiner.findMany({skip: 0,take: 10,include: {price:true}}),db.luckySpiner.count({})])
  const priceOptions = await db.luckySpinerOption.findMany()
  const totalPage = (listsData[1]+10-1)/10
  return (
    <LuckyspinPageClient data={{Lists: listsData[0], count: listsData[1], totalPage: totalPage}} priceOption={priceOptions}/>
  );
}

export default LuckyspinerPage;