import React from "react";

const Scroes = ({ scoreArray }) => {
  return (
    <article>
      <h2>Sores</h2>
      <ul>
        {scoreArray.map(({ player, score }) => (
          <li>{player}: {score}</li>
        ))}
      </ul>
    </article>
  );
};

export default Scroes;
