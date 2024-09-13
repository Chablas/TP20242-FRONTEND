/* Cosas de React */
import React from "react"
import ReactDOM from "react-dom"

/* Componentes */
import BarraLateralCarritoCompras from "../components/BarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import PromoSections from "../components/PromoSections.jsx"

function Index() {
    return (
        <>
            <StoreNavigation />
            <PromoSections />
            <BarraLateralCarritoCompras />
        </>
    )
}
ReactDOM.render(<Index />, document.getElementById("root"));