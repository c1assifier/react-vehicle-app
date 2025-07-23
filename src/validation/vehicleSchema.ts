import * as yup from 'yup';

export const noLinksRegex = /^(?!.*(http:\/\/|https:\/\/|www\.|javascript:|data:|<|>)).*$/i;

export const brandRegex = /^[A-Za-zА-Яа-яЁё0-9\s'-]{2,32}$/u;

export const vehicleSchema = yup.object({
  name: yup
    .string()
    .required('Марка обязательна')
    .min(2, 'Слишком коротко')
    .max(32, 'Слишком длинно')
    .matches(brandRegex, 'Марка может содержать только буквы, цифры, пробелы, дефис, апостроф')
    .matches(noLinksRegex, 'Марка не должна содержать ссылки или скрипты'),
  price: yup
    .number()
    .typeError('Цена должна быть числом')
    .required('Цена обязательна')
    .integer('Цена должна быть целым числом')
    .min(10, 'Цена слишком маленькая (минимум 10)')
    .max(10_000_000, 'Цена слишком большая'),
});
