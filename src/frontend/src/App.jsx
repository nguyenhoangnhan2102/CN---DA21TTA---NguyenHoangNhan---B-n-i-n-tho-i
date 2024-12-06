import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminRoute from './admin/route-admin-view';
import Header from "./share/component/Nav";
import Carouseles from "./share/component/Carousel";

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#F2F4F7' }}>
        <div className="App-header">
          <Header />
          <Carouseles />
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

const AdminLayout = () => (
  <Routes>
    <Route path="/*" element={<AdminRoute />} />
  </Routes>
);

export default App;
