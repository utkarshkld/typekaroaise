import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <Link className="site-logo" to="/">TypeKaroAise</Link>
                <nav>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active_dash" : null}>Home</NavLink>
                    <NavLink to="/race" className={({ isActive }) => isActive ? "active_dash" : null}>Practice</NavLink>
                    <NavLink to="/compete" className={({ isActive }) => isActive ? "active_dash" : null}>Compete</NavLink>
                </nav>

            </header>

        </>
    )
}