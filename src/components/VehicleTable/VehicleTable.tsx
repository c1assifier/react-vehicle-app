import type { Vehicle } from '@/types/vehicle';
import styles from './VehicleTable.module.css';
import { FiTrash2, FiMapPin } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';
import { LuSettings2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface Props {
  vehicles: Vehicle[];
  onDelete: (id: number) => void;
}

export default function VehicleTable({ vehicles, onDelete }: Props) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Марка</th>
            <th>Модель</th>
            <th>Год</th>
            <th>Цена ($)</th>
            <th>
              <div className={styles.iconHeader}>
                <LuSettings2 />
              </div>
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
              <td>
                <div className={styles.actions}>
                  <Link to={`/vehicles/${v.id}/edit`} title="Редактировать">
                    <MdModeEdit />
                  </Link>
                  <button onClick={() => onDelete(v.id)} title="Удалить">
                    <FiTrash2 />
                  </button>
                  <Link to={`/map?id=${v.id}`} title="Показать на карте">
                    <FiMapPin />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
