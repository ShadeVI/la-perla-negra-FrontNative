export function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return fontSize + fontSize * multiplier;
}

// Un enum è un tipo di dato che rappresenta un insieme di valori costanti, solitamente associati a nomi simbolici.
// CURRENCIES è il nome dell'enum.
export enum CURRENCIES {
  EURO = 'euro',
  POUNDS = 'pounds'
}

// Si può usare il nome CURRENCIES per dichiarare in typeScript il "tipo di dati" che deve accettare currency .
// I valori al parametro currency arrivano dal file DetailDish : {floatTwo(details.price, CURRENCIES.EURO)}
// Impostando con currency? si imposterebbe il valore come opzionale quindi nel componente troverò :
// {currenciesConverter(details.price)}
// Serve per evitare che vengano passati valori errati al parametro, come nel caso di errori di battitura.


export function currenciesConverter(value: number , currency?: CURRENCIES){
  const valueToDoubleDecimal = value.toFixed(2)
  if ( currency === CURRENCIES.POUNDS ) {
    return `£ ${valueToDoubleDecimal}`
  }
  return `€ ${valueToDoubleDecimal}`
}

