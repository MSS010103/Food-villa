import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./src/components/Error";
import About from "./src/components/About";
import ContactUs from "./src/components/ContactUs";
import { Provider } from "react-redux"; //provides react the redux store / connect our app to redux store
import store from "./src/utils/store";
import Login from "./src/components/Login";
import CreateRecipe from "./src/components/CreateRecipe";
import SavedItems from "./src/components/SavedItems";
import RecipePage from "./src/components/RecipePage";

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      {/*childern will come into outlet, whereas header and footer har page pe jaenge*/}
      <Footer />
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/cart",
        element: <SavedItems />,
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe />,
      },
      {
        path: "/recipe/:id",
        element: <RecipePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
