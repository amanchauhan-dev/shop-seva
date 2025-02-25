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
import { EllipsisVertical, Minus, RefreshCcw, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ProgressBarLink } from "@/context/ProgressBar";
import Avatar from "@/components/Avatar";
import { User } from "@/utils/frontendTypes";
import { Input } from "@/components/ui/input";
import { useDebounce } from "react-haiku";
import usePaginatedGet from "@/hooks/usePaginatedGet";

const PageTable: React.FC<{
  role?: string | null;
  is_active?: "true" | "false" | null;
}> = ({ role = null, is_active = null }) => {
  // states
  const [search, setSearch] = useState<string>("");
  const debounceSearchedTerm = useDebounce<string>(search, 1000);
  const [selectedGender, setSelectedGender] = useState<
    "all" | "male" | "female" | "other" | "unknown"
  >("all");
  const [selectedRole, setSelectedRole] = useState<
    "all" | "customer" | "admin"
  >("all");

  // building query
  const buildApiPath = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
    queryParams?: Record<string, any>;
  }) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("search", debounceSearchedTerm);
    // role
    if (role && role.length > 0) params.append("role", role); // page role
    if (selectedRole != "all") params.append("role", selectedRole); // over write with filter
    // gender
    if (selectedGender != "all") {
      params.append("gender", selectedGender); // over write with filter
    }
    // Active or Not
    if (is_active && is_active.length > 0)
      params.append("is_active", is_active);
    return `/users?${params.toString()}`;
  };

  // call paginated api hook
  const {
    data: users,
    // total,
    hydrated,
    page,
    totalPage,
    limit,
    loading,
    refresh,
    setPage,
    setLimit,
    setQueryParams,
  } = usePaginatedGet<User>(buildApiPath, {
    initialPage: 1,
    initialLimit: 10,
    initialQueryParams: { search: debounceSearchedTerm },
  });

  useEffect(() => {
    setQueryParams({
      search: debounceSearchedTerm,
      gender: selectedGender,
      role: selectedRole,
    });
  }, [debounceSearchedTerm, selectedRole, selectedGender]);

  // tsx
  if (hydrated)
    return (
      <>
        <div className="flex border-2 bg-card rounded-md border-1 max-w-[350px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] items-center  mx-auto mb-4 px-2">
          <Search className="text-border" />
          <Input
            className="border-0 outline-0 focus:!border-0 focus-visible:ring-0 "
            placeholder="Search for a person"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 && (
            <X
              className="text-border cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <Table className="overflow-auto">
          <TableCaption>A list of your recent users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center gap-2">
                <RefreshCcw
                  size={15}
                  className="cursor-pointer "
                  onClick={refresh}
                />
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="">Avatar</TableHead>
              <TableHead className="">Full Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="text-center">
                <Select
                  onValueChange={(value) => setSelectedGender(value as any)}
                >
                  <SelectTrigger className="w-[100px] m-auto border-0">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="text-right">Phone Number</TableHead>
              <TableHead className="text-right">
                <Select
                  onValueChange={(value) => setSelectedRole(value as any)}
                >
                  <SelectTrigger className="w-[90px] ml-auto border-0">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="customer">Customers</SelectItem>
                      <SelectItem value="admin">Employees</SelectItem>
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
                  currentPage={page}
                  total={totalPage}
                  setCurrentPage={setPage}
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
