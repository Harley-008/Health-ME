const express = require("express");
const router = express.Router();

const remiController = require("../controller/remi.controller");

const validarRemi = require("../middleware/validarRemi");

router.get("/", remiController.listar);
router.post("/", validarRemi, remiController.criar);
router.put("/:id", remiController.atualizar);
router.delete("/:id", remiController.deletar);

module.exports = router;
