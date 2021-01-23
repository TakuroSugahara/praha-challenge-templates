import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from '../functions';
import {DatabaseMock} from '../util';
import {NameApiService} from '../nameApiService';

jest.mock('../util', () => {
  return {
    DatabaseMock: jest.fn().mockImplementation(() => {
      return {
        save: (data: number[]) => {},
      };
    }),
  };
});

jest.mock('../NameApiService', () => {
  return {
    NameApiService: jest.fn().mockImplementation(() => {
      return {
        getFirstName: () => {
          return 'Takuro';
        },
      };
    }),
  };
});

describe('sumOfArray', () => {
  test('should success', () => {
    expect(sumOfArray([1, 3, 5])).toBe(9);
  });

  test('should fail', () => {
    expect(sumOfArray([2, 4, 6])).not.toBe(11);
  });
});

describe('asyncSumOfArray', () => {
  test('should success', async () => {
    const value = await asyncSumOfArray([1, 3, 5]);
    expect(value).toBe(9);
  });

  test('should fail', async () => {
    const value = await asyncSumOfArray([2, 4, 6]);
    expect(value).not.toBe(9);
  });
});

describe('asyncSumOfArraySometimesZero', () => {
  test('should success', async () => {
    const value = await asyncSumOfArraySometimesZero([1, 3, 5]);
    expect(value).toBe(9);
  });
});

describe('getFirstNameThrowIfLong', () => {
  test('should success', async () => {
    const value = await getFirstNameThrowIfLong(100);
    expect(value).toMatch('Takuro');
  });

  test('should fail', async () => {
    await expect(getFirstNameThrowIfLong(5)).rejects.toThrow(
      'first_name too long',
    );
  });
});
