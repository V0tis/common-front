import React, { useMemo } from "react";

const IconSelector = ({ type, styles }) => {
  const paintIcon = useMemo(() => {
    switch (type) {
      case "test":
        return null;
      default:
        return null;
    }
  }, []);

  return <img style={styles} src={paintIcon} />;
};

export default IconSelector;
