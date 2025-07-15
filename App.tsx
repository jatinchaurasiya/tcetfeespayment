import React, { useState } from 'react';
import Header from './components/Header';
import PaymentForm from './components/PaymentForm';
import PaymentProcessing from './components/PaymentProcessing';
import PaymentSuccess from './components/PaymentSuccess';
import EmailNotification from './components/EmailNotification';

function App() {
  const [paymentData, setPaymentData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  const handlePaymentSubmit = (data: any) => {
    setIsProcessing(true);
    setPaymentData(data);
  };

  const handlePaymentComplete = (data: any) => {
    setIsProcessing(false);
    setPaymentData(data);
  };

  const handleSendReceipt = () => {
    // Simulate sending email
    setShowEmailNotification(true);
  };

  const handleCloseEmailNotification = () => {
    setShowEmailNotification(false);
  };

  if (isProcessing) {
    return <PaymentProcessing paymentData={paymentData} onPaymentComplete={handlePaymentComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!paymentData ? (
          <PaymentForm onPaymentSuccess={handlePaymentSubmit} />
        ) : (
          <PaymentSuccess 
            paymentData={paymentData} 
            onSendReceipt={handleSendReceipt}
          />
        )}
      </main>

      <EmailNotification
        isVisible={showEmailNotification}
        onClose={handleCloseEmailNotification}
        email={paymentData?.email || ''}
      />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p>Thakur College of Engineering & Technology</p>
                <p>Thakur Educational Campus</p>
                <p>Shyamnarayan Thakur Marg, Thakur Village</p>
                <p>Kandivali (East), Mumbai - 400101</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <p>Student Portal</p>
                <p>Academic Calendar</p>
                <p>Fee Structure</p>
                <p>Examination</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <p>Phone: +91 22 2847 1000</p>
                <p>Email: info@tcet.ac.in</p>
                <p>Accounts: accounts@tcet.ac.in</p>
                <p>Technical Support: support@tcet.ac.in</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-4 text-center text-sm">
            <p>&copy; 2024 Thakur College of Engineering & Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;