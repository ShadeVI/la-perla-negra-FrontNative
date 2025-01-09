export function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return fontSize + fontSize * multiplier;
}
export enum CURRENCIES {
  EURO = 'euro',
  POUNDS = 'pounds'
}
export function currenciesConverter(value: number , currency?: CURRENCIES){
  const valueToDoubleDecimal = value.toFixed(2)
  if ( currency === CURRENCIES.POUNDS ) {
    return `£ ${valueToDoubleDecimal}`
  }
  if ( currency === CURRENCIES.EURO ) {
    return `€ ${valueToDoubleDecimal}`
  }
  return `${valueToDoubleDecimal}`
}
