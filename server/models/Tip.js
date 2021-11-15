const mongoose = require('mongoose');
const {Schema} = mongoose;

const TipSchema = new Schema({
  amount: {
    type: Number,
    required: [true, "an amount is needed to make the calculations"],
  },
  date: { type: Date, required: true, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required:[true,'No User have been provided']
  }
});

const Tip = mongoose.model("Tip", TipSchema);
module.exports = Tip;