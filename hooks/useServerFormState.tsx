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
      const messages = state.messages;
      for (let i = 0; i < messages.length; i++) {
        toast({
          className: cn("mb-1"),
          title: messages[i],
        });
      }
    }

    // show error messages
    if(state && state.success === false) {
      const messages = state.messages;
      for (let i = 0; i < messages.length; i++) {
        toast({
          className: cn("mb-1 !text-red-600"),
          title: messages[i],
        });
      }
    }
  }, [state]);

  return [state, formAction];
}
