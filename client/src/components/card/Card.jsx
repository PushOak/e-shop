import React from "react";
import styles from "./card.module.scss";

export default function Card({ children, cardClass }) {
    return (
        <>
            <div className={`${styles.card} ${cardClass}`}>
                {children}
            </div>
        </>
    );
};
