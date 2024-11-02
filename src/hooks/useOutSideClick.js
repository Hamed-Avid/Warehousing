import { useEffect } from "react";

export default function useOutSideClick(ref, handler) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleOutSideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      };
      document.addEventListener("mousedown", handleOutSideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutSideClick);
      };
    }
  }, [ref, handler]);
}
