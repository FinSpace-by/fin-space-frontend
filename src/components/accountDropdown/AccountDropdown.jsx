import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { accountsApi } from '@api'

import './sass/index.scss'

function AccountDropdown({ selectedAccount, onAccountSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await accountsApi.getAccounts()
        if (response && Array.isArray(response)) {
          setAccounts(response)
        }
      } catch (error) {
        console.error('Error fetching accounts:', error)
      }
    }

    fetchAccounts()
  }, [])

  const handleAccountSelect = (account, e) => {
    e.stopPropagation()
    onAccountSelect(account)
    setIsDropdownOpen(false)
  }

  return (
    <>
      <div className='analitic__tabContent__header'>
        <Typography variant='h5' fontSize={17}>
          Счёт
        </Typography>
      </div>
      <div className='account-dropdown' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className='selected-account'>
          {selectedAccount ? selectedAccount.name : 'Выберите счёт'}
        </div>
        <span className='dropdown-arrow'>▼</span>
        {isDropdownOpen && (
          <div className='account-dropdown-menu'>
            {accounts.map((account) => (
              <div
                key={account.id}
                className='account-dropdown-item'
                onClick={(e) => handleAccountSelect(account, e)}
              >
                {account.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AccountDropdown
