import React, { useState, useEffect, useContext } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Modal from './Modal'
import { FaChevronDown } from "react-icons/fa6"
import { LangProvider } from '../LangProvider'
import { PlaceholderProvider } from '../LangProvider'
import { Context } from '../Context'

const optionsArray = [
    "I-90 | Application to Replace Permanent Resident Card",
    "I-102 | Application for Replacement/Initial Nonimmigrant Arrival-Departure Document",
    "I-129 | Petition for a Nonimmigrant Worker",
    "I-129CW | Petition for a CNMI-Only Nonimmigrant Transitional Worker",
    "I-129F | Petition for Alien Fiancé(e)",
    "I-130 | Petition for Alien Relative",
    "I-131 | Application for Travel Documents, Parole Documents, and Arrival/Departure Records",
    "I-140 | Immigrant Petition for Alien Workers",
    "I-212 | Application for Permission to Reapply for Admission into the United States After Deportation or Removal",
    "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant",
    "I-407 | Record of Abandonment of Lawful Permanent Resident Status",
    "I-485 | Application to Register Permanent Residence or Adjust Status",
    "I-526 | Immigrant Petition by Alien Investor (Legacy)",
    "I-539 | Application to Extend/Change Nonimmigrant Status",
    "I-589 | Application for Asylum and Withholding of Removal",
    "I-600 | Petition to Classify Orphan as an Immediate Relative",
    "I-600A | Application for Advance Processing of an Orphan Petition",
    "I-601 | Application for Waiver of Grounds of Inadmissibility",
    "I-601A | Application for Provisional Unlawful Presence Waiver",
    "I-612 | Application for Waiver of the Foreign Residence Requirement (under Section 212(e) of the Immigration and Nationality Act, as Amended)",
    "I-730 | Refugee/Asylee Relative Petition",
    "I-751 | Petition to Remove Conditions on Residence",
    "I-765 | Application for Employment Authorization",
    "I-765V | Application for Employment Authorization for Abused Nonimmigrant Spouse",
    "I-800 | Petition to Classify Convention Adoptee as an Immediate Relative",
    "I-800A | Application for Determination of Suitability to Adopt a Child from a Convention Country",
    "I-817 | Application for Family Unity Benefits",
    "I-821 | Application for Temporary Protected Status",
    "I-821D | Consideration of Deferred Action for Childhood Arrivals",
    "I-824 | Application for Action on an Approved Application or Petition",
    "I-829 | Petition by Entrepreneur to Remove Conditions on Permanent Resident Status",
    "I-864 | Affidavit of Support",
    "I-914 | Application for T Nonimmigrant Status",
    "I-918 | Petition for U Nonimmigrant Status",
    "I-929 | Petition for Qualifying Family Member of a U-1 Nonimmigrant",
    "I-956 | Application for Regional Center Designation",
    "I-956F | Application for Approval of an Investment in a Commercial Enterprise",
    "N-400 | Application for Naturalization",
    "N-565 | Application for Replacement Naturalization/Citizenship Document",
    "N-600 | Application for Certificate of Citizenship",
    "N-600K | Application for Citizenship and Issuance of Certificate Under Section 322",
    "Translation",
    "Something else"
  ]

function Contact({ classes }) {
    const [options, setOptions] = useState(optionsArray)
    const [openModal, setOpenModal] = useState(false)
    const [modalExitAnim, setModalExitAnim] = useState(false)
    const [selectedService, setSelectedService] = useState("")
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(false)

    const { lang } = useContext(Context) 

    const controls = useAnimation()
    const { ref, inView } = useInView({
      triggerOnce: true,    // Animation triggers only once
      threshold: 0.1,       // Adjusts when the animation should start (0.2 means when 20% of the component is in view)
    })
  
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])
  
    const fadeIn = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    }

    const fadeInForm = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, delay: 0.4 } },
      }

    function handleServiceSelection(option) {
        const selectedOption = option
        const newOptions = options.filter(o => o != selectedOption)
        setOptions([selectedOption, ...newOptions])
    }

    function handleCloseModal(val) {
        setSelectedService(val)
        setModalExitAnim(true)
        handleServiceSelection(val)
        setTimeout(() => {
          setOpenModal(false)
          setModalExitAnim(false)
        }, 500)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSending(true)

        const formData = new FormData(e.target)
        const object = Object.fromEntries(formData.entries())
        const json = JSON.stringify(object)

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            const data = await response.json()
            if (response.status === 200) {
                setSent(true)
            } else {
                console.error(data.message)
                setError(true)
            }
        } catch (error) {
            console.error("Error:", error)
            setError(true)
        } finally {
            setSending(false)
        }
    }

  return (
    <section className={classes.contact}>
          <motion.h1
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeIn}
          >
            <LangProvider location="contact_heading" />
          </motion.h1>
        <motion.form onSubmit={handleSubmit}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInForm}
        >
            <input type="hidden" name="access_key" value="ba9e8651-e790-4498-ba88-d516c5ec74aa" />
            <input type="hidden" name="subject" value="New Submission from Web3Forms" />
            <div className={classes.f_and_lname}>
                <div>
                    <input type="text" name="fname" id="fname" required />
                    <label htmlFor="fname"><LangProvider location="fname" /></label>
                </div>
                <div>
                    <input type="text" name="lname" id="lname" required />
                    <label htmlFor="lname"><LangProvider location="lname" /></label>
                </div>
            </div>
            <div>
                <input type="email" name="email" id="email" required />
                <label htmlFor="email"><LangProvider location="email" /></label>
            </div>
            <div className={classes.service} onClick={() => setOpenModal(true)}>
                <input type="text" name="service" id="service" value={selectedService} onChange={() => null} required />
                <label htmlFor="service"><LangProvider location="service" /></label>
                <span><FaChevronDown /></span>
            </div>
            <div>
                <input type="text" name="refnum" id="refnum" required />
                <label htmlFor="refnum"><LangProvider location="ref_num" /></label>
            </div>
            {selectedService === "Something else" && <textarea placeholder={PlaceholderProvider({ lang, location: "msg" })} name="message" required/>}
            {sent && <div className={classes.msg}><LangProvider location="sent" /></div>}
            {error && <div className={classes.msg}><LangProvider location="error" /></div>}
            <button type="submit" style={{pointerEvents: (sending || sent ? "none": "auto")}}>{(!sending && !sent) ? <LangProvider location="submit" /> : sending ? <i className={`fa-solid fa-spinner fa-spin`}></i> : <i className={`fa-solid fa-check`}></i>}</button>
        </motion.form>
        {openModal && 
        <Modal classes={classes} modalExitAnim={modalExitAnim}>
            <h3><LangProvider location="choose_service" /></h3>
            <ul>{options.map((option, i) => (
                <li key={option} onClick={() => handleCloseModal(option)} style={{color: (i === 0 && selectedService) && "white", backgroundColor: (i === 0 && selectedService) && "#122d57"}}>{option}</li>
            ))}
            </ul>
        </Modal>}
    </section>
  )
}

export default Contact