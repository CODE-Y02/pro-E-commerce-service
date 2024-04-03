/* eslint-disable no-unused-vars */
import { Routes, Route, BrowserRouter } from "react-router-dom";

import {} from "react-router-dom";
import SideBar from "./components/SideBar";
import Shop from "./pages/Shop";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex h-screen bg-neutral-900">
          <SideBar />
          <div className="flex-1 text-white">
            <Routes>
              <Route path="/" element={<p>Base Analytic component here</p>} />
              <Route path="/orders" element={"hi"} />
              <Route path="/shop/*" element={<Shop />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
