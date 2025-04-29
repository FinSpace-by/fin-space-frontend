import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, Button, CircularProgress } from '@mui/material'
import BackButton from '@components/backButton/BackButton'
import { verificationApi, authApi } from '@api'
import { ROUTES } from '@constants'

import './sass/index.scss'

function ConfirmLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [code, setCode] = useState(['', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const inputsRef = useRef([])

  useEffect(() => {
    const storedEmail = localStorage.getItem('verificationEmail') || ''
    const storedPassword = localStorage.getItem('verificationPassword') || ''
    setEmail(storedEmail)
    setPassword(storedPassword)

    if (!storedEmail || !storedPassword) {
      navigate(ROUTES.REGISTRATION.PATH)
    }
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleResendCode = async () => {
    try {
      setLoading(true)
      verificationApi.sendCode(email)
      setTimeLeft(60)
      setCanResend(false)
    } catch (err) {
      setError('Не удалось отправить код')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmCode = async () => {
    const verificationCode = code.join('')
    if (verificationCode.length !== 4) return

    try {
      setLoading(true)
      await verificationApi.confirmCode(email, verificationCode)
      await authApi.register(email, password)
      navigate(ROUTES.CARDS.PATH)
      localStorage.removeItem('verificationEmail')
      localStorage.removeItem('verificationPassword')
    } catch (err) {
      setError('Неверный код подтверждения')
      setCode(['', '', '', ''])
      inputsRef.current[0].focus()
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      if (value && index < 3) {
        inputsRef.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4)
    if (/^\d{4}$/.test(pasteData)) {
      const newCode = pasteData.split('')
      setCode(newCode)
      inputsRef.current[3].focus()
    }
  }

  return (
    <div className='confirm__container'>
      <div className='confirm__header'>
        <Typography variant='h5' align='center' className='confirm__title'>
          Подтверждение входа
        </Typography>
        <BackButton className='confirm__back-button' />
      </div>

      <div className='confirm__code-inputs'>
        {code.map((digit, index) => (
          <input
            key={index}
            type='text'
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[index] = el)}
            maxLength={1}
            className='confirm__code-input'
            autoFocus={index === 0}
          />
        ))}
      </div>

      <Typography variant='body1' align='center' className='confirm__instruction'>
        Для подтверждения входа введите 4-значный код, который был отправлен на почту
      </Typography>

      {error && <Typography className='confirm__error-message'>{error}</Typography>}

      <div className='confirm__add-button-container'>
        <Button
          variant='contained'
          className='confirm__add-button'
          onClick={handleConfirmCode}
          disabled={code.some((digit) => digit === '') || loading}
        >
          {loading ? <CircularProgress size={24} color='inherit' /> : 'Подтвердить'}
        </Button>
      </div>

      <div className='confirm__resend'>
        {canResend ? (
          <Button
            variant='text'
            onClick={handleResendCode}
            className='confirm__resend-button'
            disabled={loading}
          >
            Отправить код повторно
          </Button>
        ) : (
          <Typography variant='body2' className='confirm__timer'>
            Повторно отправить код можно будет через {timeLeft} сек.
          </Typography>
        )}
      </div>
    </div>
  )
}

export default ConfirmLogin
