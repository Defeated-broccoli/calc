import './App.css'
import Screen from './Components/Screen'
import Buttons from './Components/Buttons'
import Card from './Components/Card'
import Button from './Components/Button'
import Logo from './Components/Logo'
import { useState } from 'react'
import { fetchExchangeData } from './api/ExchangeRates'

const btnValues = [
  [7, 8, 9, '*'],
  [4, 5, 6, '/'],
  [1, 2, 3, '+'],
  [0, '.', '-', '='],
  ['C'],
]

const crtValues = ['PLN', 'EUR', 'USD', 'GBP']

function App() {
  const [screenValue, setScreenValue] = useState('')
  const [currency, setCurrency] = useState('PLN')

  const getExchangeData = async (code) => {
    try {
      const result = await fetchExchangeData(code)
      return result.rates[0].mid
    } catch (error) {
      console.error('Error occurred while fetching exchange rate')
    }
  }

  const handleCalculatorClick = (char) => {
    switch (char) {
      case '=':
        setScreenValue(eval(screenValue) + '')
        break
      case 'C':
        setScreenValue('')
        break
      case '*':
        if (
          !screenValue.endsWith('+') &&
          !screenValue.endsWith('-') &&
          !screenValue.endsWith('*') &&
          !screenValue.endsWith('/') &&
          !screenValue.endsWith('.')
        )
          setScreenValue(screenValue + char)
        break
      case '/':
        if (
          !screenValue.endsWith('+') &&
          !screenValue.endsWith('-') &&
          !screenValue.endsWith('*') &&
          !screenValue.endsWith('/') &&
          !screenValue.endsWith('.')
        )
          setScreenValue(screenValue + char)
        break
      case '+':
        if (
          !screenValue.endsWith('+') &&
          !screenValue.endsWith('-') &&
          !screenValue.endsWith('*') &&
          !screenValue.endsWith('/') &&
          !screenValue.endsWith('.')
        )
          setScreenValue(screenValue + char)
        break
      case '-':
        if (
          !screenValue.endsWith('+') &&
          !screenValue.endsWith('-') &&
          !screenValue.endsWith('*') &&
          !screenValue.endsWith('/') &&
          !screenValue.endsWith('.')
        )
          setScreenValue(screenValue + char)
        break
      case '.':
        if (
          !screenValue.endsWith('+') &&
          !screenValue.endsWith('-') &&
          !screenValue.endsWith('*') &&
          !screenValue.endsWith('/') &&
          !screenValue.endsWith('.')
        )
          setScreenValue(screenValue + char)
        break
      default:
        setScreenValue(screenValue + char)
    }
  }

  const handleConversionClick = async (code) => {
    const currentCurrencyToPLN =
      currency === 'PLN' ? 1 : await getExchangeData(currency)

    const newCurrencyToPLN = code === 'PLN' ? 1 : await getExchangeData(code)

    setScreenValue(
      (eval(screenValue) / currentCurrencyToPLN) * newCurrencyToPLN
    )

    setCurrency(code)
  }
  return (
    <div className="App">
      <Card>
        <Logo text="SERD" />
        <Screen value={screenValue} />
        <Buttons className="buttons">
          {btnValues.flat().map((btn, i) => (
            <Button
              value={btn}
              key={i}
              activeCurrency={currency}
              onClick={handleCalculatorClick}
            />
          ))}
        </Buttons>
        <Buttons className="conversionButtons">
          {crtValues.map((btn, i) => (
            <Button
              value={btn}
              key={i}
              activeCurrency={currency}
              onClick={handleConversionClick}
            />
          ))}
        </Buttons>
      </Card>
    </div>
  )
}

export default App
