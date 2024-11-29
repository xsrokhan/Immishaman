import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Modal from './Modal'
import { MdClose } from "react-icons/md"
import { PiPencilLineBold } from "react-icons/pi"
import { LuPencilLine } from "react-icons/lu"

// Mock data for reviews
const reviews = [
  { id: 1, rating: 5, name: "Talgat K.", text: "Absolutely love this product! It's a game-changer." },
  { id: 2, rating: 4, name: "Abbas A.", text: "Great value for money. Highly recommended!" },
  { id: 3, rating: 5, name: "Bahram G.", text: "Outstanding quality and excellent customer service." },
  { id: 4, rating: 4, name: "Kamila O.", text: "Very satisfied with my purchase. Will buy again." },
  { id: 5, rating: 3, name: "Alex T.", text: "Good product, but there's room for improvement." },
  { id: 6, rating: 5, name: "Javad K.", text: "Exceeded my expectations in every way!" },
]

function Reviews({ classes }) {
  const [openModal, setOpenModal] = useState(false)
  const [modalExitAnim, setModalExitAnim] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3) // Default to 3 visible cards on wider screens

  const [rating, setRating] = useState(5)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1)
      else if (window.innerWidth < 1024) setVisibleCards(2)
      else setVisibleCards(3) // 3 cards for larger screens
    }

    handleResize() // Call once initially to set the correct value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  function handleCloseModal() {
    setModalExitAnim(true)
    setTimeout(() => {
      setOpenModal(false)
      setModalExitAnim(false)
    }, 500)
}

  return (
    <section className={classes.reviews}>
      <div>
        <h1>Reviews</h1>
        < LuPencilLine onClick={() => setOpenModal(true)} />
      </div>
      <div className={classes.review_slider}>
        <motion.div
          className={classes.review_slider_track}
          animate={{ x: `calc(-${currentIndex * (100 / visibleCards)}%)` }}
          transition={{ duration: 0.5 }}
        >
          {reviews.concat(reviews.slice(0, visibleCards - 1)).map((review, index) => (
            <motion.div
              key={index}
              className={classes.review_card}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={classes.review_content}>
                <div className={classes.reviewer_name}>{review.name}</div>
                <div className={classes.review_stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${classes.star_icon} ${i < review.rating ? classes.filled_star : classes.empty_star}`}
                    />
                  ))}
                </div>
                <p className={classes.review_text}>{review.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className={classes.review_slider_dots}>
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`${classes.dot} ${index === currentIndex % reviews.length ? classes.active_dot : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      {openModal && 
        <Modal classes={classes} modalExitAnim={modalExitAnim}>
          <div className={classes.close_review_form} onClick={handleCloseModal}><MdClose /></div>
          <form className={classes.review_form}>
            <div>
              <input type="text" name="service_number" id="service_number" required />
              <label htmlFor="service_number">Service number</label>
            </div>
            <div>
              <input type="text" name="name" id="name" required />
              <label htmlFor="name">Name</label>
            </div>
            <div className={classes.star_container}>
              <Star onClick={() => setRating(1)} style={{fill: rating >= 1 ? "#ffc107": ""}} />
              <Star onClick={() => setRating(2)} style={{fill: rating >= 2 ? "#ffc107": ""}} /> 
              <Star onClick={() => setRating(3)} style={{fill: rating >= 3 ? "#ffc107": ""}} /> 
              <Star onClick={() => setRating(4)} style={{fill: rating >= 4 ? "#ffc107": ""}} /> 
              <Star onClick={() => setRating(5)} style={{fill: rating >= 5 ? "#ffc107": ""}} />
            </div>
            <textarea placeholder="Review" />
            <button type="submit">Submit</button>
          </form>
        </Modal>}
    </section>
  )
}


export default Reviews
