import { useEffect, useState } from "react";
import "./App.css"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="flex flex-wrap content-between min-h-screen bg-gray-400">
      <div className="block w-full">
        <Header />
        <main>
          {/* TODO: Handle this */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>
      <h1>NOT LOGGED IN</h1>
    </div>
  )
}

export default App;
