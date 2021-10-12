import Reports from "./pages/Reports/Reports";
import AddProduct from "./pages/AddProduct/AddProduct";
import Products from "./pages/Products/Products";
import Catagories from "./pages/Catagories/Catagories";
import EditCatagory from "./pages/EditCatagory/EditCatagory";
import EditProduct from "./pages/EditProduct/EditProduct";
import Orders from "./pages/Orders/Orders";
import ViewOrder from "./pages/ViewOrder/ViewOrder";
import NavbarProvider from './Components/HOC/withNavbar';
import Login from './pages/Login/Login';
import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  LoadProducts,
  LoadCatagories,
  LoadOrders,
  loadUsers,
  setUser
} from "./Redux/ActionCreator";
import PrivateRoute from "./Components/HOC/PrivateRoute";
import { FirebaseAuth } from "./storeFirebase";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(user => {
      dispatch(setUser(user))
      if (user) {
        dispatch(LoadProducts());
        dispatch(LoadCatagories());
        dispatch(LoadOrders())
        dispatch(loadUsers())
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <PrivateRoute exact path="/">
        <NavbarProvider>
          <Reports />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/add-product">
        <NavbarProvider>
          <AddProduct />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/products">
        <NavbarProvider>
          <Products />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/catagories">
        <NavbarProvider>
          <Catagories />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/orders">
        <NavbarProvider>
          <Orders />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/orders/:id/:serial">
        <NavbarProvider>
          <ViewOrder />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/catagories/:id">
        <NavbarProvider>
          <EditCatagory />
        </NavbarProvider>
      </PrivateRoute>
      <PrivateRoute exact path="/products/:id">
        <NavbarProvider>
          <EditProduct />
        </NavbarProvider>
      </PrivateRoute>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
