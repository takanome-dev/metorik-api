import ky_ from 'ky'

const ky = ky_.create({
    credentials: 'include',
    cache: 'no-store',
    hooks: {
        beforeRequest: [
            async (options) => {
                if (options.url.includes('sign-in')) {
                    return
                }

                const jwt = localStorage.getItem('jwt')
                if (!jwt) {
                    throw new Error('No JWT')
                }
                options.headers.set('Authorization', `Bearer ${jwt}`)
            },
        ],
        afterResponse: [
            async (request, options, response) => {
                const jwt = localStorage.getItem('jwt')
                if (jwt) {
                    const [, payload] = jwt.split('.')
                    const { exp } = JSON.parse(atob(payload))
                    const expirationDate = new Date(exp * 1000) // JWT timestamps are in seconds
                    const isTokenExpired = new Date() > expirationDate

                    if (isTokenExpired) {
                        localStorage.removeItem('jwt')
                        window.location.href = '/sign-in'
                    }
                    return
                }

                if (response.status === 401 && response.url.includes('sign-in') === false) {
                    localStorage.removeItem('jwt')
                    window.location.href = '/sign-in'
                }
            },
        ],
    },
})

export default ky
