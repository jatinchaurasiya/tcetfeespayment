import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>+91 22 2847 1000</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>info@tcet.ac.in</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Kandivali (E), Mumbai - 400101</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header with college banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img 
                src="/Untitled design.png" 
                alt="Thakur College of Engineering & Technology Logo" 
                className="h-20 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Thakur College of Engineering & Technology
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Affiliated to University of Mumbai | NAAC Accredited | Estd. 2001
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Thakur Educational Campus, Kandivali (East), Mumbai - 400101
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Student Portal</div>
            <div className="text-lg font-semibold text-blue-900">Fee Payment System</div>
            <div className="text-xs text-gray-500 mt-1">Secure Online Payment</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;