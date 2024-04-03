/* eslint-disable react/prop-types */
const DataTable = ({ data }) => {
  return (
    <div className="mx-4 my-2 border-2 border-green-400">
      {/* row heading */}
      <div className="py-1 flex px-2 border-2 mb-2 border-sky-300">
        <div className="flex-1 border-2 px-1  border-cyan-700">img</div>
        <div className="flex-1  border-2 px-1  border-cyan-700">name</div>
        <div className="flex-0.5  border-2 px-1  border-cyan-700">price</div>
        <div className="flex-0.5  border-2 px-1  border-cyan-700">stock</div>
        <div className="flex-0.5  border-2 px-1  border-cyan-700">
          isVarient
        </div>
        <div className="flex-0.5  border-2 px-1  border-cyan-700">featured</div>
        <div className="flex-0.5  border-2 px-1  border-cyan-700">rating</div>
        <div className="flex-1  border-2 px-1  border-cyan-700">listedOn</div>
        <div className="flex-1  border-2 px-1  border-cyan-700">Controls</div>
      </div>
      {/* product row */}
      <div className="py-1 px-2 border-2  border-sky-300">
        {tableRows.map((row) => (
          <div key={row.id} className="bg-yellow-300 h-10 w-10"></div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
