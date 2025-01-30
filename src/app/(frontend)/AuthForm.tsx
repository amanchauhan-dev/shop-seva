import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";

interface LoginFromProps {}

export const LoginFrom: React.FC<LoginFromProps> = ({}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Make sure to use the correct credentials to avoid any issues.
        </DialogDescription>
      </DialogHeader>
      <form className="">
        <div className="mt-4 flex  flex-col">
          <label htmlFor="username" className="mb-2">
            username
          </label>
          <Input placeholder="Username" name="username" type="text" />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="Password" className="mb-2">
            Password
          </label>
          <Input placeholder="Password" name="password" type="password" />
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

interface RegisterFromProps {}

export const RegisterFrom: React.FC<RegisterFromProps> = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Register</DialogTitle>
        <DialogDescription>
          Make sure to use the correct credentials to avoid any issues.
        </DialogDescription>
      </DialogHeader>
      <form className="">
        <div className="mt-4 flex  flex-col">
          <label htmlFor="username" className="mb-2">
            Full Name
          </label>
          <Input placeholder="Username" name="username" type="text" />
        </div>
        <div className="mt-4 flex  flex-col">
          <label htmlFor="username" className="mb-2">
            Email
          </label>
          <Input placeholder="Email" name="email" type="text" />
        </div>
        <div className="mt-4 flex  flex-col">
          <label htmlFor="username" className="mb-2">
            Phone Number
          </label>
          <Input placeholder="Phone Number" name="number" type="text" />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="Password" className="mb-2">
            Password
          </label>
          <Input placeholder="Password" name="password" type="password" />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="Password" className="mb-2">
            Confirm Password
          </label>
          <Input placeholder="Password" name="password" type="password" />
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

interface ProvidersProps {}

const Providers: React.FC<ProvidersProps> = () => {
  return (
    <>
      {/* <div className=" text-xs text-center mt-2">Login With</div> */}
      <div className="border-2 cursor-pointer  bg-yellow-300 dark:text-black  mt-2 text-secondary-foreground  p-2 rounded-md flex items-center justify-center gap-2">
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
          {state == "register" ? <RegisterFrom /> : <LoginFrom />}

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
