// eslint-disable-next-line react/prop-types
const StatusCard = ({ className = "", statCount = 0, name = "stat name" }) => {
  return (
    <div
      className={`flex-col w-[15%] min-w-fit border-2 border-cyan-300 border-b-4 rounded-2xl p-2 m-3 ${className}`}
    >
      <p className="pl-5  text-start text-4xl">{statCount}</p>
      <p className="pl-5  text-start text-lg mt-2 opacity-80 ">{name}</p>
    </div>
  );
};

export default StatusCard;
