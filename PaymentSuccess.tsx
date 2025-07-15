import React from 'react';
import { CheckCircle, Download, Mail, Calendar, CreditCard, User, Hash } from 'lucide-react';

interface PaymentSuccessProps {
  paymentData: any;
  onSendReceipt: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ paymentData, onSendReceipt }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateForReceipt = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const downloadReceipt = () => {
    // Create HTML content for the receipt
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>TCET Fee Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.4;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .college-banner {
            text-align: center;
            margin-bottom: 10px;
        }
        .receipt-title {
            text-align: center;
            margin: 20px 0;
        }
        .receipt-title h2 {
            text-decoration: underline;
            font-size: 20px;
            margin: 10px 0;
        }
        .receipt-info {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }
        .receipt-text {
            margin: 20px 0;
            text-align: justify;
            line-height: 1.6;
        }
        .fee-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .fee-table th, .fee-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        .fee-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        .total-row {
            font-weight: bold;
        }
        .amount-words {
            margin: 15px 0;
            font-weight: bold;
        }
        .payment-details {
            margin: 20px 0;
        }
        .signature-section {
            text-align: right;
            margin: 40px 0;
        }
        .notes {
            margin-top: 30px;
        }
        .notes h3 {
            text-decoration: underline;
            margin-bottom: 10px;
        }
        .footer-logo {
            text-align: right;
            margin-top: 30px;
        }
        .footer-logo img {
            width: 100px;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="college-banner">
            <img src="/College Banner.png" alt="Thakur College of Engineering & Technology Banner" style="width: 100%; max-width: 800px; height: auto; margin: 0 auto; display: block;">
        </div>
    </div>

    <div class="receipt-title">
        <h2>ADHOC FEE RECEIPT</h2>
        <p><strong>( Academic Year 2025-26 )</strong></p>
    </div>

    <div class="receipt-info">
        <div><strong>Receipt No. CAP-OPEN/Minority/Institute Level/22</strong></div>
        <div><strong>Date : ${formatDateForReceipt(paymentData.paymentDate)}</strong></div>
    </div>

    <div class="receipt-text">
        The Institute has received with thanks the following Adhoc fee at the time of admission to 2<sup>nd</sup> year - <strong>Bachelor of Computer Application (BCA)</strong> from Mr/Ms. <strong>${paymentData.studentName}</strong> for the academic year 2025-26.
    </div>

    <table class="fee-table">
        <thead>
            <tr>
                <th>Sr.No.</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1.</td>
                <td>Programme Fees</td>
                <td>89,506/-</td>
            </tr>
            <tr class="total-row">
                <td></td>
                <td><strong>Total</strong></td>
                <td><strong>89,506/-</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="amount-words">
        Amount in words: <strong>Eighty Nine Thousand Five Hundred & Six Only</strong>
    </div>

    <div class="payment-details">
        <p><strong>Payment Mode:</strong> ${
          paymentData.paymentMode === 'upi' ? 'UPI' : 
          paymentData.paymentMode === 'netbanking' ? 'Net Banking' : 
          'Credit/Debit Card'
        }</p>
        ${paymentData.paymentMode === 'upi' ? `<p><strong>UPI Transaction ID:</strong> ${paymentData.transactionId}</p>` : ''}
        ${paymentData.paymentMode === 'netbanking' ? `<p><strong>Bank:</strong> ${paymentData.bankName || 'N/A'}</p>` : ''}
        <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
        <p><strong>Payment Date:</strong> ${formatDate(paymentData.paymentDate)}</p>
    </div>

    <div class="signature-section">
        <p>By D.D.No.________dtd________drawn on__________________</p>
        <br><br>
        <div class="footer-logo">
            <img src="/Untitled design.png" alt="TCET Logo">
            <hr style="width: 200px; margin-top: 10px;">
        </div>
    </div>

    <div class="notes">
        <h3>Note :</h3>
        <p>1) Students are required to note that the fees collected under article-1&2 is the Adhoc fees.</p>
        <p>2) On Fixation of the fee the students need to pay the difference fees within 15 days from the date of the fee fixation from the Fees Regulating Authority</p>
    </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TCET_Official_Receipt_${paymentData.transactionId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600">Your fee payment has been processed successfully.</p>
      </div>

      {/* Official Receipt Preview */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
        {/* Header with College Banner */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <div className="text-center mb-4">
            <img 
              src="/College Banner.png" 
              alt="Thakur College of Engineering & Technology Banner" 
              className="w-full max-w-4xl mx-auto h-auto object-contain"
            />
          </div>
        </div>

        {/* Receipt Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 underline">ADHOC FEE RECEIPT</h2>
          <p className="text-sm font-semibold text-gray-800 mt-2">( Academic Year 2025-26 )</p>
        </div>

        {/* Receipt Info */}
        <div className="flex justify-between mb-6 text-sm">
          <div><strong>Receipt No. CAP-OPEN/Minority/Institute Level/22</strong></div>
          <div><strong>Date : {formatDateForReceipt(paymentData.paymentDate)}</strong></div>
        </div>

        {/* Receipt Text */}
        <div className="mb-6 text-sm text-justify leading-relaxed">
          The Institute has received with thanks the following Adhoc fee at the time of admission to 2<sup>nd</sup> year - <strong>Bachelor of Computer Application (BCA)</strong> from Mr/Ms. <strong>{paymentData.studentName}</strong> for the academic year 2025-26.
        </div>

        {/* Fee Table */}
        <table className="w-full border-collapse border border-gray-800 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-800 p-2 text-left">Sr.No.</th>
              <th className="border border-gray-800 p-2 text-left">Description</th>
              <th className="border border-gray-800 p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-800 p-2">1.</td>
              <td className="border border-gray-800 p-2">Programme Fees</td>
              <td className="border border-gray-800 p-2">89,506/-</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-gray-800 p-2"></td>
              <td className="border border-gray-800 p-2">Total</td>
              <td className="border border-gray-800 p-2">89,506/-</td>
            </tr>
          </tbody>
        </table>

        {/* Amount in Words */}
        <div className="mb-4 font-bold text-sm">
          Amount in words: Eighty Nine Thousand Five Hundred & Six Only
        </div>

        {/* Payment Details */}
        <div className="mb-6 text-sm space-y-1">
          <p><strong>Payment Mode:</strong> {
            paymentData.paymentMode === 'upi' ? 'UPI' : 
            paymentData.paymentMode === 'netbanking' ? 'Net Banking' : 
            'Credit/Debit Card'
          }</p>
          {paymentData.paymentMode === 'upi' && (
            <p><strong>UPI Transaction ID:</strong> {paymentData.transactionId}</p>
          )}
          {paymentData.paymentMode === 'netbanking' && (
            <p><strong>Bank:</strong> {paymentData.bankName || 'N/A'}</p>
          )}
          <p><strong>Transaction ID:</strong> {paymentData.transactionId}</p>
          <p><strong>Payment Date:</strong> {formatDate(paymentData.paymentDate)}</p>
        </div>

        {/* Signature Section */}
        <div className="text-right mb-6">
          <p className="text-sm">By D.D.No.________dtd________drawn on__________________</p>
          <div className="mt-8 flex justify-end">
              <img src="/Untitled design.png" alt="TCET Logo" className="h-16 w-auto mx-auto" />
              <hr className="w-32 mt-2 border-gray-800" />
            </div>
          </div>

        {/* Notes */}
        <div className="border-t pt-4">
          <h3 className="font-bold text-sm underline mb-2">Note :</h3>
          <div className="text-xs space-y-1">
            <p>1) Students are required to note that the fees collected under article-1&2 is the Adhoc fees.</p>
            <p>2) On Fixation of the fee the students need to pay the difference fees within 15 days from the date of the fee fixation from the Fees Regulating Authority</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onSendReceipt}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <Mail className="w-5 h-5 mr-2" />
          Email Receipt
        </button>
        <button
          onClick={downloadReceipt}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Official Receipt
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Keep this receipt for your records. A copy has been sent to your registered email address.</p>
        <p className="mt-1">For any queries, contact the accounts department at accounts@tcet.ac.in</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;