import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { vehicleStore } from '@/store/vehicleStore';
import VehicleTable from '@/components/VehicleTable/VehicleTable';
import Container from '@/components/Container/Container';

const Home = observer(() => {
  useEffect(() => {
    vehicleStore.loadVehicles();
  }, []);

  return (
    <Container>
      <h1>Список автомобилей</h1>

      {vehicleStore.isLoading && <p>Загрузка...</p>}
      {vehicleStore.error && <p>Ошибка: {vehicleStore.error}</p>}

      {!vehicleStore.isLoading && !vehicleStore.error && (
        <VehicleTable vehicles={vehicleStore.vehicles} />
      )}
    </Container>
  );
});

export default Home;

//Позже накинуть компонент с картой, и про реакт айоны не забыть.
