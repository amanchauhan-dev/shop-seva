import PageDiv from "@/components/PageDiv";
import { ProgressBarLink } from "@/context/ProgressBar";

export default function Home() {
  return <PageDiv>
    <ProgressBarLink href={'/dashboard'}>Dashboard</ProgressBarLink>
  </PageDiv>;
}
