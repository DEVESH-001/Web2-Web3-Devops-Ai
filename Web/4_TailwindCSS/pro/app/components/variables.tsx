import { cn } from "@/lib/utils";

// tailwind variables
const Variables = () => {
  return (
    // <div className="[--primary:var(--color-red-500)]">
    //   <h2 className="text-(--primary) text-7xl">Hello World</h2>
    // </div>
    <div className="[--pattern-color:var(--color-pink-500)]/20 dark:[--pattern-color:var(--color-blue-500)]">
      <div
        className={cn(
          "size-80 rounded-md shadow-sm shadow-black/10 ring-1 ring-black/10 flex items-center justify-center bg-white dark:bg-neutral-800 dark:shadow-white dark:ring-white",

          "bg-[repeating-linear-gradient(-45deg,var(--pattern-color)_0,var(--pattern-color)_1px,transparent_0,transparent_50%)]",
          "bg-size-[10px_10px]",
        )}
      ></div>
    </div>
  );
};

export default Variables;
