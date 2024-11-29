import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { IoShieldCheckmark } from "react-icons/io5";


function Opening({ classes }) {
    const points = ["Lowest rates", "Fastest service", "Quality guarantee"]
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
  
    const fadeIn = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    }

  return (
    <section
    className={classes.opening}
    
    >
        <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        >Fast and reliable services for the best rates on the Internet
        </motion.h1>
        <FirstParagraph classes={classes} />
        <SecondParagraph classes={classes} />
        <div>
          {points.map(point => (
              <p key={point}><IoShieldCheckmark /> {point}</p>
          ))}
        </div>
    </section>
  )
}

function FirstParagraph({ classes }) {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } },
  }

return (
  <motion.p
  className={classes.opening}
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={fadeIn}
  >
   Filing out immigration forms doesn’t have to be complicated or costly. Too often, lawyers charge excessive fees for straightforward paperwork, making the process unaffordable for many. Not to mention all the mistakes they tend to make out of carelessness which result in delays and needless stress for you.
  </motion.p>
)
}

function SecondParagraph({ classes }) {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  }

return (
  <motion.p
  className={classes.opening}
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={fadeIn}
  >
   We believe everyone deserves access to affordable immigration support. We simplify the application process, guiding you step-by-step to ensure your forms are completed accurately and on time. With our help, you can confidently handle your immigration paperwork without the high price tag, giving you peace of mind and clarity on your journey forward!
  </motion.p>
)
}

export default Opening