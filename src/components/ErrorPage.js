import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fourofour from "../recources/img/fourofour.jpg";
import './ErrorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("");
        }, 5000);
    }, [navigate]);

    return (
        <main className="app-container__main">
            <img className="main__error-img" src={fourofour} alt="page not found" />
            <p>redirecting to the homepage shortly...</p>
        </main>
    )

};

export default ErrorPage;