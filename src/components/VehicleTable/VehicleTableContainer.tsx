import { observer } from 'mobx-react-lite';
import { vehicleStore } from '@/store/vehicleStore';
import VehicleTable from './VehicleTable';
import type { SortOption } from '@/components/SortSelect/SortSelect';

interface Props {
  sortOption: SortOption;
}

const VehicleTableContainer = observer(({ sortOption }: Props) => {
  const [field, order] = sortOption.split('_') as ['year' | 'price', 'asc' | 'desc'];

  const sortedVehicles = [...vehicleStore.vehicles].sort((a, b) =>
    order === 'asc' ? a[field] - b[field] : b[field] - a[field],
  );

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Удалить эту машину?');
    if (confirmed) {
      vehicleStore.vehicles = vehicleStore.vehicles.filter((v) => v.id !== id);
    }
  };

  return <VehicleTable vehicles={sortedVehicles} onDelete={handleDelete} />;
});

export default VehicleTableContainer;
