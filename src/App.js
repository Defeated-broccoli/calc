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

  //invokes api call which fetches entire response body
  const getExchangeData = async (code) => {
    try {
      const result = await fetchExchangeData(code)

      //take average exchange rate from response
      return result.rates[0].mid
    } catch (error) {
      console.error('Error occurred while fetching exchange rate')
    }
  }

  //here we handle all calculations
  //char is what we want to add to string or modify string if char is 'C' or '='
  //then we evaluate string, which executes it as if it's js
  //it probably safe as there shouldn't be any way to freely write in calculator string, only via buttons
  const handleCalculatorClick = (char) => {
    try {
      switch (char) {
        case '=':
          if (
            !screenValue.endsWith('+') &&
            !screenValue.endsWith('-') &&
            !screenValue.endsWith('*') &&
            !screenValue.endsWith('/') &&
            screenValue !== ''
          )
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
    } catch (error) {
      console.log(error)
    }
  }

  //here we handle all conversions
  const handleConversionClick = async (code) => {
    const currentCurrencyToPLN =
      currency === 'PLN' ? 1 : await getExchangeData(currency)
    const newCurrencyToPLN = code === 'PLN' ? 1 : await getExchangeData(code)

    //logic here is that, since we have only converting rates to and from PLN, we want to always get back to PLN in the middle of changing between two foreign currencies
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
