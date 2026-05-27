/* eslint-disable @next/next/no-img-element */
//mask-x-from-50%
// mask-b-from-40%, mask-radial-from-20% mask-l-from-20%
//bg-linear-to-br from-blue-600 to-blue-200
// @container @sm:w-full @sm:h-full
const Utilities = () => {
  return (
    <div className="@container size-80 p-4 rounded-md bg-white relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-200">
      <img
        className="@sm:w-full @sm:h-full"
        src="https://images.unsplash.com/photo-1778071057640-fa876f2b1c4b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt=""
      />
    </div>
  );
};

export default Utilities;
