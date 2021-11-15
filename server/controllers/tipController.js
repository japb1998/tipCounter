const Tip = require("../models/Tip");
const moment = require("moment");
const mongoose = require("mongoose");
module.exports.getTipByDay = async (req, res, next) => {
  try {
      console.log(req.user)
    const tips = await Tip.find({
      user: req.user,
      date: req.body.date,
    }).populate("user");

    res.status(200).json({
      status: "sucess",
      tips,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.insertTip = async (req, res, next) => {
  try {
    const newTip = await Tip.create(req.user);

    res.status(200).json({
      status: "sucess",
      newTip,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.getTipRange = async (req, res, next) => {
  try {
  
    console.log(req.body);
    const tips = await Tip.find({
      user: req.user,
      date: {
        $gte: new Date(req.body.startDate),
        $lte: new Date(req.body.endDate),
      },
    });

    res.status(200).json({
      status: "sucess",
      tips,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.getTipByWeek = async (req, res, next) => {
  try {
      console.log(req.user);
    console.log(req.params.id);
    console.log(req.body);
    const tips = await Tip.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user),
        },
      },
      {
        $project: {
          amount: 1,
          weekOfTheYear: { $week: "$date" },
        },
      },
      {
        $group: {
          _id: "$weekOfTheYear",
          amount: { $sum: "$amount" },
        },
      },
    ]);

    const weekRanges = [...tips].map((el) => {
      return {
        ...el,
        _id: moment()
          .day("Sunday")
          .year(2021)
          .week(el._id)
          .toDate(),
      };
    });

    res.status(200).json({
      status: "sucess",
      tips: weekRanges,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
