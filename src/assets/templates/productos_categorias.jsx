/* Cosas de React */
import React from "react"
import ReactDOM from "react-dom"

/* Componentes */
import BarraLateralCarritoCompras from "../components/BarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import CategoryPreviews from "../components/CategoryPreviews"

function Productos_Categorias() {
    return (
        <>
            <StoreNavigation />
            <CategoryPreviews />
            <BarraLateralCarritoCompras />
        </>
    )
}

ReactDOM.render(<Productos_Categorias />, document.getElementById("root"))