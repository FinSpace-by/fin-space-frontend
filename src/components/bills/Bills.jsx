import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import BackButton from '@components/backButton/BackButton'
import { ICONS_MAP } from '@constants'
import { accountsApi } from '@api'
import AddBill from '@components/addBill/AddBill'
import './sass/index.scss'

function Bills() {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([])
  const [userId, setUserId] = useState(null)
  const [showAddBill, setShowAddBill] = useState(false)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await accountsApi.getAccounts()
        setAccounts(response)

        if (response.length > 0) {
          setUserId(response[0].userId)
        }
      } catch (err) {
        console.error('Ошибка загрузки счетов:', err)
      }
    }

    fetchAccounts()
  }, [])

  const handleAddBillClick = () => {
    setShowAddBill(false)
    setTimeout(() => setShowAddBill(true), 10)
  }

  const handleCloseAddBill = () => {
    setShowAddBill(false)
  }

  return (
    <div className='bill__container'>
      <div className='bill__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Счета
        </Typography>
        <BackButton />
      </div>

      <div className='bill__content-wrapper'>
        {accounts.map((account) => (
          <div className='bill__content' key={account.id}>
            <div className='bill__item'>
              <div className='bill__top-row'>
                <Typography variant='caption' className='bill__currency-label'>
                  {account.currency.name}
                </Typography>
                <img
                  src={ICONS_MAP.editButton}
                  alt='Редактировать'
                  className='bill__edit-icon'
                  onClick={() => navigate(`/edit-bill/${account.id}`)}
                />
              </div>
              <div className='bill__content-row'>
                <img src={ICONS_MAP.mainBill} alt={account.name} className='bill__icon' />
                <Typography variant='body1' className='bill__title'>
                  {account.name}
                </Typography>
                <Typography variant='body1' className='bill__amount'>
                  {account.balance.toFixed(1)} {account.currency.name}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bill__add-button-container'>
        <Button variant='contained' className='bill__add-button' onClick={handleAddBillClick}>
          + Добавить счёт
        </Button>
      </div>

      <AddBill isOpen={showAddBill} onClose={handleCloseAddBill} userId={userId} />
    </div>
  )
}

export default Bills
