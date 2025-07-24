import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { vehicleStore } from '@/store/vehicleStore';
import Container from '@/components/Container/Container';
import styles from './EditVehiclePage.module.css';
import { vehicleSchema } from '@/validation/vehicleSchema';
import { ValidationError } from 'yup';

const EditVehiclePage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicleId = Number(id);
  const vehicle = vehicleStore.vehicles.find((v) => v.id === vehicleId);

  const [name, setName] = useState(vehicle?.name ?? '');
  const [price, setPrice] = useState(vehicle?.price ?? 0);
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  if (!vehicle) {
    return (
      <Container>
        <p>Машина не найдена</p>
      </Container>
    );
  }

  const handleSave = async () => {
    try {
      await vehicleSchema.validate({ name, price }, { abortEarly: false });
      setErrors({});
      vehicleStore.updateVehicle(vehicleId, { name, price });
      navigate('/');
    } catch (e) {
      if (e instanceof ValidationError) {
        const errObj: { name?: string; price?: string } = {};
        e.inner.forEach((err) => {
          if (err.path) errObj[err.path as 'name' | 'price'] = err.message;
        });
        setErrors(errObj);
      }
    }
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center', marginTop: 22, fontWeight: 700 }}>
        Редактировать: {vehicle.model}
      </h1>
      <form
        className={styles.formBox}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        noValidate
      >
        <label>
          Марка:
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
            spellCheck={false}
            maxLength={32}
          />
          {errors.name && (
            <div style={{ color: '#d82d27', fontSize: 13, marginTop: 2 }}>{errors.name}</div>
          )}
        </label>
        <label>
          Цена ($):
          <input
            className={styles.input}
            type="number"
            value={price}
            min={10}
            max={10_000_000}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
          {errors.price && (
            <div style={{ color: '#d82d27', fontSize: 13, marginTop: 2 }}>{errors.price}</div>
          )}
        </label>
        <div className={styles.buttonRow}>
          <button type="submit" className={styles.button}>
            Сохранить
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelBtn}`}
            onClick={() => navigate(-1)}
          >
            Отмена
          </button>
        </div>
      </form>
      <button
        type="button"
        className={styles.homeBtnFixed}
        onClick={() => navigate('/')}
        title="На главную"
      >
        На главную
      </button>
    </Container>
  );
});

export default EditVehiclePage;
