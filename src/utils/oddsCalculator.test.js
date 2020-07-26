import {convertFractionalToDecimal} from './oddsCalculator';

describe('oddsCalculator', () => {
  describe('convertFractionalToDecimal', () => {
    it('should return 2.38 for 11/8', () => {
      expect(convertFractionalToDecimal(11, 8)).toBe(2.38);
    });
    it('should return 1.33 for 1/3', () => {
      expect(convertFractionalToDecimal(1, 3)).toBe(1.33);
    });
    it('returns 2 decimal places by default', () => {
      expect(convertFractionalToDecimal(34234, 123)).toBe(279.33);
    });
    it('returns 3 decimal places', () => {
      expect(convertFractionalToDecimal(34234, 123, 3)).toBe(279.325);
    });
  });
});
