import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { accountsApi } from '@api'
import './sass/index.scss'

const currencies = [
  { code: 'BYN', id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
  { code: 'RUB', id: '3fa85f64-5717-4562-b3fc-2c963f66afa7' },
  { code: 'CNY', id: '3fa85f64-5717-4562-b3fc-2c963f66afa8' },
  { code: 'EUR', id: '3fa85f64-5717-4562-b3fc-2c963f66afa9' },
  { code: 'USD', id: '3fa85f64-5717-4562-b3fc-2c963f66afb0' },
]

const AddBill = ({ isOpen, onClose, userId }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      userId,
      name,
      currencyId: selectedCurrency.id,
      balance: parseFloat(amount) || 0,
    }

    try {
      const response = await accountsApi.createAccount(body)
      onClose()
    } catch (error) {}
  }

  return (
    <div className={clsx('add-bill-modal', { open: isOpen })}>
      <div className='add-bill-modal__content'>
        <button className='add-bill-modal__close' onClick={onClose}></button>

        <form onSubmit={handleSubmit} className='add-bill-modal__form'>
          <div className='add-bill-modal__input-group'>
            <input
              type='text'
              placeholder='Название счёта'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='add-bill-modal__name-input'
              required
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
            />
          </div>

          <button type='submit' className='add-bill-modal__submit-btn'>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBill
