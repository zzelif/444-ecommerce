'use client'
import { cn } from '@/lib/utils'
import { AnimatePresence, Transition, motion } from 'motion/react'
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
  HTMLAttributes,
  MouseEventHandler,
} from 'react'

// Define the props that child elements should have
interface ChildProps extends HTMLAttributes<HTMLElement> {
  'data-id': string
  'data-checked'?: string
  className?: string
  children?: React.ReactNode
}

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<ChildProps>[]
    | ReactElement<ChildProps>
  defaultValue?: string
  onValueChange?: (newActiveId: string | null) => void
  className?: string
  transition?: Transition
  enableHover?: boolean
}

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const uniqueId = useId()

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id)

    if (onValueChange) {
      onValueChange(id)
    }
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue)
    }
  }, [defaultValue])

  return Children.map(children, (child: ReactElement<ChildProps>, index) => {
    const id = child.props['data-id']

    const interactionProps = enableHover
      ? {
          onMouseEnter: (() => handleSetActiveId(id)) as MouseEventHandler<HTMLElement>,
          onMouseLeave: (() => handleSetActiveId(null)) as MouseEventHandler<HTMLElement>,
        }
      : {
          onClick: ((e) => {
            e.preventDefault()
            handleSetActiveId(id)
          }) as MouseEventHandler<HTMLElement>,
        }

    return cloneElement(
      child,
      {
        ...child.props,
        key: index,
        className: cn('relative inline-flex', child.props.className),
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <div className="z-10">{child.props.children}</div>
      </>,
    )
  })
}