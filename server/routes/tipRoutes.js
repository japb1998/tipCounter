const router = require("express").Router();
const { getTipByDay, insertTip,getTipRange,getTipByWeek} = require("../controllers/tipController");
const { protect } = require("../controllers/authController");
router
  .route("/")
  .post(insertTip);
  router.get("/range",protect,getTipRange);
  router.get('/',getTipByDay);
  router.get('/week',protect,getTipByWeek);
module.exports = router;