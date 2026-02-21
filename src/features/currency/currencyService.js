export const countryMap = { USD: "United States (USD)", BDT: "Bangladesh (BDT)", INR: "India (INR)", EUR: "Europe (EUR)", GBP: "UK (GBP)", JPY: "Japan (JPY)", AUD: "Australia (AUD)", CAD: "Canada (CAD)" };
export const fetchExchangeRates = async () => (await fetch('https://open.er-api.com/v6/latest/USD')).json();
