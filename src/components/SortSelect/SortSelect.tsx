import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './SortSelect.module.css';

export type SortOption = 'default' | 'year_asc' | 'year_desc' | 'price_asc' | 'price_desc';

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'year_asc', label: 'Год по возрастанию' },
  { value: 'year_desc', label: 'Год по убыванию' },
  { value: 'price_asc', label: 'Цена по возрастанию' },
  { value: 'price_desc', label: 'Цена по убыванию' },
];

export default function SortSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel = OPTIONS.find((opt) => opt.value === value)?.label;

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => setOpen((o) => !o)}>
        {selectedLabel}
        <FiChevronDown className={`${styles.icon} ${open ? styles.open : ''}`} />
      </button>

      {open && (
        <ul className={styles.menu}>
          {OPTIONS.map((opt) => (
            <li
              key={opt.value}
              className={opt.value === value ? styles.active : ''}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
