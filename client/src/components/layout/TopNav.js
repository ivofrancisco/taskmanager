import React from 'react';
import PropTypes from 'prop-types';

import brand from './brand.png';
import './TopNav.scss';

const TopNav = ({ title, icon }) => {
    return (
        <div className="top-nav">
            {/* Site Brand */}
            <div className="site-brand">
                <img src={brand} alt="logo Get2Work" />
            </div>
            {/* Navigation Links */}
            <ul className="navigation-links">
                <li>
                    <a href="index.html" className="action-link active">Tarefas</a>
                </li>
                <li>
                    <a href="calendar.html" className="action-link">Calendário</a>
                </li>
            </ul>
            {/* Navigation Actions */}
            <ul className="navigation-actions">
                <li>
                    <a href="#" className="login">Login</a>
                </li>
            </ul>
        </div>
    );
};

TopNav.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

TopNav.defaultProps = {
    title: 'Taskmanager'
};

export default TopNav;