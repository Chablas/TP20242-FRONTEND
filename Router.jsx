import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />}>
                <Route path="/team" element={<Team />} />
                <Route path="/history" element={<History />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

function Home() {
    return (
        <h1>Hola</h1>
    )
}
function About() {
    return (
        <h1>Hola</h1>
    )
}
function Team() {
    return (
        <h1>Hola</h1>
    )
}
function History() {
    return (
        <h1>Hola</h1>
    )
}
function Contact() {
    return (
        <h1>Hola</h1>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
// ReactDOM.createRoot(<App />, document.getElementById("root"))