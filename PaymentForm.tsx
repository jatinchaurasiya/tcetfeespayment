import React, { useState } from 'react';
import { CreditCard, User, Calendar, Lock, CheckCircle, Smartphone, Building2, Wallet } from 'lucide-react';

interface PaymentFormProps {
  onPaymentSuccess: (paymentData: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    email: '',
    paymentMode: 'card',
    // Card details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    // UPI details
    upiId: '',
    // Net Banking details
    bankName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pass form data to parent for processing
    onPaymentSuccess(formData);
  };

  const renderPaymentFields = () => {
    switch (formData.paymentMode) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name on card"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                maxLength={19}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Lock className="w-4 h-4 inline mr-1" />
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  maxLength={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        );
      
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UPI ID *
              </label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="yourname@paytm / yourname@gpay"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <Smartphone className="w-4 h-4 inline mr-1" />
                You will be redirected to your UPI app to complete the payment
              </p>
            </div>
          </div>
        );
      
      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Bank *
              </label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="pnb">Punjab National Bank</option>
                <option value="bob">Bank of Baroda</option>
                <option value="canara">Canara Bank</option>
                <option value="union">Union Bank of India</option>
                <option value="other">Other Banks</option>
              </select>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-800">
                <Building2 className="w-4 h-4 inline mr-1" />
                You will be redirected to your bank's secure login page
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getPaymentButtonText = () => {
    switch (formData.paymentMode) {
      case 'upi':
        return 'Pay via UPI';
      case 'netbanking':
        return 'Pay via Net Banking';
      default:
        return 'Pay with Card';
    }
  };

  const getPaymentIcon = () => {
    switch (formData.paymentMode) {
      case 'upi':
        return <Smartphone className="w-5 h-5 mr-2" />;
      case 'netbanking':
        return <Building2 className="w-5 h-5 mr-2" />;
      default:
        return <CreditCard className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fee Payment</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Course:</span>
              <span className="ml-2 text-gray-900">SYBCA (Second Year BCA)</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Academic Year:</span>
              <span className="ml-2 text-gray-900">2025-26</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Fee Type:</span>
              <span className="ml-2 text-gray-900">Tuition Fee</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Amount:</span>
              <span className="ml-2 text-green-600 font-bold">₹89,506</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Information */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Student Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter roll number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email for receipt"
              />
            </div>
          </div>
        </div>

        {/* Payment Mode Selection */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Select Payment Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="relative">
              <input
                type="radio"
                name="paymentMode"
                value="card"
                checked={formData.paymentMode === 'card'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                formData.paymentMode === 'card' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-center mb-2">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                  <div className="text-xs text-gray-500 mt-1">Visa, Mastercard, RuPay</div>
                </div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="paymentMode"
                value="upi"
                checked={formData.paymentMode === 'upi'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                formData.paymentMode === 'upi' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-center mb-2">
                  <Smartphone className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">UPI</div>
                  <div className="text-xs text-gray-500 mt-1">GPay, PhonePe, Paytm</div>
                </div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="paymentMode"
                value="netbanking"
                checked={formData.paymentMode === 'netbanking'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                formData.paymentMode === 'netbanking' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Net Banking</div>
                  <div className="text-xs text-gray-500 mt-1">All major banks</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            {getPaymentIcon()}
            Payment Details
          </h3>
          {renderPaymentFields()}
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <Lock className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">Secure Payment</p>
              <p>Your payment information is encrypted and secure.</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : (
            <>
              {getPaymentIcon()}
              {getPaymentButtonText()} ₹89,506
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;