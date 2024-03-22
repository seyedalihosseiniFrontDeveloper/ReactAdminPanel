import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "../features/identity/components/login";
import Identity from "../layouts/identity";
import Register, {
  registerAction,
} from "../features/identity/components/register";
import Course from "../features/courses/components/course";

const router = createBrowserRouter([
  {
    element: <Identity />,
    children: [
      {
        path: "login",
        element: <Login />,
        errorElement: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        errorElement: <Register />,
        action: registerAction,
      },
    ],
  },
]);

export default router;
