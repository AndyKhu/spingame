import { db } from "@/db";
import MisteriBoxClientPage, { gameOption } from "./_clientPage";

const MisteriBoxPage = async() => {
  const option = await db.misteriboxOption.findMany()
  let optionData:gameOption[] = []
  option.map((item,index) => {
    optionData.push({
      id: item.id,
      option: item.option,
      category: item.category,
      x: 0,
      y: 0,
      c: index,
      open: false
    })
  })
  return (
    <MisteriBoxClientPage data={optionData}/>
  );
}

export default MisteriBoxPage;