'use strict';

var mongoose = require('app-datastore').require('mongoose');
var Schema = mongoose.Schema;

/**
 *
 * Device Verification Model
 */
module.exports = {
  name: 'VerificationModel',
  descriptor: {
    key: { type: String },
    otp: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "UserModel" },
    device: { type: Schema.Types.ObjectId, ref: "DeviceModel" },
    country: { type: String },
    countryCode: { type: String },
    number: { type: String },
    // Filtering
    tags: [String],
    deleted: { type: Boolean, default: false },
    // Auditing
    createdAt: { type: Date },
    updatedAt: { type: Date, default: Date.now }
  },
  options: {
    collection: 'verifications'
  }
};