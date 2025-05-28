import React, {useState} from "react";
import { Link } from "react-router-dom";


const Header = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="jajka">
      <button type="button" className="jajka__buttno" onClick={() => {
        
        setOpen(!open);
      }}>
        ☰ 
      </button>
      {open && (
         <div className="tab-overlay" onClick={() => setOpen(false)}>
          <div
            className="tab-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <nav>
              <ul className="tab-links">
                <li>
                  <Link to="/" onClick={() => setOpen(false)}>home</Link>
                </li>
                <li>
                  <Link to="/characters" onClick={() => setOpen(false)}>post</Link>
                </li>
                <li>
                  <Link to="/datingsim" onClick={() => setOpen(false)}>epicgaem</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;