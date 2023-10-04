import { db } from "@/db";
import SpinerPage from "./_clientPage";

const SpinerGamePage = async () => {
  const listOption = await db.luckySpinerOption.findMany()
  return (
    <SpinerPage listOption={listOption}/>
  );
}

export default SpinerGamePage;