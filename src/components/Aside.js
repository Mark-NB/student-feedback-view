import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { changeFilter } from "../features/displayLogic/displayLogicSlice";
import homeIcon from '../recources/icons/home.svg';
import studentIcon from '../recources/icons/student.svg';
import profileIcon from '../recources/icons/profile.svg';
import filterIcon from '../recources/icons/filter.svg';
import './Aside.css';

const Aside = () => {

    const allDisplayLogic = useSelector((state) => state.displayLogic);
    const dispatch = useDispatch();

    const handleFilterChange = (event) => {
        dispatch(changeFilter(event.target.name))
    }

    //lets sidebar slide in on page load
    useEffect(() => {
        setTimeout(() => {
            let sidebar = document.getElementById('asidebar');
            sidebar.className = "app-container__aside";
        }, 1000);
    }, []);



    return (
        <aside >
            <div id="asidebar" className="app-container__aside--hidden">
                <div className="aside__bar">
                    <img className="aside__icon" src={homeIcon} alt="home icon" />
                    <Link className="aside__btn" to='/'>Home</Link>
                </div>
                <div className="aside__bar">
                    <img className="aside__icon" src={studentIcon} alt="student icon" />
                    <Link className="aside__btn" to='/students'>Students</Link>
                </div>
                <div className="aside__bar">
                    <img className="aside__icon" src={profileIcon} alt="profile icon" />
                    <Link className="aside__btn" to='/profiles'>Profiles</Link>
                </div>
                <div className="aside__bar-long">
                    <img className="aside__icon" src={filterIcon} alt="filter icon" />
                    <label>
                        <input
                            type="checkbox"
                            className="aside__checkbox"
                            name="showDifficulty"
                            checked={allDisplayLogic.showDifficulty}
                            onChange={(e) => handleFilterChange(e)}
                        /> Show Difficulty
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            className="aside__checkbox"
                            name="showFun"
                            checked={allDisplayLogic.showFun}
                            onChange={(e) => handleFilterChange(e)}
                        /> Show Fun
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            className="aside__checkbox"
                            name="sortDifficulty"
                            checked={allDisplayLogic.sortDifficulty}
                            onChange={(e) => handleFilterChange(e)}
                        /> Sort by difficulty
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            className="aside__checkbox"
                            name="sortFun"
                            checked={allDisplayLogic.sortFun}
                            onChange={(e) => handleFilterChange(e)}
                        /> Sort by fun
                    </label>
                </div>
            </div>
        </aside>
    )
};

export default Aside;