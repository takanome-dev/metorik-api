export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeInOut' },
}

export const fadeOut = {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 1 },
    transition: { duration: 0.2, ease: 'easeInOut' },
}
