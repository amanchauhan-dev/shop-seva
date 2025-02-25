import PageDiv from "@/components/PageDiv";
import { ProgressBarLink } from "@/context/ProgressBar";
import NavigationMenuBar from "./NavigationMenuBar";

export default function Home() {
  return (
    <>
      <div className="flex justify-center w-full my-2">
        <NavigationMenuBar />
      </div>
      <PageDiv>
        <ProgressBarLink href={"/dashboard"}>Dashboard</ProgressBarLink>
        <p>Hello World</p>
      </PageDiv>
    </>
  );
}
