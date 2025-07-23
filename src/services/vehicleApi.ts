import type { Vehicle } from '@/types/vehicle';

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles';
const MOCK_URL = '/mocks/vehicles.json'; // Для gh-pages

export async function fetchVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API недоступен');
    return await res.json();
  } catch (err) {
    console.warn('Ошибка при загрузке с API, загружаем мок-данные:', err);
    const mockRes = await fetch(MOCK_URL);
    if (!mockRes.ok) {
      throw new Error(`Ошибка при загрузке мок-данных: ${mockRes.status}`);
    }
    return await mockRes.json();
  }
}
