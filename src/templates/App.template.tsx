import Sidebar from '@/components/ui/Sidebar/Sidebar'

import DefaultTemplate, { TemplateProps } from './Default.template'

export const AppTemplate = ({ children }: TemplateProps) => (
  <DefaultTemplate className="flex">
    <Sidebar />
    <main className="flex flex-col flex-1 min-h-screen py-10 overflow-hidden bg-neutral-100">
      <div className="px-4 sm:px-6 lg:px-8 h-full">{children}</div>
    </main>

  </DefaultTemplate>
)
