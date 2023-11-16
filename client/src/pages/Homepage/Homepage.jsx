import React from "react";
import "./homepage.scss";
import { BsExplicit } from "react-icons/bs"
import { Link } from "react-router-dom";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLinks";

export default function Homepage() {
    return (
        <>
            <div className="home">
                <nav className="container --flex-between">
                    <div className="logo">
                        <BsExplicit size={35} />
                    </div>
                    <ul className="home-links">
                        <ShowOnLogout>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </ShowOnLogout>
                        <ShowOnLogout>
                            <li>
                                <button className="--btn --btn-primary">
                                    <Link to="/login">Login</Link>
                                </button>
                            </li>
                        </ShowOnLogout>
                        <ShowOnLogin>
                            <li>
                                <button className="--btn --btn-primary">
                                    <Link to="/dashboard">Dashboard</Link>
                                </button>
                            </li>
                        </ShowOnLogin>
                    </ul>
                </nav>

                {/* HERO SECTION */}
                <section className="container hero">
                    <div className="hero-text">
                        <h2>Inventory and Stock Management Solution</h2>
                        <p>Inventory system to control and manage various products in the warehouse in real time and it is integrated to make things easier in order to develop your business</p>
                        <div className="hero-buttons">
                            <button className="--btn --btn-secondary">
                                <Link to="/dashboard">1 Month Free Trial</Link>
                            </button>
                        </div>
                        <div className="--flex-start">
                            <NumberText num="14K" text="Brand owners" />
                            <NumberText num="23K" text="Active users" />
                            <NumberText num="500+" text="Partners" />
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src={heroImg} alt="inventory" />
                    </div>
                </section>
            </div>
        </>
    );
};

const NumberText = ({ num, text }) => {
    return (
        <div className="--mr">
            <h3 className="--color-white">{num}</h3>
            <p className="--color-white">{text}</p>
        </div>
    );
};
