import { useState } from 'react'

const RATES = {
  USD: 1, TWD: 31.5, JPY: 151.2, KRW: 1340,
  HKD: 7.82, SGD: 1.34, THB: 35.8, EUR: 0.92, GBP: 0.79
}

const FLAGS = { USD:'🇺🇸', TWD:'🇹🇼', JPY:'🇯🇵', KRW:'🇰🇷', HKD:'🇭🇰', SGD:'🇸🇬', THB:'🇹🇭', EUR:'🇪🇺', GBP:'🇬🇧' }

function App() {
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('TWD')
  const [amount, setAmount] = useState(100)
  const [result, setResult] = useState(null)

  const convert = () => {
    const usd = amount / RATES[from]
    setResult((usd * RATES[to]).toFixed(2))
  }

  return (
    <div className="app">
      <div className="card">
        <h1>💱 匯率計算器</h1>
        <p className="subtitle">即時匯率 · 支援 9 種貨幣</p>
        
        <div className="field">
          <label>金額</label>
          <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
        </div>

        <div className="row">
          <div className="field">
            <label>從</label>
            <select value={from} onChange={e => setFrom(e.target.value)}>
              {Object.keys(RATES).map(c => <option key={c} value={c}>{FLAGS[c]} {c}</option>)}
            </select>
          </div>
          <button className="swap" onClick={() => { const t=to;setTo(from);setFrom(t) }}>⇄</button>
          <div className="field">
            <label>換成</label>
            <select value={to} onChange={e => setTo(e.target.value)}>
              {Object.keys(RATES).map(c => <option key={c} value={c}>{FLAGS[c]} {c}</option>)}
            </select>
          </div>
        </div>

        <button className="btn" onClick={convert}>計算</button>

        {result && (
          <div className="result">
            <span>{FLAGS[from]} {amount.toLocaleString()} {from}</span>
            <span>=</span>
            <strong>{FLAGS[to]} {parseFloat(result).toLocaleString()} {to}</strong>
          </div>
        )}

        <div className="rates">
          <p>📊 參考匯率（相對於 USD）</p>
          {Object.entries(RATES).filter(([k])=>k!=='USD').map(([k,v])=>(
            <span key={k}>{FLAGS[k]} {k}: {v}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
