export const toEnglishDigits = s => s.replace(/[^0-9.]/g, w =>
  ({ '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' })[w] || w);

export const toPersianDigits = n => String(n).replace(/[0-9]/g, w =>
  ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][+w]);
