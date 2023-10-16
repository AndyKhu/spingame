import { db } from "@/db";
import MisteriPageClient from "./_clientPage";

const MisteriBoxPage = async () => {
  const listsData = await db.$transaction([db.misteribox.findMany({skip: 0,take: 10,include: {price:true}}),db.misteribox.count({})])
  const totalPage = (listsData[1]+10-1)/10
  const priceOption = await db.misteriboxOption.findMany()
  return (
    <MisteriPageClient data={{Lists: listsData[0], count: listsData[1], totalPage: totalPage}} priceOption={priceOption}/>
  );
}

export default MisteriBoxPage;