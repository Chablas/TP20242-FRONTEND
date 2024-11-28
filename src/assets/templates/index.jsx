// Cosas de React
import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes
import BarraLateralCarritoCompras from "../components/StoreBarraLateralCarritoCompras.jsx"
import StoreNavigation from "../components/StoreNavigation.jsx"
import PromoSections from "../components/StorePromoSections.jsx"
import CategoryPreviews from "../components/StoreCategoryPreviews.jsx"
import StoreCompany from "../components/StoreCompany.jsx";  
import CarritoCompras from "../components/CarritoCompras.jsx"

import Proveedor from "../components/DashboardProveedores.jsx";
import Categoria from "../components/DashboardCategoria.jsx";
import DashboardNav from "../components/DashboardNav.jsx";
import DashboardProductos from "../components/DashboardProductos.jsx"
import DashboardUsuarios from "../components/DashboardUsuarios.jsx";
import StoreProductOverview from "../components/StoreProductOverview.jsx";
import StoreProductAll from "../components/StoreProductAll.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import RestorePassword from "../components/RestorePassword.jsx";
import DashboardAlmacen from "../components/DashboardAlmacen.jsx";
import DashboardServicios from "../components/DashboardServicios.jsx";

import ServicePreviews from "../components/StoreServicePreview.jsx";
import StoreServiciosOverview from "../components/StoreServiciosOverview.jsx";
import { UserProvider } from "../context/UserContext.jsx";
import Contactenos from "../components/Contactenos.jsx";

import Stock from "../components/DashboardStock.jsx"


// Páginas
function P_Store_Servicios_Overview() {
    return (
        <>
            <StoreNavigation />
            <StoreServiciosOverview />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Store_Index() {
    return (
        <>
            <StoreNavigation />
            <PromoSections />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Store_Contactenos() {
    return (
        <>
            <StoreNavigation />
            <Contactenos/>
            <BarraLateralCarritoCompras />
        </>
    )
}


function P_Store_Productos_Categorias() {
    return (
        <>
            <StoreNavigation />
            <CategoryPreviews />
            <BarraLateralCarritoCompras />
        </>
    )
}
function P_Store_Servicios_Categorias() {
    return (
        <>
            <StoreNavigation />
            <ServicePreviews />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Store_Product_Overview() {
    return (
        <>
            <StoreNavigation />
            <StoreProductOverview />
            <BarraLateralCarritoCompras />
        </>
    )
}


function P_Store_Company() {
    return (
        <>
            <StoreNavigation />
            <StoreCompany />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Carrito_Compras() {
    return (
        <>
            <StoreNavigation />
            <CarritoCompras />
            
        </>
    )
}

function P_Store_Product_All() {
    return (
        <>
            <StoreNavigation />
            <StoreProductAll />
            <BarraLateralCarritoCompras />
        </>
    )
}

function P_Dashboard_Proveedores() {
    return (
        <>
            <DashboardNav />
            <Proveedor />
        </>
    )
}

function P_Dashboard_Stock() {
    return (
        <>
            <DashboardNav />
            <Stock />
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

function P_Dashboard_Servicios() {
    return (
        <>
            <DashboardNav />
            <DashboardServicios />
        </>
    )
}

function P_Dashboard_Usuarios() {
    return (
        <>
            <DashboardNav />
            <DashboardUsuarios />
        </>
    )
}

function P_Login() {
    return (
        <>
            <Login />
        </>
    )
}

function P_Register() {
    return (
        <>
            <Register />
        </>
    )
}

function P_RestorePassword() {
    return (
        <>
            <RestorePassword />
        </>
    )
}

function P_Dashboard_Almacen() {
    return (
        <>
            <DashboardNav />
            <DashboardAlmacen/>
        </>
    )
}



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<P_Store_Index />} />
                <Route path="/Contactenos" element={<P_Store_Contactenos />} />
                <Route path="/nosotros" element={<P_Store_Company />} />                
                <Route path="/login" element={<P_Login />} />
                <Route path="/register" element={<P_Register/>} />
                <Route path="/restore-password" element={<P_RestorePassword/>} />
                <Route path="/carritoCompras" element={<P_Carrito_Compras />}/>

                <Route path="/categorias" element={<P_Store_Productos_Categorias />} />
                <Route path="/categorias/:categoriaid" element={<P_Store_Product_All />} />
                <Route path="/producto/overview/:id" element={<P_Store_Product_Overview />} />

                <Route path="/servicios" element={<P_Store_Servicios_Categorias />}/>
                <Route path="/StoreServiciosOverview/:id" element={<P_Store_Servicios_Overview />}/>
                
                <Route path="/dashboard/proveedores" element={<P_Dashboard_Proveedores />}/>
                <Route path="/dashboard/categorias" element={<P_Dashboard_Categorias />}/>
                <Route path="/dashboard/productos" element={<P_Dashboard_Productos />}/>
                <Route path="/dashboard/usuarios" element={<P_Dashboard_Usuarios />}/>
                <Route path="/dashboard/servicios" element={<P_Dashboard_Servicios />}/>
                <Route path="/dashboard/almacen" element={<P_Dashboard_Almacen />}/>
    
                <Route path="/dashboard/stock" element={<P_Dashboard_Stock />}/>
            
                
            </Routes>

        
        </BrowserRouter>
    )
}

function RutasProductos() {
    const header = new Headers();
    header.append("Content-Type", "application/json")
    return 
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <App />
    </UserProvider>,
);