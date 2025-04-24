import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import Joyride from 'react-joyride'
import { ROUTES } from '@constants'

import './sass/index.scss'

const AppTutorial = ({ isNewUser, onFinish }) => {
  const [isStartTutorial, setIsStartTutorial] = useState(true)
  const navigate = useNavigate()
  const TUTORIAL_STATUS = {
    FINISHED: 'finished',
    SKIPPED: 'skipped',
  }

  useEffect(() => {
    if (isStartTutorial) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isStartTutorial])

  const steps = [
    {
      content: (
        <div className='tutorial__welcome'>
          <h2 className='tutorial__welcome-title'>Добро пожаловать в FinSpace!</h2>
          <p className='tutorial__welcome-text'>
            Это приложение поможет тебе контролировать свои финансы
          </p>
        </div>
      ),
      placement: 'center',
      target: 'body',
      disableBeacon: true,
      spotlightPadding: 0,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001, // higher than nav menu
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>Это данные о твоём балансе</p>
        </div>
      ),
      target: '.header-container',
      placement: 'bottom',
      spotlightPadding: 0,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Это информация о твоих расходах и доходах, между ними можно переключаться
          </p>
        </div>
      ),
      target: '.expenses-income-sum',
      placement: 'bottom',
      spotlightPadding: 0,

      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Это информация о твоих расходах и доходах, между ними можно переключаться
          </p>
        </div>
      ),
      target: '.expenses-income-sum2',
      placement: 'bottom',
      spotlightPadding: 0,
      spotlightClicks: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Это информация о твоих расходах и доходах, между ними можно переключаться
          </p>
        </div>
      ),
      target: '.expenses-income-sum1',
      placement: 'bottom',
      spotlightPadding: 0,
      spotlightClicks: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Это диаграмма показывает, как много ты потратил или заработал в сравнении с другими
            днями
          </p>
          <p className='tutorial__step-text' style={{ marginTop: '10px' }}>
            Для смены типа диаграммы нажми на эту иконку слева сверху
          </p>
        </div>
      ),
      target: '.analitic-graphic',
      placement: 'top',
      spotlightPadding: 0,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        tooltip: {
          bottom: '80px',
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Эта диаграмма показывает, сколько по каким категориям было расходов или доходов
          </p>
        </div>
      ),
      target: '.analitic-graphic',
      placement: 'bottom',
      spotlightPadding: 0,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        tooltip: {
          bottom: '80px',
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Ниже можно найти подробную информацию по расходам и доходам. Она разделена на категории
          </p>
        </div>
      ),
      target: '.categories-container',
      placement: 'top',
      spotlightPadding: 0,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Для добавления дохода или расхода нажми на эту кнопку внизу
          </p>
        </div>
      ),
      target: '.mobile-menu__link--analitic',
      placement: 'top',
      spotlightPadding: 0,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      target: 'body',
      placement: 'center',
      spotlightPadding: 0,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>Добавить можно вручную или через сканирование чека</p>
        </div>
      ),
      target: '.grid',
      placement: 'top',
      spotlightPadding: 0,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            После сканирования можно увидеть полученную информацию
          </p>
          <p className='tutorial__step-text' style={{ marginTop: '10px' }}>
            Если что-то не так считалось, например название или категория, можно исправить
            неточности вручную
          </p>
        </div>
      ),
      target: '.analitic__tabContent',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            При добавлении вручную нужно выбрать, что ты хочешь добавить
          </p>
        </div>
      ),
      target: '.analitic__tab__category',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Когда добавляешь доход или расход, нужно ввести сумму и выбрать счёт
          </p>
        </div>
      ),
      target: '.analitic__tabContent',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Теперь нужно выбрать категорию, которая больше подходит под твой расход или доход
          </p>
        </div>
      ),
      target: '.analitic__tab__category',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      multiple: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Если никакая из предложенных категорий не подходит, можно добавить свою категорию
          </p>
        </div>
      ),
      target: '.analitic__tab__category',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      multiple: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Для перехода на вкладку счетов нажми на эту кнопку внизу
          </p>
        </div>
      ),
      target: '.mobile-menu__link--bills',
      placement: 'top',
      spotlightPadding: 0,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>Тут находятся все твои счета</p>
        </div>
      ),
      target: '.bill__content',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Можно отредактировать существующий или добавить новый
          </p>
        </div>
      ),
      target: '.bill__add-button-container',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            У счёта есть название, валюта и сумма, которая находится на нём
          </p>
        </div>
      ),
      target: '.add-bill-modal__content',
      placement: 'center',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>При нажатии на эту кнопку ты переходишь в настройки</p>
        </div>
      ),
      target: '.mobile-menu__link--profile',
      placement: 'top',
      spotlightPadding: 0,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
    {
      content: (
        <div>
          <p className='tutorial__step-text'>
            Если у тебя есть вопросы или замечания по недостаткам приложения, можешь связаться с
            нами здесь
          </p>
        </div>
      ),
      target: '.profile__item',
      placement: 'top',
      spotlightPadding: 10,
      disableBeacon: true,
      styles: {
        options: {
          overlayColor: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          arrowColor: 'transparent',
          zIndex: 1001,
        },
        buttonNext: {
          display: 'none',
        },
        buttonSkip: { display: 'none' },
      },
    },
  ]

  const [stepIndex, setStepIndex] = useState(0)

  return (
    <>
      <Joyride
        steps={steps}
        run={isStartTutorial}
        continuous={true}
        showSkipButton={true}
        autoStart={true}
        disableOverlayClose={true}
        hideBackButton={true}
        hideCloseButton={true}
        spotlightClicks={false}
        stepIndex={stepIndex}
        callback={(data) => {
          if (data.status === TUTORIAL_STATUS.FINISHED || data.status === TUTORIAL_STATUS.SKIPPED) {
            setIsStartTutorial(false)
            onFinish?.()
          } else if (data.index === 0 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(1)
            }, 3000)
          } else if (data.index === 1 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(2)
            }, 3000)
          } else if (data.index === 2 && data.action === 'update') {
            setTimeout(() => {
              const incomeButton = document.querySelector('.expenses-income-sum2')
              incomeButton.click()
              setStepIndex(3)
            }, 1000)
          } else if (data.index === 3 && data.action === 'update') {
            setTimeout(() => {
              const expensesButton = document.querySelector('.expenses-income-sum1')
              expensesButton.click()
              setStepIndex(4)
            }, 1000)
          } else if (data.index === 4 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(5)
            }, 1000)
          } else if (data.index === 5 && data.action === 'update') {
            setTimeout(() => {
              const changeChart = document.querySelector('.pie-chart-icon')
              changeChart.click()
              setStepIndex(6)
            }, 4000)
          } else if (data.index === 6 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(7)
            }, 3000)
          } else if (data.index === 7 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(8)
            }, 3000)
          } else if (data.index === 8 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(9)
              const analyticButton = document.querySelector('.mobile-menu__link--analitic')
              analyticButton.click()
            }, 3000)
          } else if (data.index === 9 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(10)
            }, 350)
          } else if (data.index === 10 && data.action === 'update') {
            localStorage.setItem('tutorialStep', '10')
            setTimeout(() => {
              const analyticButton = document.querySelector('.modal__close')
              if (analyticButton) {
                analyticButton.click()
                setTimeout(() => {
                  navigate(ROUTES.SCANNER_RESULTS.PATH, {
                    state: {
                      isTutorial: true,
                    },
                  })
                  setStepIndex(11)
                }, 1000)
              }
            }, 3000)
          } else if (data.index === 11 && data.action === 'update') {
            setTimeout(() => {
              navigate(ROUTES.MANUAL.PATH, {
                state: {
                  isTutorial: true,
                },
              })
              setStepIndex(12)
            }, 3000)
          } else if (data.index === 12 && data.action === 'update') {
            setTimeout(() => {
              navigate(ROUTES.ADD_EXPENSES_MANUAL.PATH, {
                state: {
                  isTutorial: true,
                },
              })
              setStepIndex(13)
            }, 3000)
          } else if (data.index === 13 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(14)
            }, 3000)
          } else if (data.index === 14 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(15)
            }, 3000)
          } else if (data.index === 15 && data.action === 'update') {
            setTimeout(() => {
              const billsButton = document.querySelector('.mobile-menu__link--bills')
              if (billsButton) {
                billsButton.click()
                setTimeout(() => {
                  setStepIndex(16)
                }, 1000)
              }
              setStepIndex(16)
            }, 3000)
          } else if (data.index === 16 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(17)
            }, 3000)
          } else if (data.index === 17 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(18)
            }, 3000)
          } else if (data.index === 18 && data.action === 'update') {
            setTimeout(() => {
              const addButton = document.querySelector('.bill__add-button')
              if (addButton) {
                addButton.click()
                setTimeout(() => {
                  setStepIndex(19)
                }, 1000)
              }
              setStepIndex(19)
            }, 3000)
          } else if (data.index === 19 && data.action === 'update') {
            setTimeout(() => {
              const closeButton = document.querySelector('.add-bill-modal__close')
              if (closeButton) {
                closeButton.click()
                setTimeout(() => {
                  const profileButton = document.querySelector('.mobile-menu__link--profile')
                  if (profileButton) {
                    profileButton.click()
                    setStepIndex(20)
                  }
                }, 1000)
              }
            }, 3000)
          } else if (data.index === 20 && data.action === 'update') {
            setTimeout(() => {
              setStepIndex(21)
            }, 3000)
          }
        }}
        styles={{
          options: {
            arrowColor: '#6054e4',
            backgroundColor: '#fff',
            primaryColor: '#6054e4',
            textColor: '#333',
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in-out',
          },
          tooltip: {
            borderRadius: 12,
            animation: 'fadeIn 0.5s ease-in-out',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            animation: 'fadeIn 0.3s ease-in-out',
          },
        }}
      />
      {isStartTutorial &&
        createPortal(
          <div className='tutorial__skip-button-container'>
            <button
              onClick={() => {
                setIsStartTutorial(false)
                onFinish?.()
              }}
              className='tutorial__styles-skip'
            >
              <span>
                Пропустить <span className='tutorial__styles-skip-arrow'>→</span>
              </span>
            </button>
          </div>,
          document.body
        )}
    </>
  )
}

export default AppTutorial
