// @theme inline --spacing-brand: 26rem;

const Spacing = () => {
  return (
    <div className="border-y border-neutral-200 px-4 py-20 bg-white w-full dark:bg-neutral-900 dark:border-neutral-800 ">
      <div className="flex flex-col items-start gap-4 max-w-brand mx-auto">
        <h1 className="text-2xl font-medium tracking-tight"> Spacing</h1>
        <p className="text-base text-neutral-500 max-w-sm">
          Adjust the spacing between elements using Tailwind&apos;s padding and
          margin utilities.
        </p>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
          Get started for free
        </button>
      </div>
    </div>
  );
};

export default Spacing;
