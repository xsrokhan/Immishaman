import React from 'react'
import classes from "./Contents.module.scss"
import Opening from './Opening'
import Services from './Services'
import About from './About'
import FAQ from './FAQ'
import Reviews from './Reviews'
import Contact from './Contact'

function Contents() {
  return (
    <div className={classes.contents}>
        <Opening classes={classes} />
        <Services classes={classes} />
        <FAQ classes={classes} />
        <Reviews classes={classes} />
        <Contact classes={classes} />
    </div>
  )
}

export default Contents