import React from "react";
import { useState } from "react";
function Character({ id, name, image, description, link, isOpen, onToggle }) {
  return (
    <div className={`postacie ${isOpen ? "open" : ""}`} onClick={onToggle}>
      <img src={image} alt={name} className="postacie__img" />
      <h2 className="postacie__name">{name}</h2>

      <div className="postacie__wrap">
        <div className="postacie__description">
          {description ? (
            <p dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <p>Brak opisu.</p>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              Zobacz więcej
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Character;






