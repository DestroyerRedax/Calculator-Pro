export const countryMap = {
  USD: "United States (USD)", BDT: "Bangladesh (BDT)", INR: "India (INR)", EUR: "European Union (EUR)", 
  GBP: "United Kingdom (GBP)", JPY: "Japan (JPY)", AUD: "Australia (AUD)", CAD: "Canada (CAD)", 
  CNY: "China (CNY)", SAR: "Saudi Arabia (SAR)", AED: "United Arab Emirates (AED)", 
  PKR: "Pakistan (PKR)", MYR: "Malaysia (MYR)", SGD: "Singapore (SGD)", KWD: "Kuwait (KWD)", 
  QAR: "Qatar (QAR)", BHD: "Bahrain (BHD)", OMR: "Oman (OMR)", TRY: "Turkey (TRY)", 
  RUB: "Russia (RUB)", BRL: "Brazil (BRL)", ZAR: "South Africa (ZAR)", KRW: "South Korea (KRW)",
  CHF: "Switzerland (CHF)", NZD: "New Zealand (NZD)", SEK: "Sweden (SEK)", NOK: "Norway (NOK)",
  SGD: "Singapore (SGD)", MXN: "Mexico (MXN)", HKD: "Hong Kong (HKD)"
};

export const fetchExchangeRates = async () => {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  return res.json();
};
