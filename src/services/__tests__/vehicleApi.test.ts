import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchVehicles } from '../vehicleApi';
import type { Vehicle } from '@/types/vehicle';

describe('fetchVehicles', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('возвращает массив машин при успешном запросе', async () => {
    const fakeVehicles: Vehicle[] = [
      {
        id: 1,
        name: 'Toyota',
        model: 'Camry',
        year: 2021,
        color: 'red',
        price: 21000,
        latitude: 55,
        longitude: 37,
      },
    ];

    const mockResponse: Partial<Response> = {
      ok: true,
      json: () => Promise.resolve(fakeVehicles),
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(mockResponse as Response)),
    );

    const data = await fetchVehicles();
    expect(data).toEqual(fakeVehicles);
  });

  it('при ошибке основного API возвращает моковые', async () => {
    const fakeMock: Vehicle[] = [
      {
        id: 2,
        name: 'Fake',
        model: 'Test',
        year: 2022,
        color: 'black',
        price: 9999,
        latitude: 0,
        longitude: 0,
      },
    ];

    const apiErrorResponse: Partial<Response> = { ok: false, status: 500 };
    const mockSuccessResponse: Partial<Response> = {
      ok: true,
      json: () => Promise.resolve(fakeMock),
    };

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockImplementationOnce(() => Promise.resolve(apiErrorResponse as Response))
        .mockImplementationOnce(() => Promise.resolve(mockSuccessResponse as Response)),
    );

    const data = await fetchVehicles();
    expect(data).toEqual(fakeMock);
  });

  it('кидает ошибку, если оба запроса провалилсь', async () => {
    const errorResponse: Partial<Response> = { ok: false, status: 500 };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => Promise.resolve(errorResponse as Response)),
    );

    await expect(fetchVehicles()).rejects.toThrow(/мок-данных/);
  });
});
