import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.jpg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async () => {
    setError("");

    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!acceptedTerms) {
      setError("Debes aceptar los Términos y Condiciones para registrarte.");
      return;
    }

    const userData = { email, password };

    try {
      const response = await fetch("https://compusave-backend.onrender.com/post/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        setDialogOpen(true);
      } else if (response.status === 400) {
        setError("Ya existe una cuenta asociada a este correo.");
      } else {
        setError("Error al registrar el usuario. Inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
      console.error("Error al registrar el usuario:", error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Link to="/">
            <img src={logo} alt="logo" className="w-20 mb-8 mx-auto block" />
          </Link>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Crear una cuenta</h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Correo</label>
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirmar Contraseña</label>
                <input
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Aceptas los <Link to="/" className="text-purple-600 hover:underline font-semibold">Términos y Condiciones</Link> y la <Link to="/" className="text-purple-600 hover:underline font-semibold">Política de Privacidad</Link>.
                  </label>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                >
                  Ingresar
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Ya tienes una cuenta? <Link to="/login" className="text-purple-600 hover:underline ml-1 whitespace-nowrap font-semibold">Inicia sesión aquí</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="xs">
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
          Registro existoso
        </DialogTitle>
        <DialogContent>
          <Typography align="center" variant="body2" style={{ marginBottom: "1rem" }}>
            Se ha registrado exitosamente el usuario con el correo: <strong>{email}</strong>.
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleDialogClose}
            style={{
              backgroundColor: "#9B51E0",
              color: "#fff",
              width: "100%",
              padding: "10px 0",
              borderRadius: "8px",
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
