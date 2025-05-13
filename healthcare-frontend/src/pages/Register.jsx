import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center 
        ">
          Already have an account?{' '}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>


      </div>
    </div>
  )
}

export default Register
