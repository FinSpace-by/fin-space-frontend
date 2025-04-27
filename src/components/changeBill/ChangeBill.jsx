import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { accountsApi } from '@api'
import './sass/index.scss'

const currencies = [
  { code: 'BYN', id: '5e052a1c-016d-4f20-b665-e579af2a7779' },
  { code: 'RUB', id: '6330a32e-f38e-4dea-9840-14c9bcd7938b' },
  { code: 'CNY', id: 'e4080dba-044d-412d-8041-4a664b27e9d9' },
  { code: 'EUR', id: 'be947657-8b76-4209-9cd1-52148d630f97' },
  { code: 'USD', id: 'f355f12d-09e2-4378-8bb1-0fd867dc8087' },
]

const ChangeBill = ({ isOpen, onClose, account }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (account) {
      setName(account.name)
      setAmount(account.balance.toString())
      const currency = currencies.find((c) => c.id === account.currency.id) || currencies[0]
      setSelectedCurrency(currency)
    }
  }, [account, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const body = {
      name,
      currencyId: selectedCurrency.id,
      balance: parseFloat(parseFloat(amount || 0).toFixed(2)),
    }

    try {
      if (account && account.id) {
        await accountsApi.changeAccount(account.id, body)
      }
      onClose()
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={clsx('add-bill-modal', { open: isOpen })}>
      <div className='add-bill-modal__content'>
        <button className='add-bill-modal__close' onClick={onClose} disabled={isLoading}></button>

        <form onSubmit={handleSubmit} className='add-bill-modal__form'>
          <div className='add-bill-modal__input-group'>
            <input
              type='text'
              placeholder='Название счёта'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='add-bill-modal__name-input'
              required
              disabled={isLoading}
            />
          </div>

          <div className='add-bill-modal__currencies'>
            {currencies.map((currency) => (
              <button
                key={currency.id}
                type='button'
                className={`add-bill-modal__currency-btn ${
                  selectedCurrency.id === currency.id ? 'add-bill-modal__currency-btn--active' : ''
                }`}
                onClick={() => setSelectedCurrency(currency)}
                disabled={isLoading}
              >
                <span>{currency.code}</span>
              </button>
            ))}
          </div>

          <div className='add-bill-modal__input-group'>
            <input
              type='number'
              placeholder='Сумма'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='add-bill-modal__amount-input'
              step='0.01'
              required
              disabled={isLoading}
            />
          </div>

          <button type='submit' className='add-bill-modal__submit-btn' disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangeBill
