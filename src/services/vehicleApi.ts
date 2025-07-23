import type { Vehicle } from '@/types/vehicle';

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles';

export async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Не удалось загрузить список машин');
  return res.json();
}
