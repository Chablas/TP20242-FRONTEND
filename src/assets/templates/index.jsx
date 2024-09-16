// Cosas de React
import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes
import BarraLateralCarritoCompras from "../components/BarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import PromoSections from "../components/PromoSections.jsx"
import CategoryPreviews from "../components/CategoryPreviews.jsx"

// Páginas

function Index() {
    return (
        <>
            <StoreNavigation />
            <PromoSections />
            <BarraLateralCarritoCompras />
        </>
    )
}

function Productos_Categorias() {
    return (
        <>
            <StoreNavigation />
            <CategoryPreviews />
            <BarraLateralCarritoCompras />
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/categorias" element={<Productos_Categorias />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);