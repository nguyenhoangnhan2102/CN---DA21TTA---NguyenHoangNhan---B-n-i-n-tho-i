import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminRoute from './admin/route-admin-view';
import Nav from "./share/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Nav />
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
