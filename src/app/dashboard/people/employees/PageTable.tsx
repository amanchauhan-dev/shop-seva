"use client";
import Pagination from "@/components/Pagination";

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
import { Users } from "@/validations/userModel";
import { useEffect, useState } from "react";

const PageTable: React.FC = () => {
  const [hydrate, setHydrate] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const FetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get(
        `/users?page=${currentPage}&limit=${limit}&role=admin`
      );
      if (data.users && data.users.length == 0) {
        setLoading(false);
        setTotalPage(1);
        setCurrentPage(1);
        return;
      }

      // setUsers([...data?.users]);
      // setTotalPage(Math.ceil(data.total / limit));
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
  }, [currentPage, limit]);

  if (!hydrate)
    return (
      <Table className="overflow-auto">
        <TableCaption>A list of your recent users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Full Name</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className="text-right">Phone Number</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Skeleton className="w-full h-20" />
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.full_name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell className="text-center">
                  {u.gender ? u.gender : "unknown"}
                </TableCell>
                <TableCell className="text-right">{u.phone_number}</TableCell>
                <TableCell className="text-right">{u.role}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
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
    );
  else <Skeleton className="w-full h-96" />;
};

export default PageTable;
