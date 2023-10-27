import React from 'react'

const Screen = ({ screenValue, currencyValue }) => {
  return (
    <div className="screen">
      <label className="screen__currencyLabel">{currencyValue}</label>
      <label className="screen__label">{screenValue}</label>
    </div>
  )
}

export default Screen
