import { BarGraph, PieGraphComponent } from "./graphs";

const PeoplePage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pr-16">
        <BarGraph className="sm:col-span-2 px-5" />
        <PieGraphComponent className="sm:col-span-1 h-fit" />
      </div>
    </div>
  );
};

export default PeoplePage;
