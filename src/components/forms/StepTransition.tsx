'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface StepTransitionProps {
  children: ReactNode
  stepKey: string | number
  direction?: 'forward' | 'backward'
  className?: string
}

export default function StepTransition({ 
  children, 
  stepKey, 
  direction = 'forward',
  className = '' 
}: StepTransitionProps) {
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -300 : 300,
      opacity: 0
    })
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 