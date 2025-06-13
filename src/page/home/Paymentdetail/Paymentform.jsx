// 




import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addPaymentDetails } from "@/State/Withdrawal/Action";

const formSchema = z.object({
  accountHolderName: z.string().min(3, "Name must be at least 3 characters"),
  ifsc: z.string().min(5, "IFSC must be valid"),
  accountNumber: z.string().min(10, "Account number must be valid"),
  confirmAccountNumber: z.string().min(10, "Confirm account number"),
  bankName: z.string().min(3, "Bank name must be at least 3 characters"),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers must match",
  path: ["confirmAccountNumber"],
});

const Paymentform = () => {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
    },
  });

  const onSubmit = (data) => {
    const { confirmAccountNumber, ...rest } = data;
    dispatch(addPaymentDetails({ paymentDetails: rest, jwt: localStorage.getItem("jwt") }));
  };

  return (
    <div className="px-10 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {["accountHolderName", "ifsc", "accountNumber", "confirmAccountNumber", "bankName"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name === "ifsc" ? "IFSC Code" : field.name.replace(/([A-Z])/g, " $1")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={field.name === "ifsc" ? "YESB0000007" : ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full py-3">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Paymentform;
