import type { Vehicle } from '@/types/vehicle';
import type { SortOption } from '@/components/SortSelect/SortSelect';

export function sortVehicles(vehicles: Vehicle[], sortOption: SortOption): Vehicle[] {
  if (sortOption === 'default') return vehicles;

  const [field, order] = sortOption.split('_') as ['year' | 'price', 'asc' | 'desc'];
  return [...vehicles].sort((a, b) => {
    return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
  });
}
