import { ReactNode } from 'react'

export type TemplateProps = {
  children: ReactNode
  className?: string
}

const DefaultTemplate = ({ children, className }: TemplateProps) => <div className={className}>{children}   <dd className="fixed top-2 right-4 px-1 max-h-max rounded bg-neutral-50 bg-opacity-80 backdrop-blur-lg border border-neutral-200 font-mono opacity-50 shadow-sm text-neutral-400">
  <span className="text-[10px] leading-none">Prototype</span>
</dd></div>

export default DefaultTemplate
