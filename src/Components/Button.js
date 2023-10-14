import React from 'react'

const Button = ({ value, activeCurrency, onClick }) => {
  let cssClass = 'button'

  //buttons are generated dynamically, so if we wan't to color only some buttons, we need to do it here
  //can also be done by key
  if (value === '+' || value === '-' || value === '*' || value === '/') {
    cssClass += ' button__blue'
  }
  if (value === '=') {
    cssClass += ' button__red'
  }

  return (
    <button
      onClick={() => onClick(value)}
      className={cssClass}
      disabled={activeCurrency === value}
    >
      {value}
    </button>
  )
}

export default Button
