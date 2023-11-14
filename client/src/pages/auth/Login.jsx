import React from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <div className="--flex-center">
                            <BiLogIn size={35} color="#997" />
                        </div>
                        <h2>Login</h2>

                        <form>
                            <input
                                type="text"
                                placeholder="Your email"
                                name="email"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Your password"
                                name="password"
                                required
                            />
                            <button
                                type="submit"
                                className="--btn --btn-primary --btn-block"
                            >
                                Login
                            </button>
                        </form>
                        <Link to="/forgot">Forgot password ?</Link>
                        <span className={styles.register}>
                            <Link to="/">Home</Link>
                            <p>&nbsp; Don't have an account? &nbsp;</p>
                            <Link to="/register" >Register</Link>
                        </span>
                    </div>
                </Card>
            </div>
        </>
    );
};
