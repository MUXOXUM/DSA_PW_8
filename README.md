# API для управления аптеками

Тема: 71.API для управления аптеками — Управление данными о лекарствах и их наличием, требования:  
1.	При реализации API можно использовать свободный стек технологий;
2.	Для выполнения проекта необходимо реализовать ≈ 30 эндпоинтов на одного человека в команде. Эндпоинты должны содержать POST, GET, PUT, DELETE и др;
3.	70% написанных эндпоинтов должны иметь смысловую нагрузку;
4.	Во время выполнения корректности работы API необходимо реализовать автотестирование через Postman с использованием скриптов;

## Установка

```bash
cd server
npm install
```

## Запуск

```bash
cd server
node server.js
```

## Тестирование
В корне проекта лежит файл `DSA_PW_8.postman_collection.json` который необходимо импортировать в Postman

## Описание системы
Файлы роутов:
1. drugs.js: для управления лекарствами (6 эндпоинтов, включая поиск).
2. suppliers.js: для управления поставщиками (5 эндпоинтов).
3. orders.js: для управления заказами от аптек поставщикам (5 эндпоинтов).
4. pharmacies.js: для управления аптеками (6 эндпоинтов)
5. inventory.js: для управления инвентарем лекарств в аптеках (8 эндпоинтов, включая проверку сроков годности отсутствующих товаров и общей стоимости).

## API Endpoints

### Лекарства (`/api/drugs`)

#### GET /api/drugs
Получить список всех лекарств.
- **Response**: Массив объектов лекарств
- **Response Example**:
```json
[
  {
    "id": 1,
    "name": "Аспирин",
    "manufacturer": "Байер",
    "dosage": "500мг",
    "price": 150.50
  }
]
```

#### POST /api/drugs
Создать новое лекарство.
- **Request Body**:
  - `name` (обязательно): название лекарства
  - `manufacturer` (обязательно): производитель
  - `dosage`: дозировка
  - `price` (обязательно): цена
- **Response**: Созданный объект лекарства

#### GET /api/drugs/:id
Получить лекарство по ID.
- **Parameters**: `id` - ID лекарства
- **Response**: Объект лекарства или 404 если не найдено

#### PUT /api/drugs/:id
Обновить лекарство.
- **Parameters**: `id` - ID лекарства
- **Request Body**: Любые поля лекарства для обновления
- **Response**: Обновленный объект лекарства

#### DELETE /api/drugs/:id
Удалить лекарство.
- **Parameters**: `id` - ID лекарства
- **Response**: Удаленный объект лекарства

#### GET /api/drugs/search
Поиск лекарств по названию.
- **Query Parameters**: `name` - строка поиска
- **Response**: Массив найденных лекарств

### Поставщики (`/api/suppliers`)

#### GET /api/suppliers
Получить список всех поставщиков.
- **Response**: Массив объектов поставщиков
- **Response Example**:
```json
[
  {
    "id": 1,
    "name": "МедПоставка",
    "contactPerson": "Иван Иванов",
    "phone": "+7-999-123-4567",
    "email": "ivan@medpostavka.ru"
  }
]
```

#### POST /api/suppliers
Создать нового поставщика.
- **Request Body**:
  - `name` (обязательно): название компании
  - `contactPerson` (обязательно): контактное лицо
  - `phone`: телефон
  - `email`: email
- **Response**: Созданный объект поставщика

#### GET /api/suppliers/:id
Получить поставщика по ID.
- **Parameters**: `id` - ID поставщика
- **Response**: Объект поставщика или 404 если не найдено

#### PUT /api/suppliers/:id
Обновить поставщика.
- **Parameters**: `id` - ID поставщика
- **Request Body**: Любые поля поставщика для обновления
- **Response**: Обновленный объект поставщика

#### DELETE /api/suppliers/:id
Удалить поставщика.
- **Parameters**: `id` - ID поставщика
- **Response**: Удаленный объект поставщика

### Заказы (`/api/orders`)

#### GET /api/orders
Получить список всех заказов.
- **Response**: Массив объектов заказов
- **Response Example**:
```json
[
  {
    "id": 1,
    "pharmacyId": 1,
    "supplierId": 1,
    "items": [
      {
        "drugId": 1,
        "quantity": 100,
        "pricePerItem": 150.50
      }
    ],
    "orderDate": "2024-03-20T10:00:00Z",
    "expectedDeliveryDate": "2024-03-25",
    "status": "pending"
  }
]
```

#### POST /api/orders
Создать новый заказ.
- **Request Body**:
  - `pharmacyId` (обязательно): ID аптеки
  - `supplierId` (обязательно): ID поставщика
  - `items` (обязательно): массив товаров
    - `drugId`: ID лекарства
    - `quantity`: количество
    - `pricePerItem`: цена за единицу
  - `expectedDeliveryDate`: ожидаемая дата доставки
  - `status`: статус заказа
- **Response**: Созданный объект заказа

#### GET /api/orders/:id
Получить заказ по ID.
- **Parameters**: `id` - ID заказа
- **Response**: Объект заказа или 404 если не найдено

#### PUT /api/orders/:id
Обновить заказ.
- **Parameters**: `id` - ID заказа
- **Request Body**: Любые поля заказа для обновления
- **Response**: Обновленный объект заказа

#### DELETE /api/orders/:id
Отменить заказ.
- **Parameters**: `id` - ID заказа
- **Response**: Отмененный заказ (статус меняется на "cancelled")

### Аптеки (`/api/pharmacies`)

#### GET /api/pharmacies
Получить список всех аптек.
- **Response**: Массив объектов аптек
- **Response Example**:
```json
[
  {
    "id": 1,
    "name": "Аптека №1",
    "address": "ул. Ленина, 1",
    "phone": "+7-999-123-4567"
  }
]
```

#### POST /api/pharmacies
Создать новую аптеку.
- **Request Body**:
  - `name` (обязательно): название аптеки
  - `address` (обязательно): адрес
  - `phone`: телефон
- **Response**: Созданный объект аптеки

#### GET /api/pharmacies/:id
Получить аптеку по ID.
- **Parameters**: `id` - ID аптеки
- **Response**: Объект аптеки или 404 если не найдено

#### PUT /api/pharmacies/:id
Обновить аптеку.
- **Parameters**: `id` - ID аптеки
- **Request Body**: Любые поля аптеки для обновления
- **Response**: Обновленный объект аптеки

#### DELETE /api/pharmacies/:id
Удалить аптеку.
- **Parameters**: `id` - ID аптеки
- **Response**: Удаленный объект аптеки

#### GET /api/pharmacies/search
Поиск аптек.
- **Query Parameters**: `query` - строка поиска (по названию или адресу)
- **Response**: Массив найденных аптек

### Инвентарь (`/api/inventory`)

#### POST /api/inventory/pharmacies/:pharmacyId/drugs/:drugId
Добавить или обновить лекарство в инвентаре аптеки.
- **Parameters**:
  - `pharmacyId`: ID аптеки
  - `drugId`: ID лекарства
- **Request Body**:
  - `quantity` (обязательно): количество
  - `purchasePrice` (обязательно): закупочная цена
  - `expiryDate` (обязательно): срок годности
  - `batchNumber`: номер партии
- **Response**: Обновленный объект инвентаря

#### GET /api/inventory/pharmacies/:pharmacyId
Получить весь инвентарь аптеки.
- **Parameters**: `pharmacyId` - ID аптеки
- **Response**: Массив объектов инвентаря
- **Response Example**:
```json
[
  {
    "pharmacyId": 1,
    "drugId": 1,
    "quantity": 100,
    "purchasePrice": 150.50,
    "expiryDate": "2025-12-31",
    "batchNumber": "LOT123"
  }
]
```

#### GET /api/inventory/pharmacies/:pharmacyId/drugs/:drugId
Получить информацию о конкретном лекарстве в инвентаре.
- **Parameters**:
  - `pharmacyId`: ID аптеки
  - `drugId`: ID лекарства
- **Response**: Объект инвентаря или 404 если не найдено

#### PUT /api/inventory/pharmacies/:pharmacyId/drugs/:drugId
Обновить информацию о лекарстве в инвентаре.
- **Parameters**:
  - `pharmacyId`: ID аптеки
  - `drugId`: ID лекарства
- **Request Body**: Любые поля инвентаря для обновления
- **Response**: Обновленный объект инвентаря

#### DELETE /api/inventory/pharmacies/:pharmacyId/drugs/:drugId
Удалить лекарство из инвентаря.
- **Parameters**:
  - `pharmacyId`: ID аптеки
  - `drugId`: ID лекарства
- **Response**: Удаленный объект инвентаря

#### GET /api/inventory/pharmacies/:pharmacyId/expired
Получить список просроченных лекарств.
- **Parameters**: `pharmacyId` - ID аптеки
- **Response**: Массив просроченных лекарств

#### GET /api/inventory/pharmacies/:pharmacyId/outofstock
Получить список отсутствующих лекарств.
- **Parameters**: `pharmacyId` - ID аптеки
- **Response**: Массив лекарств с нулевым количеством

#### GET /api/inventory/pharmacies/:pharmacyId/value
Получить общую стоимость инвентаря.
- **Parameters**: `pharmacyId` - ID аптеки
- **Response**: Объект с общей стоимостью
- **Response Example**:
```json
{
  "pharmacyId": 1,
  "totalValue": 15050.00
}
```
