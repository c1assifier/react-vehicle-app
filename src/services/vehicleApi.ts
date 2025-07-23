import type { Vehicle } from '@/types/vehicle';

const USE_LOCAL_MOCK = true; // Для gh-pages

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles';
const MOCK_URL = '/mocks/vehicles.json';

export async function fetchVehicles(): Promise<Vehicle[]> {
  const url = USE_LOCAL_MOCK ? MOCK_URL : API_URL;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Не удалось загрузить список машинок: ${res.status}`);
  }

  return res.json();
}
