import PageDiv from "@/components/PageDiv";
import { ProgressBarLink } from "@/context/ProgressBar";
import NavigationMenuBar from "./NavigationMenuBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center w-full my-2">
        <NavigationMenuBar />
      </div>
      <PageDiv>
        <ProgressBarLink href={"/dashboard"}>Dashboard</ProgressBarLink>
      </PageDiv>
    </>
  );
}
