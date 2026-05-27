import { cn } from "@/lib/utils";
import React from "react";

const PrimaryColor = () => {
  return (
    <div>
      <div
        className={cn(
          "size-80 rounded-md shadow-sm shadow-black/10 ring-1 ring-black/10 flex items-center justify-center bg-primary",
        )}
      ></div>
    </div>
  );
};

export default PrimaryColor;
