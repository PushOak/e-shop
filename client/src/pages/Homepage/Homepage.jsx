import React from "react";
import "./Homepage.scss";
import { BsExplicit } from "react-icons/bs"
import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <>
            <div className="home">
                <nav className="container --flex-between">
                    <div className="logo">
                        <BsExplicit size={35} />
                    </div>
                    <ul className="home-links">
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <button className="--btn --btn-primary">
                                <Link to="/login">Login</Link>
                            </button>
                        </li>
                        <li>
                            <button className="--btn --btn-primary">
                                <Link to="/dashboard">Dashboard</Link>
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* HERO SECTION */}
                <section className="container hero">
                    <div className="hero-text">
                        <h2>Inventory and Stock Management Solution</h2>
                        <p>Inventory system to control and manage various products in the warehouse in real time and it is integrated to make things easier in order to develop your business</p>
                        <div className="hero-buttons">
                            <button className="--btn --btn-secondary">
                                <Link to="/dashboard">Dashboard</Link>
                            </button>
                        </div>
                    </div>

                    <div className="hero-image"></div>
                </section>
            </div>
        </>
    );
};
