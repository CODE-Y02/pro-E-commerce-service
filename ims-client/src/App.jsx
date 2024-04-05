/* eslint-disable no-unused-vars */
import { Routes, Route, BrowserRouter } from "react-router-dom";

import {} from "react-router-dom";
import SideBar from "./components/SideBar";
import Shop from "./pages/Shop";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className=" bg-neutral-900">
          <div className="absolute top-0 left-0 w-8">
            <SideBar />
          </div>
          <div className=" bg-black text-white ml-[20%]  scrollbar-hide">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<h2>hello orders</h2>} />
              <Route path="/shop/*" element={<Shop />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
