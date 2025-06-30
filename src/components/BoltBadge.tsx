import React from "react";

const BoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <img
        src="https://bolt.new/badge/built-with-bolt-dark.svg"
        alt="Built with Bolt.new"
        className="w-28 hover:scale-105 transition-all"
      />
    </a>
  );
};

export default BoltBadge;
