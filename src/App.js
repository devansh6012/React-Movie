import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import Favourites from "./components/Favourites";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<>
          <Banner />
          <Movies />
        </>
        } />

        <Route path="/favourites" element={<Favourites />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
