import PageNav from "@/components/PageNav";
import { ReactNode } from "react";
const data = [
  { title: "Summary", url: "/dashboard/brands-categories" },
  { title: "Categories", url: "/dashboard/brands-categories/categories" },
  { title: "Brands", url: "/dashboard/brands-categories/brands" },
  { title: "Labels", url: "/dashboard/brands-categories/labels" },
];

const BrandLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PageNav data={data} />
      {children}
    </>
  );
};

export default BrandLayout;
