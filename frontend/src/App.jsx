import "./App.css";
import { Checkout } from "./components/Checkout";
import { Return } from "./components/Return";
import { SubscriptionInfo } from "./components/SubscriptionInfo";
import { loadStripe } from "@stripe/stripe-js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51OFDE1SAmBXTDoESitaVBEc2ZQklDaNyCkmDwSsVxrCmENdQ3CFLS3wHQMTvzUsUoKoKugPfbPy4xvpX4Jxblmgt00be2nODuc"
  );
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex h-screen w-screen">
                <SubscriptionInfo />
              </div>
            }
          />
          <Route path="/checkout" element={<Checkout stripePromise={stripePromise}/>} />
          <Route path="/return" element={<Return stripePromise={stripePromise}/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
