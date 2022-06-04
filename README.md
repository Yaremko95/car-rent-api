# Car rent API

## API Reference

#### Get all cars

```http
  GET /cars/
```

#### Get all car types

```http
  GET /cars/types
```

#### Get all car titles

```http
  GET /cars/titles
```

#### Get car passengers

```http
  GET /cars/passengers
```

#### Get car gearbox

```http
  GET /cars/gearbox
```

#### Get car fuelType

```http
  GET /cars/fuelType
```

#### Get car

```http
  GET /cars/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

| Query      | Type     | Example               |
| :--------- | :------- | :-------------------- |
| `titles`   | `string` | ?titles=Honda,Audi    |
| `types`    | `string` | types=hatchback,sedan |
| `gear`     | `string` | gear=manual           |
| `fuelType` | `string` | fuelType=petrol       |
| `search`   | `string` | search=au             |
| `sort`     | `string` | sort=price,ASC (DESC) |

#### Create car

```http
  POST /cars/${id}
```

```
{
    "title":"Toyota",
    "model": "Corolla Estate",
    "type": "hatchback",
    "discount": 15,
    "passengers":5,
    "consumption":8,
    "gearbox":"automatic",
    "fuelType":"petrol",
    "price":123.00
}
```

#### Update car

```http
  PUT /cars/${id}
```

Body:

```
{
    "fuelType":"petrol",
}
```

#### Delete car

```http
  DELETE /cars/${id}
```
