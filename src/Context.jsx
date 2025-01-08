import React, { createContext, useContext, useState, useEffect } from 'react'

export const Context = createContext()

function ContextProvider({ children }) {
    const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "en")

    const changeLang = (selectedLang) => {
        setLang(selectedLang)
        localStorage.setItem("lang", selectedLang)
    }

    return (
    <Context.Provider value={{ lang, changeLang }}>{children}</Context.Provider>
  )
}

export default ContextProvider