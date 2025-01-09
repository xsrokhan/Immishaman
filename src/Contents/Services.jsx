import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { LangProvider } from '../LangProvider'
import regular from "../assets/USCIS.png"
import premium from "../assets/USCIS_premium.png"
import family from "../assets/USCIS_family.png"
import ata from "../assets/ata.png"

function Services({ classes }) {
    const services = [
        {
            title: <LangProvider location="basic" />,
            desc: <LangProvider location="basic_txt" />,
            price: "100"
        },
        {
            title: <LangProvider location="premium" />,
            desc: <LangProvider location="premium_txt" />,
            price: "150"
        },
        {
            title: <LangProvider location="family" />,
            desc: <LangProvider location="family_txt" />,
            price: "320"
        },
        {
            title: <LangProvider location="translation" />,
            desc: <LangProvider location="translation_txt" />,
            price: <LangProvider location="translation_price" />
        }
    ]
    const controls = useAnimation()
    const { ref, inView } = useInView({
      triggerOnce: true,    // Animation triggers only once
      threshold: 0.05,       // Adjusts when the animation should start (0.2 means when 20% of the component is in view)
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
    <section className={classes.services}>
        <motion.h1
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeIn}
        >
            <LangProvider location="services_heading" />
        </motion.h1>
        <div className={classes.card_container}>
            {services.map((service, i) => (
                <AnimatedCard key={i} service={service} index={i} classes={classes} />
            ))}
        </div>
    </section>
  )
}

function AnimatedCard({ service, index, classes }) {
    const controls = useAnimation()
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjusts when the animation triggers
    })

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            ref={ref}
            className={classes.card}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            transition={{ delay: index * 0.1, duration: 0.5 }} // Stagger by index
        >
            <img src={index === 0 ? regular : index === 1 ? premium : index === 2 ? family : ata} style={{width: index !== 2 ? "80px" : "160px", height: "80px"}}/>
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
            {index !== 4 && <p className={classes.price}>$ {service.price}</p>}
        </motion.div>
    );
}

export default Services