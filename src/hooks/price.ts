export const calculatePrice = (amount: number, symbol: string) => {
  if (symbol === '$') {
    return `${symbol}${amount}`
  } else {
    return `${amount} ${symbol}`
  }
}
