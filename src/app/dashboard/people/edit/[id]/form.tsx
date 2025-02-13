"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiClient, handleApiError } from "@/lib/apiClient";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/dateFunctions";

const UpdateFormSchema = z.object({
  full_name: z
    .string()
    .min(5, "Full name must be at least 5 characters long")
    .max(20, "Full name must be less than or equal to 100 characters"),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  date_of_birth: z.string().min(3, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  avatar: z
    .custom<File>(
      (file) => file instanceof File,
      "Avatar must be a valid image file"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only JPG, PNG, and GIF formats are allowed"
    )
    .optional(),
});

const UpdateUserForm: React.FC = () => {
  const { id } = useParams();
  const [hydrate, setHydrate] = useState<boolean>(true);
  const [role, setRole] = useState<string>("customer");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
  });

  const fetchUserDetails = async () => {
    try {
      const { data } = await apiClient.get("/users/" + id);
      console.log(data);
      if (data.user) {
        setValue("full_name", data?.user?.full_name);
        setValue("email", data?.user?.email);

        if (data?.user?.date_of_birth) {
          const date = new Date(data?.user?.date_of_birth);
          setValue("date_of_birth", formatDate(date));
        }
        if (data?.user?.phone_number)
          setValue("phone_number", data?.user?.phone_number);
        if (data?.user?.avatar && data?.user?.avatar.length > 0) {
          setPreview(
            (process.env.NEXT_PUBLIC_SERVER_URL as string) + data?.user?.avatar
          );
        }
        setRole(data?.user.role);
        setGender(data?.user.gender);
      }
      setHydrate(false);
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  if (hydrate) {
    return <Skeleton className="w-full h-96 mt-6" />;
  }

  // handle input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const onSubmit = async (data: any) => {
    // console.log("Form Submitted:", data);

    const loading = toast.loading("Please wait...");
    try {
      const formData = new FormData();
      formData.set("full_name", data.full_name);
      formData.set("email", data.email);
      formData.set("password", data.password);
      formData.set("phone_number", data.phone_number);
      formData.set("role", role);
      formData.set("date_of_birth", data.date_of_birth);
      if (gender) formData.set("gender", gender);
      if (avatar) formData.set("avatar", avatar);
      await apiClient.put("/users/" + id, formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      toast.success("User Updated", { id: loading });
    } catch (error: any) {
      handleApiError(error, loading);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
        <CardDescription>Fill All required* details</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 max-sm:grid-cols-1 gap-3"
        >
          {/* Avatar */}
          <div className="col-span-1 mx-auto text-center">
            <div className="w-40 h-40 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-secondary mx-auto overflow-hidden flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <label
              className="text-center mt-2 block cursor-pointer mb-2 p-1 border-2 rounded-md"
              htmlFor="avatarSelector"
            >
              {preview ? "Change" : "Upload"}
            </label>
            {preview && (
              <Button
                type="button"
                size={"sm"}
                variant={"destructive"}
                onClick={() => {
                  setPreview(null);
                  setAvatar(null);
                }}
              >
                Cancel
              </Button>
            )}

            <input
              type="file"
              accept="image/*"
              id="avatarSelector"
              onChange={handleFileChange}
              className="mt-2 hidden"
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-5 max-sm:col-span-1 max-lg:grid-cols-1">
            {/* Full Name */}
            <div className="flex flex-col gap-1 col-span-1">
              <label htmlFor="full_name">Full Name</label>
              <Input
                id="full_name"
                placeholder="Full Name"
                type="text"
                {...register("full_name")}
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone_number">Phone Number</label>
              <Input
                id="phone_number"
                placeholder="Phone Number"
                type="text"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1">
              <label htmlFor="date_of_birth">Date Of Birth</label>
              <Input
                id="date_of_birth"
                placeholder="YYYY-MM-DD"
                type="date"
                {...register("date_of_birth")}
              />
              {errors.date_of_birth && (
                <p className="text-red-500 text-sm">
                  {errors.date_of_birth.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex flex-col gap-1">
                <label htmlFor="role">Role</label>
                <Select
                  name="role"
                  value={role}
                  onValueChange={(value) => setRole(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select A Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Selection */}
              <div className="flex gap-1 flex-col">
                <label htmlFor="gender">Gender</label>
                <Select
                  name="gender"
                  value={
                    gender == "male" || gender == "female" || gender == "other"
                      ? gender
                      : "not"
                  }
                  onValueChange={(value) => {
                    if (value == "not") {
                      setGender(null);
                    } else {
                      setGender(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select A Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="not">Not want to tell</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex gap-2 sm:col-span-3 col-span-1 flex-wrap justify-end">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default UpdateUserForm;
