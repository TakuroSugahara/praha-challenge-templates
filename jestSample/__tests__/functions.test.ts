import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from '../functions';
import {DatabaseMock} from '../util';
import {NameApiService} from '../nameApiService';

jest.mock('axios');
jest.mock('../util');
jest.mock('../nameApiService');

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

let databaseMock: jest.MockedClass<typeof DatabaseMock>;
describe('asyncSumOfArraySometimesZero', () => {
  beforeAll(() => {
    databaseMock = DatabaseMock as jest.MockedClass<typeof DatabaseMock>;
  });

  test('should success', async () => {
    databaseMock.mockImplementation(() => {
      return {
        save: jest.fn((data: number[]) => {}),
      };
    });
    const value = await asyncSumOfArraySometimesZero([1, 3, 5]);
    expect(value).toBe(9);
  });

  test('should fail', async () => {
    const databaseMock = DatabaseMock as jest.MockedClass<typeof DatabaseMock>;
    databaseMock.mockImplementation(() => {
      return {
        save: jest.fn((data: number[]) => {
          throw new Error('error');
        }),
      };
    });
    const value = await asyncSumOfArraySometimesZero([1, 3, 5]);
    expect(value).toBe(0);
  });
});

describe('getFirstNameThrowIfLong', () => {
  beforeAll(() => {
    const nameApiServiceMock = jest
      .spyOn(NameApiService.prototype, 'getFirstName')
      .mockResolvedValue('Takuro');
  });

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
