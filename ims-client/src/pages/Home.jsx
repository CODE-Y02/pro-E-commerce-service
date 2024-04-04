import StatusCard from "../components/StatusCard";

const Home = () => {
  return (
    <div className="flex-col gap-4">
      <div className="flex border-2 justify-center gap-5 border-red-400">
        {/* caards */}
        <StatusCard name={"Categories"} className="bg-orange-700 text-white" />
        <StatusCard name={"Products"} className="bg-green-700 text-white" />
        <StatusCard name={"Orders"} className="bg-yellow-300 text-red-900" />
        <StatusCard name={"Sales"} className="bg-slate-600 text-yellow-50" />
      </div>
    </div>
  );
};

export default Home;
