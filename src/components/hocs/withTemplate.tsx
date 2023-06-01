import { ComponentType } from 'react'

import { TemplateProps } from '@/templates/Default.template'

export default function withTemplate<P extends object>(
    Component: ComponentType<P>,
    Template: ComponentType<TemplateProps>
) {
    const displayName = Component.displayName || Component.name || 'Component'

    const WithTemplate = (props: P) => (
        <Template>
            <Component {...props} />
        </Template>
    )

    WithTemplate.displayName = `withTemplate(${displayName})`

    return WithTemplate
}
