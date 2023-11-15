import React, { useState } from "react";
import "./sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsExplicit } from "react-icons/bs"
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <>
            <div className="layout">

                <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
                    <div className="top_section">
                        <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
                            <BsExplicit
                                size={35}
                                style={{ cursor: "pointer" }}
                                onClick={goHome}
                            />
                        </div>

                        <div className="bars" style={{ marginLeft: isOpen ? "100px" : "0px", cursor: "pointer" }}>
                            <HiMenuAlt3
                                size={35}
                                onClick={toggle}
                            />
                        </div>
                    </div>
                    {menu.map((item, index) => {
                        return <SidebarItem
                            key={index}
                            item={item}
                            isOpen={isOpen}
                        />
                    })}
                </div>

                <main style={{
                    paddingLeft: isOpen ? "230px" : "60px",
                    transition: "all .3s",
                }}>
                    {children}
                </main>
            </div>
        </>
    );
};
