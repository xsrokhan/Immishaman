import React from 'react'
import { motion } from 'framer-motion'

function FAQarrow({ isOpen }) {

    const leftWingVariants = {
      closed: { d: "M3 3 L8 8" },
      open: { d: "M3 3 L13 3" },
    }
  
    const rightWingVariants = {
      closed: { d: "M13 3 L8 8", opacity: 1 },
      open: { d: "M13 3 L13 3", opacity: 0 },
    }
  
    return (
        <svg
        width="24"
        height="24"
        viewBox="0 0 16 16" // Keep the viewBox as 16x16
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: "none" }}
      >
        <g transform="translate(0, 5)"> {/* Shift paths down by 6 units */}
          <motion.path
            variants={leftWingVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={rightWingVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.5 }}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    )
}

export default FAQarrow