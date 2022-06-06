import express from "express";
import models from "../../db/models/index.js";
import { products } from "../../data.js";
import { Op, fn, col } from "sequelize";

const { Car } = models;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    res.send(car);
  } catch (error) {
    console.log(error);
  }
});

router.get("/types", async (req, res, next) => {
  try {
    const types = await Car.findAll({
      attributes: ["type"],
      group: "type",
    });
    res.send(types.map((t) => t.type));
  } catch (error) {
    console.log(error);
  }
});
router.get("/minMaxPrice", async (req, res, next) => {
  try {
    const minMax = await Car.findAll({
      attributes: [
        [fn("min", col("price")), "min"],
        [fn("max", col("price")), "max"],
      ],
    });
    res.send(minMax[0]);
  } catch (error) {
    console.log(error);
  }
});
router.get("/titles", async (req, res, next) => {
  try {
    const titles = await Car.findAll({
      attributes: ["title"],
      group: "title",
    });
    res.send(titles.map((t) => t.title));
  } catch (error) {
    console.log(error);
  }
});
router.get("/types", async (req, res, next) => {
  try {
    const types = await Car.findAll({
      attributes: ["type"],
      group: "type",
    });
    res.send(types.map((t) => t.type));
  } catch (error) {
    console.log(error);
  }
});
router.get("/passengers", async (req, res, next) => {
  try {
    const passengers = await Car.findAll({
      attributes: ["passengers"],
      group: "passengers",
      order: [["passengers", "ASC"]],
    });
    res.send(passengers.map((t) => t.passengers));
  } catch (error) {
    console.log(error);
  }
});
router.get("/gearbox", async (req, res, next) => {
  try {
    const gearbox = await Car.findAll({
      attributes: ["gearbox"],
      group: "gearbox",
    });
    res.send(gearbox.map((t) => t.gearbox));
  } catch (error) {
    console.log(error);
  }
});
router.get("/fuelType", async (req, res, next) => {
  try {
    const fuelType = await Car.findAll({
      attributes: ["fuelType"],
      group: "fuelType",
    });
    res.send(fuelType.map((t) => t.fuelType));
  } catch (error) {
    console.log(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const data = products.map((product) => {
      return {
        title: product.title,
        model: product.model,
        image: product.img,
        type: product.typeCar.toLowerCase(),
        discount: parseInt(product.discount.split("%")[0]),
        passengers: product.features[0].passengers,
        consumption:
          product.features[1].consumption.split(" ")[0] !== "N/A"
            ? parseInt(product.features[1].consumption.split(" ")[0])
            : 0,
        gearbox: product.features[2].gearbox.toLowerCase(),
        fuelType: product.features[3].fuelType.toLowerCase(),
        price: parseFloat(product.price.split("$")[0]),
      };
    });
    const cars = await Car.bulkCreate(data);
    res.send(cars);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.findAndCountAll({
      where: {
        ...(req.query.titles && {
          title: {
            [Op.in]: req.query.titles.split(","),
          },
        }),
        ...(req.query.types && {
          type: {
            [Op.in]: req.query.types.split(","),
          },
        }),
        ...(req.query.gear && {
          gearbox: {
            [Op.in]: req.query.gear.split(","),
          },
        }),
        ...(req.query.fuelType && {
          fuelType: {
            [Op.in]: req.query.fuelType.split(","),
          },
        }),
        // ...(req.query.price && {
        //   price: {
        //     [Op.between]: req.query.price.,
        //   },
        // }),

        ...(req.query.search && {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
            {
              model: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
            {
              type: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
          ],
        }),
      },

      ...(req.query.sort && { order: [req.query.sort.split(",")] }),
      limit: req.query.limit,
      offset: req.query.limit * req.query.offset,
    });
    console.log(cars);
    const data = cars.rows.map((car) => {
      return {
        id: car.id,
        image: car.image,
        title: car.title,
        model: car.model,
        typeCar: car.type,
        discount: car.discount,
        features: [
          { passengers: car.passengers },
          { consumption: `${car.consumption} LITERS/100 KM` },
          { gearbox: car.gearbox },
          { fuelType: car.fuelType },
        ],
        price: car.price,
      };
    });
    res.send({ data, total: Math.ceil(cars.count / req.query.limit) });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const cars = await Car.findByPk(req.params.id);
    res.send(cars);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const newCar = await Car.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(newCar[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Car.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default router;
