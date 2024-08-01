"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function useServerFormState(
  fun: any,
  initial: any,
) {
  const [state, formAction] = useFormState(fun, initial);

  useEffect(() => {
    //show success msg
    console.log('**********************',state);
    // show error msgs here

    // handle for all possible cases
  }, [state]);

  return [state, formAction];
}
