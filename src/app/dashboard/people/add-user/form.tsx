"use client";

import SelectRole from "@/components/SelectRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Skeleton } from "@/components/ui/skeleton";
import { FormEvent, useEffect, useState } from "react";

const AddUserForm: React.FC = () => {
  const [hydrate, setHydrate] = useState<boolean>(true);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  useEffect(() => {
    setHydrate(false);
  }, []);
  if (hydrate) {
    return <Skeleton className="w-full h-96 mt-6" />;
  }
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Add User</CardTitle>
        <CardDescription>Fill All required* details</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-3 max-sm:grid-cols-1 gap-3"
        >
          {/* avatar */}
          <div className="col-span-1 mx-auto">
            <div className=" w-40 h-40 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-secondary mx-auto"></div>
            <label htmlFor="" className="text-center mt-2 block">
              Avatar
            </label>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-5 max-sm:col-span-1 max-lg:grid-cols-1 ">
            {/* Full name */}
            <div className="flex flex-col gap-1 col-span-1">
              <label htmlFor="full_name">Full Name</label>
              <Input id="full_name" placeholder="Full Name" type="text" />
            </div>
            {/* email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Input id="email" placeholder="Email" type="text" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone_number">Phone Number</label>
              <Input id="phone_number" placeholder="Phone Number" type="text" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="date_of_birth">Date Of Birth</label>
              <Input
                id="date_of_birth"
                placeholder="Date Of Birth"
                type="date"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="date_of_birth">Role</label>
              <SelectRole />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default AddUserForm;


