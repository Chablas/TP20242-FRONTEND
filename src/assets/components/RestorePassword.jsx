import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.jpg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"; // Importamos componentes necesarios de Material UI

export default function RestorePassword() {
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("El campo de correo electrónico no puede estar vacío.");
    } else if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
    } else {
      setError("");
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Link to="/">
            <img src={logo} alt="logo" className="w-20 mb-8 mx-auto block" />
          </Link>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Restablecer Contraseña
            </h2>
            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Correo</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                  onClick={handleReset}
                >
                  Restablecer
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                No tienes una cuenta?{" "}
                <Link to="/register" className="text-purple-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Registrate aquí
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Reemplazamos el modal con el Dialog de Material UI */}
      <Dialog open={showDialog} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
          Correo Enviado
        </DialogTitle>
        <DialogContent>
          <Typography align="center" variant="body2" style={{ marginBottom: "1rem" }}>
            Se ha enviado un correo a <strong>{email}</strong> con los pasos para restablecer tu
            contraseña.
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={closeDialog}
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
