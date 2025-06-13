import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@/components/ui/dialog";

// Define validation schema
const formSchema = z.object({
  accountHolderName: z.string().min(3, "Name must be at least 3 characters"),
  ifsc: z.string().min(5, "IFSC must be valid"),
  accountNumber: z.string().min(10, "Account number must be valid"),
  bankName: z.string().min(3, "Bank name must be at least 3 characters"),
});

const Forgotpass = () => {
  const form = useForm({
    resolver: zodResolver(formSchema), // Use zod for validation
    defaultValues: {
     
      Email: "",
    
      
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
         

          {/* IFSC Code */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <Input className="border w-full border-gray-700 p-3" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        

        

          {/* Submit Button */}
          

          <Button type="submit" className="w-full py-4">
            Submit
          </Button>
        
          
        </form>
      </Form>
    </div>
  );
};

export default Forgotpass;
