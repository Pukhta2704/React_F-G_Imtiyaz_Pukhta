
import { lazy } from "react"

const routes = [
  {
    route: "/",
    id: "home",
    Component: lazy(() => import("./views/homepage/homepage.js"))
  },
  {
    route: "/add-new",
    id: "add-new",
    Component: lazy(() => import("./views/add-new/Add.js"))
  },
]
export default routes
