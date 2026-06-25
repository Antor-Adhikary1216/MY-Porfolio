import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";

const lazyComponent = (importer) => async () => {
  const module = await importer();
  return { Component: module.default };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, lazy: lazyComponent(() => import("../pages/Home")) },
      { path: "projects", lazy: lazyComponent(() => import("../pages/ProjectsPage")) },
      { path: "projects/:id", lazy: lazyComponent(() => import("../pages/ProjectDetails")) },
      { path: "blog", lazy: lazyComponent(() => import("../pages/Blog")) },
      { path: "blog/:id", lazy: lazyComponent(() => import("../pages/BlogDetails")) },
      { path: "login", lazy: lazyComponent(() => import("../pages/Login")) },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    lazy: lazyComponent(() => import("./ProtectedDashboardRoute")),
    children: [
      { index: true, lazy: lazyComponent(() => import("../dashboard/DashboardOverview")) },
      { path: "projects", lazy: lazyComponent(() => import("../dashboard/ManageProjects")) },
      { path: "projects/new", lazy: lazyComponent(() => import("../dashboard/AddProject")) },
      { path: "projects/:id/edit", lazy: lazyComponent(() => import("../dashboard/AddProject")) },
      { path: "skills", lazy: lazyComponent(() => import("../dashboard/ManageSkills")) },
      { path: "skills/new", lazy: lazyComponent(() => import("../dashboard/AddSkill")) },
      { path: "skills/:id/edit", lazy: lazyComponent(() => import("../dashboard/AddSkill")) },
      { path: "blogs", lazy: lazyComponent(() => import("../dashboard/ManageBlogs")) },
      { path: "blogs/new", lazy: lazyComponent(() => import("../dashboard/AddBlog")) },
      { path: "blogs/:id/edit", lazy: lazyComponent(() => import("../dashboard/AddBlog")) },
      { path: "messages", lazy: lazyComponent(() => import("../dashboard/Messages")) },
    ],
  },
]);

export default router;
