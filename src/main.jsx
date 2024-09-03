import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { VerifyTaxClearance } from "./VerifyTaxClearance.jsx";
import VerifyPay from "./VerifyPay.jsx";
import ClearanceCertificate from "./ClearanceCertificate.jsx";
import Invoice from "./Invoice /Invoice.jsx";
import VerifyInvoice from "./Invoice /VerifyInvoice.jsx";
const router = createBrowserRouter([
  {
    path: "/:id",
    element: <App />,
  },
  {
    path: "/:id/:type",
    element: <App />,
  },
  {
    path: "/:num/:tax/:type",
    element: <VerifyTaxClearance />,
  },
  {
    path: "/:num/:tax/:type/clearance-certificate",
    element: <ClearanceCertificate />
  },
  {
    path: "/:num/:tax/:type/:clearance-certificate/invoice",
    element: <Invoice />
  },
  {
    path: "/:num/:tax/:type/clearance-certificate/:invoice/view",
    element: <VerifyInvoice />
  } 
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </React.StrictMode>
);
