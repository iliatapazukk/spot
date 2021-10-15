import React from 'react'
import { Link } from 'react-scroll'
import './Navbar.scss'

const Navbar: React.FC = () => {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link
            className="link"
            activeClass="active"
            to="Hero"
            spy={true}
            smooth={true}
            offset={0}
            duration={100}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="link"
            activeClass="active"
            to="Services"
            spy={true}
            smooth={true}
            offset={0}
            duration={100}
          >
            Услуги
          </Link>
        </li>
        <li>
          <Link
            className="link"
            activeClass="active"
            to="Location"
            spy={true}
            smooth={true}
            offset={0}
            duration={100}
          >
            Локация
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;