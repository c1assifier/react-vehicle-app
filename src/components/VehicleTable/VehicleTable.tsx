import type { Vehicle } from '@/types/vehicle';
import styles from './VehicleTable.module.css';

interface Props {
  vehicles: Vehicle[];
}

export default function VehicleTable({ vehicles }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Марка</th>
          <th>Модель</th>
          <th>Год</th>
          <th>Цвет</th>
          <th>Цена ($)</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v) => (
          <tr key={v.id}>
            <td>{v.name}</td>
            <td>{v.model}</td>
            <td>{v.year}</td>
            <td>{v.color}</td>
            <td>{v.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
