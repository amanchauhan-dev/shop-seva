import PageNav from "@/components/PageNav";
import { ReactNode } from "react";
const data = [
  { title: "Summary", url: "/dashboard/people" },
  { title: "All Users", url: "/dashboard/people/users" },
  { title: "Customers", url: "/dashboard/people/customers" },
  { title: "Employees", url: "/dashboard/people/employees" },
  { title: "Blocks or Inactive", url: "/dashboard/people/block-inactive" },
  { title: "Add User", url: "/dashboard/people/add-user" },
];

const PeopleLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PageNav data={data} />
      {children}
    </>
  );
};

export default PeopleLayout;
