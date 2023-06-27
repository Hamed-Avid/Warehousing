import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/Store";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./containers/Layout";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Routes>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
