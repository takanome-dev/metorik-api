import { ReactNode } from 'react'

export type TemplateProps = {
    children: ReactNode
    className?: string
}

const DefaultTemplate = ({ children, className }: TemplateProps) => <div className={className}>{children}</div>

export default DefaultTemplate
