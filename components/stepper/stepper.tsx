'use client'
import { useAnimate } from 'framer-motion'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { cn } from '@/utils/helpers'

const StyledStepper = styled.div<{ height: number; animationType: 'fade' | 'slide' }>`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  height: ${(prop) => prop.height}px;
  transition: ${(prop) => (prop.animationType === 'fade' ? 'opacity 1.5s ease' : 'none')};

  & > * {
    flex: 1 0 100%;
  }

  & > *:not(:first-of-type) {
    display: none;
  }

  & > .fade-enter {
    opacity: 0;
    display: block;
  }

  & > .fade-enter-active {
    opacity: 1;
  }

  & > .fade-exit {
    opacity: 1;
  }

  & > .fade-exit-active {
    opacity: 0;
  }
`

export interface StepperChildProps {
  current: number
  next: () => void
  prev: () => void
  totalSteps: number
  setStep?: (step: number) => void
}

interface StepperProps {
  children: ReactNode
  className?: string
  init: ({ current, next, prev, totalSteps, setStep }: StepperChildProps) => void
  animationType?: 'fade' | 'slide'
}

const Stepper: FC<StepperProps> = ({ children, className, init, animationType = 'slide' }) => {
  const [scope, animate] = useAnimate()
  const [activeChildHeight, setActiveChildHeight] = useState(0)
  const [cur, setCur] = useState(0)
  const total = React.Children.count(children)
  const nextBtn = useRef<HTMLButtonElement>(null)
  const prevBtn = useRef<HTMLButtonElement>(null)
  const [mount, setMount] = useState(false)

  const moveForward = () => {
    nextBtn.current?.click()
  }
  const moveBack = () => {
    prevBtn.current?.click()
  }
  const setStart = (step: number) => {
    setCur(step)
    init({
      current: step,
      next: moveForward,
      prev: moveBack,
      totalSteps: total,
      setStep: (step) => setStart(step)
    })
  }

  const handleNext = async () => {
    if (cur < total - 1) {
      if (animationType === 'slide') {
        await animate(
          scope.current.childNodes[cur + 1],
          { x: `-${(cur + 1 + 1) * 100}%`, display: 'none' },
          { duration: 0 }
        )
        await animate(
          scope.current.childNodes[cur],
          { x: '100%', opacity: 0, height: '0px' },
          { duration: 2 }
        )
        await animate(
          scope.current.childNodes[cur + 1],
          { x: `-${(cur + 1) * 100}%`, opacity: 1, display: 'block' },
          { duration: 2.1 }
        )
      } else if (animationType === 'fade') {
        await animate(
          scope.current.childNodes[cur + 1],
          { x: `-${(cur + 1 + 1) * 100}%`, display: 'none' },
          { duration: 0 }
        )
        await animate(
          scope.current.childNodes[cur],
          { x: '100%', opacity: 0, height: '0px' },
          { duration: 0 }
        )
        await animate(
          scope.current.childNodes[cur + 1],
          { x: `-${(cur + 1) * 100}%`, opacity: 1, display: 'block' },
          { duration: 0}
        )

        await animate(
          scope.current.childNodes[cur + 1],
          { opacity: 1 },
          { duration: 1 }
        )
        await animate(
          scope.current.childNodes[cur],
          {  opacity: 0 },
          { duration: 1 }
        )
        await animate(
          scope.current.childNodes[cur + 1],
          { opacity: 1, },
          { duration: 1 }
        )

      }

      setCur((prev) => prev + 1)
      init({
        current: cur + 1,
        next: moveForward,
        prev: moveBack,
        totalSteps: total,
        setStep: (step) => setStart(step)
      })
    }
  }

  const handlePrev = async () => {
    if (cur > 0) {
      if (animationType === 'slide') {
        await animate(
          scope.current.childNodes[cur],
          { x: `-${(cur + 1) * 100}%`, opacity: 1, display: 'block' },
          { duration: 1 }
        )
        await animate(
          scope.current.childNodes[cur - 1],
          { x: `-${(cur - 1) * 100}%`, opacity: 1, display: 'block', height: 'auto' },
          { duration: 2 }
        )
      } else if (animationType === 'fade') {
        await animate(
          scope.current.childNodes[cur],
          { x: `-${(cur + 1) * 100}%`, display: 'block' },
          { duration: 0 }
        )
        await animate(
          scope.current.childNodes[cur - 1],
          { x: `-${(cur - 1) * 100}%`, display: 'block', height: 'auto' },
          { duration: 0 }
        )

        await animate(
          scope.current.childNodes[cur],
          {opacity: 0 },
          { duration: 0.4 }
        )
        await animate(
          scope.current.childNodes[cur - 1],
          { opacity: 1 },
          { duration: 0.4 }
        )
      }

      setCur((prev) => prev - 1)
      init({
        current: cur - 1,
        next: moveForward,
        prev: moveBack,
        totalSteps: total,
        setStep: (step) => setStart(step)
      })
    }
  }

  useEffect(() => {
    init({
      current: cur,
      next: moveForward,
      prev: moveBack,
      totalSteps: total,
      setStep: (step) => setStart(step)
    })
  }, [])

  useEffect(() => {
    setMount(true)
  }, [])

  useEffect(() => {
    if (!mount) return
    setActiveChildHeight(scope.current.childNodes[cur]?.scrollHeight)
  }, [cur, mount, scope])

  if (!mount) {
    return null
  }

  return (
    <>
      <StyledStepper
        height={activeChildHeight}
        ref={scope}
        className={cn('no-s bg-transparent', className)}
        animationType={animationType}
      >
        {children}
      </StyledStepper>
      <button type="button" onClick={handlePrev} ref={prevBtn} className="hidden">
        Back
      </button>
      <button type="button" ref={nextBtn} className="hidden" onClick={handleNext}>
        Next
      </button>
    </>
  )
}

export default Stepper
