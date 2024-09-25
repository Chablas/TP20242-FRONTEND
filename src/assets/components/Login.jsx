import { Link } from "react-router-dom"
import logo from "../images/logo.jpg"

export default function Login() {
    return (
<div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
        <Link to="/"><img
            src={logo} alt="logo" className='w-20 mb-8 mx-auto block' />
        </Link>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Iniciar Sesión</h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Correo</label>
                <div className="relative flex items-center">
                  <input name="username" type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Ingresa tu correo electrónico" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Ingresa tu contraseña" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Recuerdame
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/restore-password" className="text-purple-600 hover:underline font-semibold">
                    Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <div className="!mt-8">
                <button type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                  Ingresar
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">No tienes una cuenta? <Link to="/register" className="text-purple-600 hover:underline ml-1 whitespace-nowrap font-semibold">Registrate aquí</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}