import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

import clsx from "clsx";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div>
      <header className={css.header__nav}>
        <NavLink className={(isActive) => buildLinkClass(isActive)} to="/">
          Home
        </NavLink>
        <NavLink
          className={(isActive) => buildLinkClass(isActive)}
          to="/movies"
        >
          Movies
        </NavLink>
      </header>
    </div>
  );
};

export default Navigation;
