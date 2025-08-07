// src\components\layout\footer.tsx

"use client";

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { SocialIcon } from 'react-social-icons'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]



function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-accent"
      defaultValue={theme}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            key={theme.id}
            className="inline-flex h-7 w-7 items-center justify-center text-secondary-foreground transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-secondary-foreground"
            type="button"
            aria-label={`Switch to ${theme.label} theme`}
            data-id={theme.id}
          >
            {theme.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}


export function Footer() {
    return (
    <footer className="mt-24 border-t border-border px-0 py-4 dark:border-border">
      <div className="flex items-center justify-between px-6">
        <a href="" target="_blank" rel="noopener noreferrer" className='max-w-1/3'>
          <TextLoop className="text-xs text-primary w-[161px]">
            <span>© 2025 444 Custom Print Hub.</span>
            <span>Built with Motion-Primitives.</span>
          </TextLoop>
        </a>
        <div className='flex flex-col gap-4 max-w-1/3 justify-center text-center items-center text-xs- text-primary'>
          <span>Committed to delivering excellence.</span>
          <div className='flex flex-row gap-2 justify-center items-center'>
            <SocialIcon rel="noopener noreferrer" target="_blank" url="https://www.facebook.com/444CustomPrintHub" label='444 Custom Print Hub' style={{ height: 28, width: 28}} bgColor={'var(--accent)'} fgColor={`var(--secondary-foreground)`}/>
            <SocialIcon rel="noopener noreferrer" target="_blank" url="https://www.tiktok.com/@444.custom.print.hub" label='444 Custom Print Hub' style={{ height: 28, width: 28 }} bgColor={'var(--accent)'} fgColor={`var(--secondary-foreground)`}/>
          </div>
        </div>
        <div className="max-w-1/3 text-xs text-primary">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  ) 
}