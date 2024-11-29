import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FAQarrow from './FAQarrow'

const defaultState = {
    "1": false,
    "2": false,
    "3": false
  }
  
function FAQ({ classes }) {

    const faq = [
        {
          question: "Lorem ipsum blabla bla?",
          answer: "answer"
        },
        {
          question: "question",
          answer: "answer"
        },
        {
          question: "question",
          answer: "answer"
        }
      ]

  return (
    <section className={classes.faq}>
      <h1>FAQ</h1>
      <div className={classes.faq_outer_container}>
        <div className={classes.faq_container}>
          {faq.map((item, index) => (
            <AnimatedQuestion
              key={index}
              item={item}
              index={index}
              classes={classes}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedQuestion({ item, index, classes }) {
  const [isOpen, setIsOpen] = useState(defaultState)

  function handleState(e) {
    const selected = e.target.className.slice(-1)
    setIsOpen({...defaultState, [selected]: !isOpen[selected]})
  }

  const controls = useAnimation()
  const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
  });

  useEffect(() => {
      if (inView) {
          controls.start("visible")
      }
  }, [controls, inView])

  const questionVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
  };

  return (
      <motion.div
          ref={ref}
          className={classes.question_container}
          initial="hidden"
          animate={controls}
          variants={questionVariants}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          style={{ backgroundColor: isOpen[index + 1] ? "#122d57" : "#f4f8f9"}}
      >
          <div
              className={`${classes.question} ${index + 1}`}
              onClick={handleState}
              style={{ color: isOpen[index + 1] ? "white" : "#122d57" }}
          >
              <span style={{ pointerEvents: "none" }}>{item.question}</span>
              <FAQarrow isOpen={isOpen[index + 1]} />
          </div>
          <div
              className={classes.answer_container}
              aria-hidden={!isOpen[index + 1]}
              style={{ color: isOpen[index + 1] ? "white" : "#1F2326" }}
          >
              <div>{item.answer}</div>
          </div>
      </motion.div>
  );
}

export default FAQ