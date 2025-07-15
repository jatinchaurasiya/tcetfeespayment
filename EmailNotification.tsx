import React from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';

interface EmailNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const EmailNotification: React.FC<EmailNotificationProps> = ({ isVisible, onClose, email }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Email Sent Successfully</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-gray-900">Receipt sent successfully!</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your payment receipt has been sent to:
          </p>
          <p className="text-blue-600 font-semibold mt-1">{email}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a demo system. In a real implementation, 
            the email would be sent through a proper email service like SendGrid, 
            Mailgun, or AWS SES.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailNotification;