/**
 * @description Returns decimal odds given numerator and denominator of fractional odds.
 * @arg {number} numerator
 * @arg {number} denominator
 * @arg {number} decimalPlaces
 * @example
 * // return 1.33
 * convertFractionalToDecimal(1, 3)
 */
export const convertFractionalToDecimal = (numerator, denominator, decimalPlaces = 2) => {
  const result = (numerator + denominator) / denominator;
  return Number(Math.round(parseFloat(result + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
};

