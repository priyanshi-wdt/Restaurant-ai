const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
    unique: true,
  },

  companyName: {
    type: String,
    required: true,
  },

  businessType: String,

  receptionistName: String,

  expertName: String,

  greeting: String,

  website: String,

  phone: String,

  email: String,

  address: String,

  businessHours: String,

  services: [String],

  products: [String],

 
  
}, {
  timestamps: true,
});

module.exports = mongoose.model("Company", companySchema);