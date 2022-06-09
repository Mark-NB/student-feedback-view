import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuote, setCurrentTimeAndDate } from "../features/displayLogic/displayLogicSlice";
import './Footer.css';

const Footer = () => {

    const allDisplayLogic = useSelector((state) => state.displayLogic);
    const dispatch = useDispatch();

    //gets random quotes from free web API
    useEffect(() => {
        async function fetchQuote() {
            try {
                const response = await fetch("https://type.fit/api/quotes");
                const quote = await response.json();
                let randomNumber = Math.floor(Math.random() * 1500);
                dispatch(setCurrentQuote(quote[randomNumber]));
            } catch (err) {
                console.log(err);
            }
        }
        fetchQuote();
    }, []);

    //generates date and time and sets 1 second interval for re-render of time
    useEffect(() => {
        const timeInterval = setInterval(() => {
            const today = new Date();
            const hour = String(today.getHours()).padStart(2, '0');
            const min = String(today.getMinutes()).padStart(2, '0');
            const sec = String(today.getSeconds()).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const timeAndDate = `${hour}:${min}:${sec} ${dd}/${mm}/${yyyy}`;
            (dispatch(setCurrentTimeAndDate(timeAndDate)));
        }, 1000);
        return () => clearInterval(timeInterval);
    }, []);

    return (
        <footer className="app-container__footer">
            <h4 className="footer__quote"> {`"${allDisplayLogic.currentQuote.text}" - ${allDisplayLogic.currentQuote.author ? allDisplayLogic.currentQuote.author : "Source unknown..."}`}</h4>
            <h4 className="footer__timedate">{allDisplayLogic.currentTimeAndDate}</h4>
        </footer>
    )
};

export default Footer;