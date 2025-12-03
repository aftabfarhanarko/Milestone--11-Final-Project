import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Loding from "../Shared/Loding";
import MapCover from "../pages/MapCover";
import About from "../pages/About";
import Error from "../Shared/Error";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PriverRouter from "./PriverRouter";
import ForgetPassword from "../Auth/ForgetPassword";
import RiderBook from "../pages/Raider/RiderBook";
import Price from "../pages/Price";
import SendPricel from "../pages/SendPricel/SendPricel";
import DashbordLayout from "../Layout/DashbordLayout";
import MyParcel from "../pages/Dashbord/MyParcel";
import AllDrivers from "../pages/Dashbord/AllDrivers";
import Payment from "../pages/Dashbord/Payment/Payment";
import SuccessPage from "../pages/Dashbord/Payment/SuccessPage";
import CancelPage from "../pages/Dashbord/Payment/CancelPage";
import PaymentHiestory from "../pages/Dashbord/PaymentHiestory/PaymentHiestory";
import AdminRole from "./AdminRole";
import AssinRider from "../pages/Dashbord/AssinRider/AssinRider";
import AssingDiliveryTask from '../pages/Dashbord/AssingDiliveryTask/AssingDiliveryTask'
import RIderRoute from "./RIderRoute";
import CompletRiderTask from "../pages/Dashbord/CompletRiderTask/CompletRiderTask";
import TrakinkParcel from "../pages/Home/TrakinkParcel/TrakinkParcel";
import Dashboard from "../pages/Dashbord/DashBoodrRoleShow/ShowDesh";
import UserManage from "../pages/Dashbord/userManage/UserManage";
import UserRole from "./UserRole";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    hydrateFallbackElement: <Loding></Loding>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/mapcover",
        element: <MapCover></MapCover>,
      },

      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/send_parcel",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <PriverRouter>
            <SendPricel></SendPricel>
          </PriverRouter>
        ),
      },
      {
        path: "/raider",
         loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <PriverRouter>
            <RiderBook></RiderBook>
          </PriverRouter>
        ),
      },
      {
        path: "/price",
        element: (
          <PriverRouter>
            <Price></Price>
          </PriverRouter>
        ),
      },
      {
        path: "/track-parcel/:trakingId",
        Component:TrakinkParcel
      },
      {
        path: "/*",
        element: <Error></Error>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    hydrateFallbackElement: <Loding></Loding>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/*",
        element: <Error></Error>,
      },
      {
        path: "/forget",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path:"*",
        element:<Error></Error>
      }
    ],
  },
  {
    path: "/dasbord",
    element: (
      <PriverRouter>
        <DashbordLayout></DashbordLayout>
      </PriverRouter>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        path: "/dasbord/myparcel",
        element:<UserRole><MyParcel></MyParcel></UserRole>
      },
      {
        path: "/dasbord/deliveries",
        element: <AdminRole><AllDrivers></AllDrivers></AdminRole>
      },
      {
        path: "/dasbord/assinRider",
        element: <AdminRole><AssinRider></AssinRider></AdminRole>
      },
      {
        path: "/dasbord/paymentHiestory",
        element:<UserRole><PaymentHiestory></PaymentHiestory></UserRole>
      },
      {
        path: "/dasbord/payment/:parcelId",
        Component: Payment,
      },
      {
        path: "/dasbord/success",
        Component: SuccessPage,
      },
      {
        path: "/dasbord/cancel",
        Component: CancelPage,
      },
      {
        path: "/dasbord/userManage",
        element: <AdminRole><UserManage></UserManage></AdminRole>
      },
      {
        path: "/dasbord/assigned-deliveries",
        element: <RIderRoute><AssingDiliveryTask></AssingDiliveryTask></RIderRoute>
      },
      {
        path: "/dasbord/riderCommpletTask",
        element: <RIderRoute><CompletRiderTask></CompletRiderTask></RIderRoute>
      },
      {
        path:"*",
        element:<Error></Error>
      }
    ],
  },
  {
    path:"*",
    element:<Error></Error>
  }
]);
