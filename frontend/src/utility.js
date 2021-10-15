export const getStringPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
}  

export const getDate = (isoDate) => {
    return new Date(isoDate).toDateString().split(' ').slice(1).join(' ')
}