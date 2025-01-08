import React from 'react'
import { LangProvider } from '../LangProvider'

function Promo({ classes }) {
  return (
    <div className={classes.promo}>
        <h2>
            <LangProvider location="promo" />
        </h2>
    </div>
  )
}

export default Promo