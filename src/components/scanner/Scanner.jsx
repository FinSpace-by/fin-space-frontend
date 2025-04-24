import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, CircularProgress } from '@mui/material'
import clsx from 'clsx'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'
import BackButton from '@components/backButton/BackButton'
import { ROUTES, SCAN_TYPES } from '@constants'
import { scannerApi } from '@api'

import './sass/index.scss'

function Scanner() {
  const location = useLocation()
  const scanType = location.state?.scanType || SCAN_TYPES.RECEIPT
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [loading, setLoading] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {}
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const handleAdd = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    const imageBase64 = canvas.toDataURL('image/png')
    setCapturedImage(imageBase64)

    const formData = await new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          const fd = new FormData()
          fd.append('file', blob, 'scan.jpg')
          resolve(fd)
        },
        'image/jpeg',
        0.9
      )
    })

    stopCamera()
    setLoading(true)

    try {
      let response
      if (scanType === SCAN_TYPES.QR) {
        try {
          response = await scannerApi.sendCode(formData)
          const qrResponse = response.data.choices[0]?.message?.content
          if (qrResponse) {
            try {
              const parsedData = JSON.parse(qrResponse)
              response.data = parsedData
            } catch (e) {
              console.error('Ошибка парсинга QR ответа:', e)
              response.data = { products: [] }
            }
          } else {
            response.data = { products: [] }
          }
        } catch (error) {
          response = { data: { products: [] } }
        }
      } else {
        response = await scannerApi.sendImage({ image: imageBase64 })
      }

      const productsList = response.data.products || []

      setProducts(productsList)

      navigate(ROUTES.SCANNER_RESULTS.PATH, {
        state: {
          items: productsList,
        },
      })
    } catch (error) {
      console.error('Ошибка обработки:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='scanner'>
      <div className='scanner__container'>
        <div className='scanner__header'>
          <Typography variant='h5' align='center' mb={3} fontSize={20}>
            Сканировать
          </Typography>
          <BackButton onClick={stopCamera} />
        </div>

        <div className='scanner__viewport'>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={clsx('camera-feed', { hidden: capturedImage })}
          />
          <div className='scanner__overlay'>
            <div className='scanner__frame'></div>
          </div>
        </div>

        <img
          src={capturedImage}
          alt='Снимок'
          className={clsx('captured-image', { hidden: !capturedImage })}
        />

        <canvas ref={canvasRef} className='hidden' />

        {loading ? (
          <div className='loading-overlay'>
            <CircularProgress size={80} thickness={6} />
            <Typography variant='body1' className='loading-text'>
              Обработка изображения...
            </Typography>
          </div>
        ) : (
          <AddButtonWrapper onClick={handleAdd} />
        )}
      </div>
    </div>
  )
}

export default Scanner
