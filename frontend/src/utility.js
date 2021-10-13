export const getStringPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
}  