/* Cosas de React */
import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"

/* Componentes */
import BarraLateralCarritoCompras from "../components/BarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import CategoryPreviews from "../components/CategoryPreviews.jsx"

export default function Productos_Categorias() {
    return (
        <>
            <StoreNavigation />
            <CategoryPreviews />
            <BarraLateralCarritoCompras />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Productos_Categorias />
);