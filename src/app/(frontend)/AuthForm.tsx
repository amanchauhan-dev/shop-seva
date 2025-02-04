import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Github } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthProvider";
import { apiClient, handleApiError } from "@/lib/apiClient";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const LoginFrom: React.FC<{ setOpen: (x: boolean) => void }> = ({
  setOpen,
}) => {
  const [viewPass, setViewPass] = useState<boolean>(false);
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  //  login function
  const login = async (data:Object) => {
    const loading = toast.loading("Please wait...");
    try {
      const res = await apiClient.post("/auth/login", data);
      toast.success("Login successful", { id: loading });
      setOpen(false);
      setUser(res.data.user);
      setLoggedIn(true);
    } catch (error: unknown) {
      handleApiError(error, loading);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Make sure to use the correct credentials to avoid any issues.
        </DialogDescription>
      </DialogHeader>
      <form className="" onSubmit={handleSubmit(login)} autoComplete="off">
        <div className="mt-4 flex  flex-col">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <Input
            placeholder="Email"
            {...register("email")}
            id="email"
            type="text"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-4 flex flex-col ">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              placeholder="Password"
              {...register("password")}
              type={!viewPass ? "password" : "text"}
              id="password"
            ></Input>
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setViewPass(!viewPass)}
            >
              {!viewPass ? <EyeClosed size={17} /> : <Eye size={17} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-4 flex gap-1 flex-col">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export const SignupFormSchema = z.object({
  full_name: z
    .string()
    .min(4, "Full name must be at least 4 characters long")
    .max(100, "Full name must be less than or equal to 100 characters"),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  confirm_password: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
});

export const RegisterFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
  });

  const handleSignup = () => {
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Register</DialogTitle>
        <DialogDescription>
          Make sure to use the correct credentials to avoid any issues.
        </DialogDescription>
      </DialogHeader>
      <form
        className=""
        onSubmit={handleSubmit(handleSignup)}
        autoComplete="off"
      >
        <div className="mt-4 flex  flex-col">
          <label htmlFor="full_name" className="mb-2">
            Full Name
          </label>
          <Input
            placeholder="Full Name"
            {...register("full_name")}
            id="full_name"
            type="text"
          />
          {errors.full_name && (
            <p className="text-red-500">{errors.full_name.message}</p>
          )}
        </div>
        <div className="mt-4 flex  flex-col">
          <label htmlFor="username" className="mb-2">
            Email
          </label>
          <Input
            placeholder="Email"
            {...register("email")}
            id="email"
            type="text"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-4 flex  flex-col">
          <label htmlFor="username" className="mb-2">
            Phone Number
          </label>
          <Input
            placeholder="Phone Number"
            {...register("phone_number")}
            id="phone_number"
            type="number"
          />
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="Password" className="mb-2">
            Password
          </label>
          <Input
            placeholder="Password"
            {...register("password")}
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="confirm_password" className="mb-2">
            Confirm Password
          </label>
          <Input
            placeholder="Confirm Password"
            {...register("confirm_password")}
            id="confirm_password"
            type="password"
          />
          {errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password.message}</p>
          )}
        </div>
        <div className="mt-4 flex gap-1 flex-col">
          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

const Providers: React.FC = () => {
  return (
    <>
      {/* <div className=" text-xs text-center mt-2">Login With</div> */}
      <div className="border-2 cursor-pointer  bg-zinc-800 dark:bg-black text-white  mt-2 text-secondary-foreground  p-2 rounded-md flex items-center justify-center gap-2">
        <h1>Google</h1>
      </div>
      <div className="border-2 cursor-pointer  bg-black mt-2 text-white p-2 rounded-md flex items-center justify-center gap-2">
        <span>
          <Github />
        </span>
        <h1>GitHub</h1>
      </div>
    </>
  );
};

interface AuthFormsProps {
  open: boolean;
  setOpen: (x: boolean) => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ open, setOpen }) => {
  const [state, setState] = useState<"login" | "register">("login");
  useEffect(() => {
    setState("login");
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div>
          {state == "register" ? (
            <RegisterFrom />
          ) : (
            <LoginFrom setOpen={setOpen} />
          )}

          <div>
            <h1 className="text-sm text-right m-2 ">
              {state == "register"
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                className="text-blue-700 underline cursor-pointer"
                onClick={() => {
                  setState((x) => (x == "register" ? "login" : "register"));
                }}
              >
                {" "}
                {state == "register" ? "Login" : "Register"}
              </span>
            </h1>
          </div>
          <Providers />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForms;
