import { observer } from 'mobx-react-lite';
import { vehicleStore } from '@/store/vehicleStore';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from './MapPage.module.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { defaultIcon, redIcon } from '@/constants/mapIcons';
import 'leaflet/dist/leaflet.css';

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 13, { animate: true });
    }
  }, [lat, lng, map]);
  return null;
}

const MapPage = observer(() => {
  const navigate = useNavigate();
  const vehicles = vehicleStore.vehicles;
  const [params] = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(null);

  // refs для popup
  const markerRefs = useRef<Record<string, L.Marker>>({});

  // 1. Ставим activeId по query-параметру или первой машине
  useEffect(() => {
    if (!vehicles.length) return;
    const idFromParams = params.get('id');
    if (idFromParams && vehicles.some((v) => String(v.id) === idFromParams)) {
      setActiveId(idFromParams);
    } else if (!activeId) {
      setActiveId(String(vehicles[0].id));
    }
    // eslint-disable-next-line
  }, [params, vehicles]);

  // 2. Открываем popup выбранного маркера
  useEffect(() => {
    if (activeId && markerRefs.current[activeId]) {
      markerRefs.current[activeId].openPopup();
    }
  }, [activeId]);

  // 3. Центр карты
  const focusVehicle = activeId ? vehicles.find((v) => String(v.id) === activeId) : vehicles[0];

  const center =
    focusVehicle && focusVehicle.latitude && focusVehicle.longitude
      ? [focusVehicle.latitude, focusVehicle.longitude]
      : [59.9343, 30.3351]; // СПб по умолчанию

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Автомобили на карте</span>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <FiArrowLeft style={{ marginRight: 6 }} />
          Назад
        </button>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer
          center={center as [number, number]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {vehicles.map((v) => (
            <Marker
              key={v.id}
              position={[v.latitude, v.longitude]}
              icon={String(v.id) === activeId ? redIcon : defaultIcon}
              eventHandlers={{
                click: () => setActiveId(String(v.id)),
              }}
              ref={(ref) => {
                if (ref) markerRefs.current[String(v.id)] = ref;
              }}
            >
              <Popup>
                <span className={styles.popupTitle}>
                  <b>
                    {v.name} {v.model}
                  </b>
                </span>
                <br />
                Цена: <b>{v.price}</b>
                <br />
                <Link to={`/vehicles/${v.id}/edit`} className={styles.editLink}>
                  Редактировать
                </Link>
              </Popup>
            </Marker>
          ))}
          {focusVehicle && <FlyTo lat={focusVehicle.latitude} lng={focusVehicle.longitude} />}
        </MapContainer>
      </div>
    </div>
  );
});

export default MapPage;
