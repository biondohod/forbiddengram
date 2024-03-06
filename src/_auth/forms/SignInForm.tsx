import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, error } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const { email, password } = values;
    console.log('sign in')
    try {
      const session = await signInAccount({ email, password });
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message,
        });
      }
    } catch (e) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
    // const session = await signInAccount({ email, password });

    // //error is null. fix it so user can see the error message
    // if (!session || session instanceof Error) {
    //   console.log(error?.message)
    //   return toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: (session instanceof Error) ? session?.message : 'Sign in failed. Please try again',
    //   });
    // }

    // console.log(session);

    // console.log(error?.message);

    // const isLoggedIn = await checkAuthUser();

    // if (isLoggedIn) {
    //   form.reset();
    //   navigate("/");
    // } else {
    //   return toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: error?.message,
    //   });
    // }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in into your account.
        </h2>
        <p className="text-light-3 small-medium md:base-regual mt-2">
          Welcome back! Please enter your details.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex items-center justify-center">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500  text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
