import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Access from "./pages/Access";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/access" element={<Access />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;