import styles from './VehicleActions.module.css';

interface Props {
  onSort: (field: 'year' | 'price') => void;
}

export default function VehicleActions({ onSort }: Props) {
  return (
    <div className={styles.actions}>
      <span>Сортировка:</span>
      <button onClick={() => onSort('year')}>По году</button>
      <button onClick={() => onSort('price')}>По цене</button>
    </div>
  );
}
