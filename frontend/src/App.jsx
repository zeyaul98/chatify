import { Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import ChatPage from "./Pages/ChatPage"
import { useAuthStore } from "./store/useAuthStore"


const App = () => {

  const {authUser, isLoggedIn, login} = useAuthStore()
  console.log('authUser', authUser);
  console.log('isLoggedIn', isLoggedIn);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

  
      {/* decorator grid bg and glow shappes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px)
      ,linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <button onClick={login} className="bg-blue-500 z-10 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </div>

  )
}

export default App