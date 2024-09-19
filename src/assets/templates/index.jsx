// Cosas de React
import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes
import BarraLateralCarritoCompras from "../components/BarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import PromoSections from "../components/PromoSections.jsx"
import CategoryPreviews from "../components/CategoryPreviews.jsx"
import Categoria from "../components/DashboardCategoria.jsx"
import DashboardNav from "../components/DashboardNav.jsx";
import DashboardProductos from "../components/DashboardProductos.jsx"

// Páginas

function P_Index() {
    return (
        <>
            <StoreNavigation />
            <PromoSections />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Productos_Categorias() {
    return (
        <>
            <StoreNavigation />
            <CategoryPreviews />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Dashboard_Categorias() {
    return (
        <>
            <DashboardNav />
            <Categoria />
        </>
    )
}

function P_Dashboard_Productos() {
    return (
        <>
            <DashboardNav />
            <DashboardProductos />
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<P_Index />} />
                <Route path="/categorias" element={<P_Productos_Categorias />} />
                <Route path="/dashboard/categorias" element={<P_Dashboard_Categorias />}/>
                <Route path="/dashboard/productos" element={<P_Dashboard_Productos />}/>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);