import type { Vehicle } from '@/types/vehicle';
import styles from './VehicleTable.module.css';
import { FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';
import { LuSettings2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface Props {
  vehicles: Vehicle[];
  onDelete: (id: number) => void;
}

export default function VehicleTable({ vehicles, onDelete }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Марка</th>
          <th>Модель</th>
          <th>Год</th>
          <th>Цена ($)</th>
          <th>
            <LuSettings2 />
          </th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v) => (
          <tr key={v.id}>
            <td>{v.name}</td>
            <td>{v.model}</td>
            <td>{v.year}</td>
            <td>{v.price}</td>
            <td style={{ display: 'flex', gap: 8 }}>
              <Link to={`/vehicles/${v.id}/edit`} title="Редактировать">
                <FiEdit2 />
              </Link>
              <button onClick={() => onDelete(v.id)} title="Удалить">
                <FiTrash2 />
              </button>
              <Link to={`/map?id=${v.id}`} title="Показать на карте">
                <FiMapPin />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
