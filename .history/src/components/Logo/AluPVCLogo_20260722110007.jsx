import "./Logo.css";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="intro">

      <div className="particles"></div>

      <motion.svg
        className="logo"
        viewBox="0 0 600 400"
        initial={{ scale: .35, opacity: 0, filter: "blur(25px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1,
          ease: [0.22,1,0.36,1]
        }}
      >

        {/* A */}

        <motion.g
          initial={{
            x:-220,
            rotate:-18,
            opacity:0
          }}
          animate={{
            x:0,
            rotate:0,
            opacity:1
          }}
          transition={{
            duration:1,
            ease:[0.22,1,0.36,1]
          }}
        >

          {/* TU A */}

        </motion.g>

        {/* P */}

        <motion.g

          initial={{
            x:220,
            rotate:15,
            opacity:0
          }}

          animate={{
            x:0,
            rotate:0,
            opacity:1
          }}

          transition={{
            delay:.15,
            duration:1,
            ease:[0.22,1,0.36,1]
          }}

        >

          {/* TU P */}

        </motion.g>

      </motion.svg>

      <div className="flash"/>

      <div className="shine"/>

      <div className="bcn">

        <span>B</span>
        <span>C</span>
        <span>N</span>

      </div>

    </div>
  );
}