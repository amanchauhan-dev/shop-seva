"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface PaginationProps {
  total: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
}) => {
  const handleNext = () => {
    if (currentPage < total) setCurrentPage((x) => x + 1);
  };
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((x) => x - 1);
  };
  return (
    <div className="flex justify-end gap-2 ">
      <div className="flex items-center">
        Length: {"  "}
        <Select
          value={limit.toString()}
          onValueChange={(e: any) => {
            if(!isNaN(e))  setLimit(e);
          }}
        >
          <SelectTrigger className="w-[130px] m-auto border-0">
            <SelectValue placeholder="Data length" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Data per page</SelectLabel>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="75">75</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center">
        {currentPage} of {total}
      </div>

      {currentPage < total && currentPage != 1 && (
        <Button className="" variant={"outline"} onClick={handlePrev}>
          Previous
        </Button>
      )}
      {currentPage < total && (
        <Button className="" variant={"outline"} onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
