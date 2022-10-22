import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import Profile from "../../Others/Profile";
import TermsAndCondition from "../../Others/TermsAndCondition";
import Category from "../../Pages/Category/Category/Category";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import News from "../../Pages/News/News/News";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        loader: () =>
          fetch("https://dragon-news-server-lac-beta.vercel.app/news"),
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(
            `https://dragon-news-server-lac-beta.vercel.app/category/${params.id}`
          ),
        element: <Category></Category>,
      },
      {
        path: "/news/:id",
        loader: ({ params }) =>
          fetch(
            `https://dragon-news-server-lac-beta.vercel.app/news/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <News></News>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "terms",
        element: <TermsAndCondition></TermsAndCondition>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
