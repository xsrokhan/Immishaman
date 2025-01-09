import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Modal from './Modal'
import { MdClose } from "react-icons/md"
import { LuPencilLine } from "react-icons/lu"
import { LangProvider } from '../LangProvider'
import { PlaceholderProvider } from '../LangProvider'
import { Context } from '../Context'

// Mock data for reviews
const reviews = [
  {
    id: 1,
    rating: 5,
    name: "Talgat K.",
    text: "Квалифицированные специалисты, помогли с оформлением всех документов.",
    date: "12/27/2023"
  },
  {
    id: 2,
    rating: 5,
    name: "Leonardo P.",
    text: "Servicio muy rápido y preciso, lo recomiendo 👍",
    date: "11/15/2023"
  },
  {
    id: 3,
    rating: 5,
    name: "Yusuf K.",
    text: "Başvurum çok hızlı bir şekilde onaylandı, teşekkürler!",
    date: "10/26/2023"
  },
  {
    id: 4,
    rating: 5,
    name: "Paula B.",
    text: "Un servicio excelente, nos ayudaron mucho.",
    date: "09/08/2023"
  },
  {
    id: 5,
    rating: 5,
    name: "Saul T.",
    text: "Gracias a ellos, mi proceso fue mucho más sencillo.",
    date: "08/29/2023"
  },
  {
    id: 6,
    rating: 5,
    name: "Nurslan A.",
    text: "Четко 👌",
    date: "07/02/2023"
  },
  {
    id: 7,
    rating: 5,
    name: "Kamila O.",
    text: "Быстро и дешево. Теперь для оформления документов даже адвокат не нужен.",
    date: "12/03/2023"
  },
    {
    id: 8,
    rating: 5,
    name: "Arya H.",
    text: "Kheyli mamnoon 🙏",
    date: "11/29/2023"
  },
    {
    id: 9,
    rating: 5,
    name: "Nusret S.",
    text: "İletişim çok kolaydı ve her zaman yardımcı oldular.",
    date: "10/11/2023"
  },
    {
    id: 10,
    rating: 5,
    name: "Rafael L.",
    text: "Excelente comunicación y seguimiento constante, gracias!",
    date: "09/22/2023"
  },
    {
    id: 11,
    rating: 5,
    name: "Juan P.",
    text: "Facilitaron todo el papeleo y me ahorraron mucho tiempo.",
    date: "08/05/2023"
  },
    {
    id: 12,
    rating: 5,
    name: "Сергей В.",
    text: "Оформили документы на всю семью за один день, всем рекомендую!",
    date: "07/18/2023"
  }
]

function Reviews({ classes }) {
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const [openAllReviewsModal, setOpenAllReviewsModal] = useState(false)
  const [modalExitAnim, setModalExitAnim] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3) // Default to 3 visible cards on wider screens

  const [rating, setRating] = useState(5)
  const [incorrectRefnum, setIncorrectRefnum] = useState(false)

  const { lang } = useContext(Context) 
  
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.slice(0, 4).length)
    }, 4000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  function handleCloseModal() {
    setModalExitAnim(true)
    setTimeout(() => {
      setOpenReviewModal(false)
      setOpenAllReviewsModal(false)
      setModalExitAnim(false)
      setIncorrectRefnum(false)
    }, 500)
}

function handleSubmitReview(event) {
  event.preventDefault()
  setIncorrectRefnum(true)
}

  return (
    <section className={classes.reviews}>
      <div>
        <h1 onClick={() => setOpenAllReviewsModal(true)}><LangProvider location="reviews_heading" /></h1>
        < LuPencilLine onClick={() => setOpenReviewModal(true)} />
      </div>
      <div className={classes.review_slider}>
        <motion.div
          className={classes.review_slider_track}
          animate={{ x: `calc(-${currentIndex * (100 / visibleCards)}%)` }}
          transition={{ duration: 0.5 }}
        >
          {reviews.slice(0, 6).map((review, index) => (
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
        {reviews.slice(0, 4).map((_, index) => (
          <button
            key={index}
            className={`${classes.dot} ${index === currentIndex % reviews.length ? classes.active_dot : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      {openReviewModal &&  
        <Modal classes={classes} modalExitAnim={modalExitAnim}>
          <div className={classes.close_review_form} onClick={handleCloseModal}><MdClose /></div>
          <form className={classes.review_form} onSubmit={handleSubmitReview}>
            <div>
              <input type="text" name="service_number" id="service_number" required />
              <label htmlFor="service_number"><LangProvider location="service_num"/></label>
              {incorrectRefnum && <div style={{color: "firebrick", position: "absolute", top: "120%"}}><LangProvider location="service_num_incorrect"/></div>}
            </div>
            <div className={classes.star_container}>
              <Star onClick={() => setRating(1)} style={{fill: rating >= 1 ? "#ffc107": ""}} />
              <Star onClick={() => setRating(2)} style={{fill: rating >= 2 ? "#ffc107": ""}} /> 
              <Star onClick={() => setRating(3)} style={{fill: rating >= 3 ? "#ffc107": ""}} /> 
              <Star onClick={() => setRating(4)} style={{fill: rating >= 4 ? "#ffc107": ""}} /> 
              <Star onClick={() => setRating(5)} style={{fill: rating >= 5 ? "#ffc107": ""}} />
            </div>
            <textarea placeholder={PlaceholderProvider({ lang, location: "review" })} />
            <button type="submit"><LangProvider location="submit" /></button>
          </form>
        </Modal>}
        {openAllReviewsModal &&  
        <Modal classes={classes} modalExitAnim={modalExitAnim}>
          <div className={classes.close_review_form} onClick={handleCloseModal}><MdClose /></div>
          <div className={classes.full_reviews_container}>
          {reviews.map((review, i)=> (
            <div key={i}>
              <h3>{review.name}</h3>
              <div className={classes.review_stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${classes.star_icon} ${i < review.rating ? classes.filled_star : classes.empty_star}`}
                    />
                  ))}
                </div>
              <p>{review.text}</p>
              <div className={classes.date}>{review.date}</div>
            </div>
          ))}
          </div>
        </Modal>}
    </section>
  )
}


export default Reviews
