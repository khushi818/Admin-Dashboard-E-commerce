import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthWrapper from "./component/CommonComponents/AuthWrapper";
import { Routes, Route } from "react-router-dom";
import TopNavBar from "./component/layoutComponent/TopNavBar";
import Products from "./Pages/Product/Products";
import CreateProduct from "./Pages/Product/CreateProduct";
import AddAdmin from "./Pages/AuthComponent/AddAdmin";
import { useAppSelector } from "./redux/app/hook";
import { RootState } from "./redux/store/store";
import Dashboard from "./Pages/Dashboard";

function App() {
  const { isAuthentication } = useAppSelector((state: RootState) => {
    console.log(state.auth);
    return state.auth;
  });

  return (
    <>
      <Routes>
        {isAuthentication ? (
          <Route path="/" element={<TopNavBar />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<Products />}></Route>
            <Route path="/createproduct" element={<CreateProduct />}></Route>
            <Route path="/addadmin" element={<AddAdmin />}></Route>
          </Route>
        ) : (
          <Route path="/" element={<AuthWrapper />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
