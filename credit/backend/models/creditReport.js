const mongoose = require('mongoose');

// Defines the structure for basic user information
const basicDetailsSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number
});

// Defines the structure for report summary statistics
const reportSummarySchema = new mongoose.Schema({
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalanceAmount: Number,
  securedAccountsAmount: Number,
  unsecuredAccountsAmount: Number,
  lastSevenDaysEnquiries: Number
});

// Defines the structure for individual credit accounts
const creditAccountSchema = new mongoose.Schema({
  creditCard: String,
  bank: String,
  address: String,
  accountNumber: String,
  amountOverdue: Number,
  currentBalance: Number
});
// Main schema that combines all sub-schemas
const creditReportSchema = new mongoose.Schema({
  basicDetails: basicDetailsSchema,
  reportSummary: reportSummarySchema,
  creditAccounts: [creditAccountSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CreditReport', creditReportSchema);