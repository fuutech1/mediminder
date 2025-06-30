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
        src="https://raw.githubusercontent.com/fuutech1/mediminder/b03be47b9dd1bbef3f0812240fe937982c885d58/badges/bolt-badge/black_circle_360x360/black_circle_360x360.svg"
        alt="Built with Bolt.new"
        className="w-28 hover:scale-105 transition-all"
      />
    </a>
  );
};

export default BoltBadge;
