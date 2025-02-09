import React from 'react';
import { CreditReport as CreditReportType } from '../types/types';
import { CreditCard, User, FileText } from 'lucide-react';

interface Props {
  report: CreditReportType;
}

const CreditReport: React.FC<Props> = ({ report }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Basic Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <User className="mr-2" /> Basic Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-semibold">{report.basicDetails.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Mobile Phone</p>
            <p className="font-semibold">{report.basicDetails.mobilePhone}</p>
          </div>
          <div>
            <p className="text-gray-600">PAN</p>
            <p className="font-semibold">{report.basicDetails.pan}</p>
          </div>
          <div>
            <p className="text-gray-600">Credit Score</p>
            <p className="font-semibold">{report.basicDetails.creditScore}</p>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <FileText className="mr-2" /> Report Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Total Accounts</p>
            <p className="text-2xl font-bold">{report.reportSummary.totalAccounts}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Active Accounts</p>
            <p className="text-2xl font-bold">{report.reportSummary.activeAccounts}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Closed Accounts</p>
            <p className="text-2xl font-bold">{report.reportSummary.closedAccounts}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold">₹{report.reportSummary.currentBalanceAmount}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Secured Accounts</p>
            <p className="text-2xl font-bold">₹{report.reportSummary.securedAccountsAmount}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Unsecured Accounts</p>
            <p className="text-2xl font-bold">₹{report.reportSummary.unsecuredAccountsAmount}</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-600">Last 7 Days Credit Enquiries</p>
          <p className="text-2xl font-bold">{report.reportSummary.lastSevenDaysEnquiries}</p>
        </div>
      </div>

      {/* Credit Accounts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <CreditCard className="mr-2" /> Credit Accounts
        </h2>
        <div className="space-y-4">
          {report.creditAccounts.map((account, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Credit Card</p>
                  <p className="font-semibold">{account.creditCard}</p>
                </div>
                <div>
                  <p className="text-gray-600">Bank</p>
                  <p className="font-semibold">{account.bank}</p>
                </div>
                <div>
                  <p className="text-gray-600">Account Number</p>
                  <p className="font-semibold">{account.accountNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount Overdue</p>
                  <p className="font-semibold text-red-600">₹{account.amountOverdue}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Balance</p>
                  <p className="font-semibold">₹{account.currentBalance}</p>
                </div>
                <div>
                  <p className="text-gray-600">Address</p>
                  <p className="font-semibold">{account.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditReport;