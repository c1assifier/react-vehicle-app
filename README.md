# ✅ Traektoria Test App

## 📖 Описание

**Traektoria Test App** — приложение, созданное для тестового задания в компанию "Траектория".
Это современная административная панель для управления автопарком:

- Просмотр списка автомобилей с сортировкой и поиском
- Редактирование и удаление данных
- Отображение всех машин на карте
- Валидация полей при редактировании

> **Примечание:** не коммитил каждый файл, чтобы не тратить лишний раз время.

---

## 🚀 Демо

🔗 [Посмотреть демо](https://c1assifier.github.io/react-vehicle-app/)

---

## ⚠️ Важно

- В проекте используется публичный API **только для чтения**.
- Редактирование и удаление работают **только на клиенте** — изменения не сохраняются на сервере и сбрасываются при обновлении страницы.
- Также Audi и Lexus имеют **одинаковые координаты**, что мешают отображению Audi на карте!

---

## 🛠️ Используемые технологии

- ⚛ **React** + **TypeScript**
- 🔄 **MobX** — управление состоянием
- 🧭 **React Router v6** — маршрутизация между страницами
- 🗺 **React-Leaflet** — отображение машин на карте
- 🎨 **CSS Modules** — модульные стили + адаптив
- 🧪 **Vitest** — тестирование
- 📦 **Barrel Files** и **Path Aliases** — удобные импорты
- 📝 **Yup** — валидация форм редактирования

---

## ⚡ Функциональность

- 📄 Таблица автомобилей с сортировкой по году и цене
- ➕ Редактирование данных автомобиля (name, price) с валидацией (`yup`)
- 🗑 Удаление автомобилей из таблицы
- 🗺 Просмотр всех автомобилей на карте (Leaflet, OpenStreetMap)
- 📍 Переход к точке на карте из таблицы, активный маркер выделяется
- ✏️ Быстрый переход к редактированию из попапа на карте
- 🧪 Покрытие функций тестами на Vitest

---
