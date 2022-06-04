import express from "express";
import models from "../../db/models/index.js";

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
router.post("/bulk", async (req, res, next) => {
  try {
    const cars = await Car.bulkCreate(req.body.data);
    res.send(cars);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.send(cars);
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
