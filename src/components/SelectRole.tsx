import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectRole: React.FC = () => {
    return (
      <Select value="customer" name="role">
        <SelectTrigger  className="w-[180px]">
          <SelectValue placeholder="Select A Role" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  export default SelectRole