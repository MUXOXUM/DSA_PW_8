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
node server.js
```

## Описание системы
Файлы роутов:
1. drugs.js: для управления лекарствами (6 эндпоинтов, включая поиск).
2. suppliers.js: для управления поставщиками (5 эндпоинтов).
3. orders.js: для управления заказами от аптек поставщикам (5 эндпоинтов).
4. pharmacies.js: для управления аптеками (6 эндпоинтов)
5. inventory.js: для управления инвентарем лекарств в аптеках (8 эндпоинтов, включая проверку сроков годности отсутствующих товаров и общей стоимости).

---

## `api_routes/drugs.js`

### Эндпоинты:

* `GET /api/drugs`
  Получить все лекарства.

* `POST /api/drugs`
  Создать новое лекарство.

* `GET /api/drugs/:id`
  Получить лекарство по ID.

* `PUT /api/drugs/:id`
  Обновить лекарство по ID.

* `DELETE /api/drugs/:id`
  Удалить лекарство по ID.

* `GET /api/drugs/search`
  Поиск лекарств (например, по названию).

---

## `api_routes/suppliers.js`

### Эндпоинты:

* `GET /api/suppliers`
  Получить всех поставщиков.

* `POST /api/suppliers`
  Создать нового поставщика.

* `GET /api/suppliers/:id`
  Получить поставщика по ID.

* `PUT /api/suppliers/:id`
  Обновить поставщика по ID.

* `DELETE /api/suppliers/:id`
  Удалить поставщика по ID.

---

## `api_routes/orders.js`

### Эндпоинты:

* `GET /api/orders`
  Получить все заказы.

* `POST /api/orders`
  Создать новый заказ.

* `GET /api/orders/:id`
  Получить заказ по ID.

* `PUT /api/orders/:id`
  Обновить заказ по ID.

* `DELETE /api/orders/:id`
  Удалить заказ по ID.

---

## `api_routes/inventory.js`

### Эндпоинты:

* `POST /api/inventory/pharmacies/:pharmacyId/drugs/:drugId`
  Добавить лекарство в инвентарь аптеки или обновить количество.

* `GET /api/inventory/pharmacies/:pharmacyId`
  Получить весь инвентарь для аптеки.

* `GET /api/inventory/pharmacies/:pharmacyId/drugs/:drugId`
  Получить конкретное лекарство из инвентаря аптеки.

* `PUT /api/inventory/pharmacies/:pharmacyId/drugs/:drugId`
  Обновить информацию о лекарстве в инвентаре (например, количество, срок годности).

* `DELETE /api/inventory/pharmacies/:pharmacyId/drugs/:drugId`
  Удалить лекарство из инвентаря аптеки.

* `GET /api/inventory/pharmacies/:pharmacyId/expired`
  Получить список лекарств с истекшим сроком годности для аптеки.

* `GET /api/inventory/pharmacies/:pharmacyId/outofstock`
  Получить список отсутствующих (количество = 0) лекарств для аптеки.

* `GET /api/inventory/pharmacies/:pharmacyId/value`
  Получить общую стоимость инвентаря для аптеки.
