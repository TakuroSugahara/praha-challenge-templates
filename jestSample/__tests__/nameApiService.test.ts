import {NameApiService} from '../nameApiService';
import axios from 'axios';

jest.mock('axios');

describe('getFirstName', () => {
  test('should success', async () => {
    const nameApiService = new NameApiService();
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.get.mockResolvedValue({
      data: {
        first_name: 'ta',
      },
    });
    const name = await nameApiService.getFirstName();
    expect(name).toBe('ta');
  });

  test('should fail', async () => {
    const nameApiService = new NameApiService();
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.get.mockResolvedValue({
      data: {
        first_name: 'takuro',
      },
    });
    await expect(nameApiService.getFirstName()).rejects.toThrow(
      'firstName is too long!',
    );
  });
});
