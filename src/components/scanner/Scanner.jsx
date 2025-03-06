import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'
import { ROUTES } from '@constants'

import './sass/index.scss'

function Scanner() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    startCamera()
    return () => stopCamera() 
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
    
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop()) 
    }
  }

  const handleArrow = () => {
    stopCamera() 
    navigate(-1)
  }

  const handleAdd = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    const imageBase64 = canvas.toDataURL('image/png');

    stopCamera()
    navigate(ROUTES.SCANNER_RESULTS.PATH) 
  }

  return (
    <div className='analitic__tabs__container'>
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Сканировать
        </Typography>
        <button className='arrow' onClick={handleArrow}></button>
      </div>

      <video ref={videoRef} autoPlay playsInline className='camera-feed' />
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <AddButtonWrapper onClick={handleAdd} />
    </div>
  )
}

export default Scanner
