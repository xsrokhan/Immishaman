import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { IoShieldCheckmark } from "react-icons/io5"
import { LangProvider } from '../LangProvider'

const points = ["bp1", "bp2", "bp3"]

function Opening({ classes }) {
    const controls = useAnimation()
    const { ref, inView } = useInView({
      triggerOnce: true,    // Animation triggers only once
      threshold: 0.2,       // Adjusts when the animation should start (0.2 means when 20% of the component is in view)
    })
  
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])

    const fadeInBG = {
      hidden: { backgroundColor: "white" },
      visible: { backgroundColor: "rgb(244, 248, 249)", transition: { delay: 12.2, duration: 14.8 } } // rgb is needed for framer motion, otherwise transition fails
    }
  
    const fadeIn = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    }

  return (
    <motion.section
    className={classes.opening}
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={fadeInBG}
    >
        <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        ><LangProvider location="opening_heading" />
        </motion.h1>
        <FirstParagraph />
        <SecondParagraph />
        <div>
          {points.map((point, i) => (
              <BulletPoints point={point} index={i} key={point} />
          ))}
        </div>
    </motion.section>
  )
}

function FirstParagraph() {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    triggerOnce: true,    
    threshold: 0.2,      
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } }
  }

return (
  <motion.p
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={fadeIn}
  >
    <LangProvider location="opening_p1" />
  </motion.p>
)
}

function SecondParagraph() {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    triggerOnce: true,    
    threshold: 0.2,      
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  }

return (
  <motion.p
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={fadeIn}
  >
    <LangProvider location="opening_p2" />
  </motion.p>
)
}

function BulletPoints({ index, point }) {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    triggerOnce: true,    
    threshold: 0.2,      
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const popIn = {
    hidden: { scale: 0 },
    visible: { scale: 1 }
  }

return (
      <motion.p
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={popIn}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      ><IoShieldCheckmark /> <LangProvider location={point} />
      </motion.p>
)
}

export default Opening