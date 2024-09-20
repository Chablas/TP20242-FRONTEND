// Cosas de React
import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes
import BarraLateralCarritoCompras from "../components/StoreBarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import PromoSections from "../components/StorePromoSections.jsx"
import CategoryPreviews from "../components/StoreCategoryPreviews.jsx"
import Categoria from "../components/DashboardCategoria.jsx"
import DashboardNav from "../components/DashboardNav.jsx";
import DashboardProductos from "../components/DashboardProductos.jsx"
import DashboardRoles from "../components/DashboardRoles.jsx";

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

function P_Dashboard_Usuarios() {
    return (
        <>
            <DashboardNav />
            <DashboardRoles />
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
                <Route path="/dashboard/usuarios" element={<P_Dashboard_Usuarios />}/>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);