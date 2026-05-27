// arbitary selectors
//has-[input:checked]:bg-green-200
// nesting selectors : [&_div]:bg-blue-200 [&_div]:p-4 [&_div]:rounded-md


const ArbitaryValues = () => {
  return (
    <div className="size-80 p-4 rounded-md bg-white relative overflow-hidden flex flex-col gap-4 
    
    [&_div]:bg-blue-200 [&_div]:p-4 [&_div]:rounded-md
    
    ">
      
      <div className="flex items-center gap-2">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Steady motion</span>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Study tailwind</span>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Study nothing</span>
      </div>
    
    </div>
  );
};

export default ArbitaryValues;
