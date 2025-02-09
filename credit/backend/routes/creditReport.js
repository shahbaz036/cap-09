const express = require('express');
const router = express.Router();
const multer = require('multer');
const xml2js = require('xml2js');
const CreditReport = require('../models/creditReport');

// Configure multer for XML file uploads
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/xml' || file.originalname.endsWith('.xml')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only XML files are allowed.'));
    }
  }
});

// Upload and process XML file
router.post('/upload', upload.single('xmlFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const parser = new xml2js.Parser({ explicitArray: false });
    const xmlData = await parser.parseStringPromise(req.file.buffer.toString());

    // Extract and transform data from XML
    // Note: Adjust this according to your XML structure
    const reportData = {
      basicDetails: {
        name: xmlData.report.basicDetails.name,
        mobilePhone: xmlData.report.basicDetails.mobilePhone,
        pan: xmlData.report.basicDetails.pan,
        creditScore: parseInt(xmlData.report.basicDetails.creditScore)
      },
      reportSummary: {
        totalAccounts: parseInt(xmlData.report.summary.totalAccounts),
        activeAccounts: parseInt(xmlData.report.summary.activeAccounts),
        closedAccounts: parseInt(xmlData.report.summary.closedAccounts),
        currentBalanceAmount: parseFloat(xmlData.report.summary.currentBalanceAmount),
        securedAccountsAmount: parseFloat(xmlData.report.summary.securedAccountsAmount),
        unsecuredAccountsAmount: parseFloat(xmlData.report.summary.unsecuredAccountsAmount),
        lastSevenDaysEnquiries: parseInt(xmlData.report.summary.lastSevenDaysEnquiries)
      },
      creditAccounts: xmlData.report.creditAccounts.account.map(account => ({
        creditCard: account.creditCard,
        bank: account.bank,
        address: account.address,
        accountNumber: account.accountNumber,
        amountOverdue: parseFloat(account.amountOverdue),
        currentBalance: parseFloat(account.currentBalance)
      }))
    };

    // Save to MongoDB
    const creditReport = new CreditReport(reportData);
    await creditReport.save();

    res.status(201).json(creditReport);
  } catch (error) {
    console.error('Error processing XML file:', error);
    res.status(500).json({ error: 'Error processing XML file' });
  }
});

// Get all credit reports
router.get('/', async (req, res) => {
  try {
    const reports = await CreditReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
});

// Get a specific credit report with id
router.get('/:id', async (req, res) => {
  try {
    const report = await CreditReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching report' });
  }
});

module.exports = router;