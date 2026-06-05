import { useRef } from "react";

export default function useInputRef() {
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  };
  const resetInput = () => {
    inputRef.current = "";
  };
  return { inputRef, focusInput, resetInput };
}
