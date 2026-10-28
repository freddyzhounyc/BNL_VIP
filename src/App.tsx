import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Narratives from "./pages/Narratives/Narratives";
import Timeline from "./pages/Timeline/Timeline";
import Model3D from "./pages/Model3D/Model3D";

const App = () => {
    return (
      <BrowserRouter>
        <Navbar title="BNL" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/narratives" element={<Narratives />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/model" element={<Model3D />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
};

export default App;
