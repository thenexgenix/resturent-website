import { useEffect, useState } from "react";
import { motion } from "motion/react";

const Cursor = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);


  const variants = {
    default: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      scale: 1,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block"
        style={{
          width: "30px",
          height: "30px",
          border: "1px solid #FF4C24",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
      >
        <motion.div
          style={{
            width: "5px",
            height: "5px",
            backgroundColor: "#FF4C24",
            borderRadius: "50%",
          }}
        ></motion.div>
      </motion.div>
    </>
  );
};

export default Cursor;
