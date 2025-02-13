"use client";
import Pagination from "@/components/Pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiClient, handleApiError } from "@/lib/apiClient";
import { EllipsisVertical, Minus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ProgressBarLink } from "@/context/ProgressBar";
import Avatar from "@/components/Avatar";
import { User } from "@/lib/frontendTypes";
import { Input } from "@/components/ui/input";

const PageTable: React.FC<{ role?: string }> = ({ role }) => {
  const [hydrate, setHydrate] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const FetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get(
        `/users?page=${currentPage}&limit=${limit}${
          role && role.length > 0 ? "&role=" + role : ""
        }`
      );
      if (data.users && data.users.length == 0) {
        setLoading(false);
        setTotalPage(1);
        setCurrentPage(1);
        return;
      }
      setUsers([...data?.users]);
      setTotalPage(Math.ceil(data.total / limit));

      setLoading(false);
    } catch (error: any) {
      handleApiError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setHydrate(false);
  }, []);
  useEffect(() => {
    FetchUsers();
  }, [currentPage, limit,FetchUsers]);

  if (!hydrate)
    return (
      <>
        <div className="flex border-2 rounded-md border-1 max-w-[350px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] items-center  mx-auto mb-4 px-2">
          <Search className="text-border" />
          <Input className="border-0 outline-0 focus:!border-0 focus-visible:ring-0" placeholder="Search for a person" />
        </div>
        <Table className="overflow-auto">
          <TableCaption>A list of your recent users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Avatar</TableHead>
              <TableHead className="">Full Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="text-center">
                <Select>
                  <SelectTrigger className="w-[100px] m-auto border-0">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                      <SelectItem value="banana">Male</SelectItem>
                      <SelectItem value="blueberry">Female</SelectItem>
                      <SelectItem value="grapes">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="text-right">Phone Number</TableHead>
              <TableHead className="text-right">
                <Select>
                  <SelectTrigger className="w-[90px] ml-auto border-0">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="banana">Customers</SelectItem>
                      <SelectItem value="blueberry">Employees</SelectItem>
                      <SelectItem value="grapes">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="text-right w-[20px]">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Skeleton className="w-full h-20" />
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
                    <Avatar textSize={10} src={u.avatar} alt={u.full_name} />
                  </TableCell>
                  <TableCell className="font-medium">{u.full_name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell className="text-center">
                    {u.gender ? (
                      u.gender
                    ) : (
                      <Minus className="mx-auto text-border" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {u.phone_number ? (
                      u.phone_number
                    ) : (
                      <Minus className="mx-auto text-border" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">{u.role}</TableCell>
                  <TableCell className="text-right">
                    <Options id={u.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Pagination
                  limit={limit}
                  setLimit={setLimit}
                  currentPage={currentPage}
                  total={totalPage}
                  setCurrentPage={setCurrentPage}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </>
    );
  else <Skeleton className="w-full h-96" />;
};

export default PageTable;

const Options: React.FC<{ id: string }> = ({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="ml-auto cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ProgressBarLink
            className="w-full block p-3 py-1"
            href={"/dashboard/people/users/" + id}
          >
            View
          </ProgressBarLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ProgressBarLink
            className="w-full block p-3 py-1"
            href={"/dashboard/people/edit/" + id}
          >
            Edit
          </ProgressBarLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ProgressBarLink className="w-full block p-3 py-1" href={"#"}>
            Delete
          </ProgressBarLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
