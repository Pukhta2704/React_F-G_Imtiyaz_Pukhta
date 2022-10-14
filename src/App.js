import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import routes from "./router.js"
import "./loading.css"

const App = () => {
  return (
    <div className="App">
      <Routes>
        {routes.map((Item) => {
          return (
            <Route
              exact
              path={Item.route}
              element={
                <Suspense fallback={<div className="loading">Loading&#8230;</div>}>
                  <Item.Component />
                </Suspense>
              }
              key={Item.id}
            />
          )
        })}
      </Routes>
    </div>
  )
}

export default App
