"use client";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function useServerFormState(
  fun: any,
  initial: any,
) {
  const [state, formAction] = useFormState(fun, initial);

  useEffect(() => {
    // show success messages
    if(state && state.success === true) {
        toast({
          className: cn("mb-1"),
          title: state.message,
        });
    }

    // show error messages
    if(state && state.success === false) {
      const messages = state.message;
      for (let i = 0; i < messages.length; i++) {
        console.log(messages[i]);
        toast({
          className: cn("mb-1 !text-red-600"),
          title: messages[i],
        });
      }
    }
  }, [state]);

  return [state, formAction];
}
