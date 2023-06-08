import Sidebar from '@/components/ui/Sidebar/Sidebar'

import DefaultTemplate, { TemplateProps } from './Default.template'

export const AppTemplate = ({ children }: TemplateProps) => (
    <DefaultTemplate className="flex">
        <Sidebar />
        <main className="flex flex-col flex-1 min-h-screen py-10 overflow-hidden bg-neutral-100">
            <div className="px-4 sm:px-6 lg:px-8 h-full">{children}</div>
        </main>
        <dd className="fixed top-2 right-4 px-1 max-h-max rounded bg-neutral-50 bg-opacity-80 backdrop-blur-lg border border-neutral-200 font-mono opacity-50 shadow-sm text-neutral-400">
            <span className="text-[10px] leading-none">Prototype</span>
        </dd>
    </DefaultTemplate>
)
