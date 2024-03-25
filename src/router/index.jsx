import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "../features/identity/components/login";
import Identity from "../layouts/identity";
import Register, {
  registerAction,
} from "../features/identity/components/register";
import Main from "../layouts/main/main";
import Courses, { coursesLoader } from "../pages/courses";
import CourseCategories, { categoriesLoader } from "../pages/course-categories";
import CourseDetails, {
  courseDetailLoader,
} from "../features/courses/components/course-details";
import { CategoryProvider } from "../features/categories/category-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        path: "course-details/:id",
        element: <CourseDetails />,
        loader: courseDetailLoader,
      },
      {
        path: "course-categories",
        element: (
          <CategoryProvider>
            <CourseCategories />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
      },
    ],
  },
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
