import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "");
      params.append("username", email);
      params.append("password", password);
      params.append("scope", "");
      params.append("client_id", "");
      params.append("client_secret", "");
  
      const response = await fetch("https://compusave-backend.onrender.com/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
  
      if (response.status === 200) {
        await fetch("https://compusave-backend.onrender.com/put/login", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        navigate("/dashboard/categorias");
      } else {
        setErrorMessage("Hubo un error. Verifica tus credenciales.");
      }
    } catch (error) {
      setErrorMessage("Hubo un error en el servidor. Inténtalo de nuevo más tarde.");
    }
  };
  
  

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Link to="/">
            <img src={logo} alt="logo" className="w-20 mb-8 mx-auto block" />
          </Link>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Iniciar Sesión</h2>
            <form className="mt-8 space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Correo</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Ingresa tu correo electrónico"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
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

              {errorMessage && <p className="text-red-600 text-sm text-center mt-4">{errorMessage}</p>}

              <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                  Ingresar
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                No tienes una cuenta? <Link to="/register" className="text-purple-600 hover:underline ml-1 whitespace-nowrap font-semibold">Registrate aquí</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
