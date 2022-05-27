import { Routes, Route } from "react-router-dom";
import Management from "../pages/Management";
import SeeMoreBook from "../pages/SeeMoreBook";
import Home from "../pages/Home";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-books" element={<Management />} />
        <Route path="/book/:bookId" element={<SeeMoreBook />} />
      </Routes>
    </>
  );
};

export default MainRoutes;