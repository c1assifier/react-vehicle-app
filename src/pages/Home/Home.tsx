import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { vehicleStore } from '@/store/vehicleStore';
import VehicleTable from '@/components/VehicleTable/VehicleTable';
import Container from '@/components/Container/Container';
import SortSelect, { type SortOption } from '@/components/SortSelect/SortSelect';
import { sortVehicles } from '@/utils/sortVehicles';
import styles from './Home.module.css';

const Home = observer(() => {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  useEffect(() => {
    if (vehicleStore.vehicles.length === 0) {
      vehicleStore.loadVehicles();
    }
  }, []);

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Удалить эту машину?');
    if (confirmed) {
      vehicleStore.removeVehicle(id);
    }
  };

  const sortedVehicles = sortVehicles(vehicleStore.vehicles, sortOption);

  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.title}>Список автомобилей</h1>
        <SortSelect value={sortOption} onChange={handleSortChange} />
      </div>

      {vehicleStore.isLoading && <p>Загрузка...</p>}
      {vehicleStore.error && <p>Ошибка: {vehicleStore.error}</p>}

      {!vehicleStore.isLoading && !vehicleStore.error && (
        <VehicleTable vehicles={sortedVehicles} onDelete={handleDelete} />
      )}
    </Container>
  );
});

export default Home;
