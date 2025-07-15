import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Smartphone, CreditCard, Building2, QrCode, RefreshCw } from 'lucide-react';

interface PaymentProcessingProps {
  paymentData: any;
  onPaymentComplete: (data: any) => void;
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({ paymentData, onPaymentComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown for UPI

  useEffect(() => {
    const timer = setTimeout(() => {
      if (paymentData.paymentMode === 'upi') {
        if (currentStep === 1) {
          setCurrentStep(2);
          setShowQR(true);
        } else if (currentStep === 2) {
          setCurrentStep(3);
        } else if (currentStep === 3) {
          // Complete payment
          const completedPayment = {
            ...paymentData,
            transactionId: `TCET${Date.now()}`,
            amount: 89506,
            course: 'SYBCA',
            academicYear: '2025-26',
            paymentDate: new Date().toISOString(),
            status: 'SUCCESS'
          };
          onPaymentComplete(completedPayment);
        }
      } else {
        if (currentStep === 1) {
          setCurrentStep(2);
        } else if (currentStep === 2) {
          setCurrentStep(3);
        } else if (currentStep === 3) {
          // Complete payment
          const completedPayment = {
            ...paymentData,
            transactionId: `TCET${Date.now()}`,
            amount: 89506,
            course: 'SYBCA',
            academicYear: '2025-26',
            paymentDate: new Date().toISOString(),
            status: 'SUCCESS'
          };
          onPaymentComplete(completedPayment);
        }
      }
    }, paymentData.paymentMode === 'upi' ? (currentStep === 1 ? 2000 : currentStep === 2 ? 8000 : 3000) : 2500);

    return () => clearTimeout(timer);
  }, [currentStep, paymentData, onPaymentComplete]);

  // Countdown timer for UPI
  useEffect(() => {
    if (showQR && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [showQR, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateQRCode = () => {
    return (
      <div className="inline-block p-4 bg-white rounded-lg shadow-lg">
        <img 
          src="/College Banner.png" 
          alt="UPI QR Code" 
          className="w-48 h-48 object-contain border-2 border-gray-300 rounded-lg"
        />
        <div className="text-center mt-2 text-sm text-gray-600">
          Scan with any UPI app
        </div>
      </div>
    );
  };

  const getPaymentIcon = () => {
    switch (paymentData.paymentMode) {
      case 'upi':
        return <Smartphone className="w-8 h-8 text-blue-600" />;
      case 'netbanking':
        return <Building2 className="w-8 h-8 text-blue-600" />;
      default:
        return <CreditCard className="w-8 h-8 text-blue-600" />;
    }
  };

  const getStepContent = () => {
    if (paymentData.paymentMode === 'upi') {
      switch (currentStep) {
        case 1:
          return (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Initiating UPI Payment</h3>
              <p className="text-gray-600">Setting up your payment request...</p>
            </div>
          );
        case 2:
          return (
            <div className="text-center">
              <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan QR Code to Pay</h3>
              <div className="mb-6">
                {generateQRCode()}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Amount:</strong> ₹89,506
                </p>
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Merchant:</strong> Thakur College of Engineering & Technology
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Time remaining:</strong> {formatTime(timeLeft)}
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="GPay" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo.svg/512px-Paytm_Logo.svg.png" alt="Paytm" className="h-8" />
              </div>
            </div>
          );
        case 3:
          return (
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Waiting for Payment</h3>
              <p className="text-gray-600 mb-4">Please complete the payment in your UPI app</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Waiting for payment confirmation...
                </p>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600">
                {paymentData.paymentMode === 'netbanking' 
                  ? 'Redirecting to your bank...' 
                  : 'Validating card details...'}
              </p>
            </div>
          );
        case 2:
          return (
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authorizing Payment</h3>
              <p className="text-gray-600">
                {paymentData.paymentMode === 'netbanking' 
                  ? 'Please complete the payment on your bank website' 
                  : 'Processing your card payment...'}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Amount:</strong> ₹89,506
                </p>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirming Payment</h3>
              <p className="text-gray-600">Almost done! Generating your receipt...</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Payment authorized successfully
                </p>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {getPaymentIcon()}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {paymentData.paymentMode === 'upi' ? 'UPI Payment' : 
             paymentData.paymentMode === 'netbanking' ? 'Net Banking' : 'Card Payment'}
          </h2>
          <p className="text-gray-600">Thakur College of Engineering & Technology</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-0.5 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {getStepContent()}
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Student:</span>
            <span className="font-semibold">{paymentData.studentName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Course:</span>
            <span className="font-semibold">SYBCA</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Academic Year:</span>
            <span className="font-semibold">2025-26</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-green-600">₹89,506</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 This is a secure payment. Do not refresh or close this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;