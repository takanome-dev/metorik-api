import { act, render, screen } from '@testing-library/react'

import Home from '@/pages'

describe('Home', () => {
    it('should render', () => {
        render(<Home />)
    })

    it('should show the Nextros heading', () => {
        act(() => {
            render(<Home />)
        })

        const heading = screen.getByRole('heading', { name: /Nextros/i })

        expect(heading).toBeInTheDocument()
    })
})
