import ArbitaryValues from "./components/arbitary_values";
import PrimaryColor from "./components/primary_color";
import Spacing from "./components/spacing";
import Utilities from "./components/utilites";
import Variables from "./components/variables";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100 font-sans dark:bg-neutral-900">
      <Variables />
      <br />
      <Spacing/>
      <br />
      <PrimaryColor/>
      <br />
      <Utilities/>
      <br />
      <ArbitaryValues/>
    </div>
  );
}
