import { ReactNode } from 'react'
import { Button, Card } from '@tremor/react'

type BodyCardProps = {
    heading: string
    description: string
    header?: ReactNode
    children: ReactNode
}
const BodyCard = ({ heading, description, children, header }: BodyCardProps) => {
    return (
        <Card className="flex flex-col h-full ">
            <div className="flex w-full items-center">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl text-neutral-600 font-semibold">{heading}</h3>
                    <p className="text-sm text-neutral-400">{description}</p>
                </div>
                {header}
            </div>
            <hr className="w-full border-neutral-200 my-4" />
            {children}
        </Card>
    )
}

BodyCard.defaultProps = {
    heading: 'Heading',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
}

export default BodyCard
