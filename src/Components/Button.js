import React from 'react'

const Button = ({ value, activeCurrency, onClick }) => {
  let cssClass = activeCurrency === value ? 'button button__disabled' : 'button'

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
