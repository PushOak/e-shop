import React from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

export default function ResetPassword() {
    return (
        <>
            <div className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <div className="--flex-center">
                            <MdPassword size={35} color="#997" />
                        </div>
                        <h2>Reset Password</h2>

                        <form>
                            <input
                                type="password"
                                placeholder="New password"
                                name="password"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                name="password"
                                required
                            />
                            <button
                                type="submit"
                                className="--btn --btn-primary --btn-block"
                            >
                                Reset Password
                            </button>
                            <div className={styles.links}>
                                <p>
                                    <Link to="/">- Home</Link>
                                </p>
                                <p>
                                    <Link to="/login" >- Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    );
};

