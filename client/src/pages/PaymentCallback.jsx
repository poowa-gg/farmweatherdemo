import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { config } from '../config';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed
  const [message, setMessage] = useState('');
  const reference = searchParams.get('reference');

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setStatus('failed');
      setMessage('No payment reference found');
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const response = await axios.get(`${config.apiEndpoints.payment}/verify/${reference}`);
      
      if (response.data.success) {
        setStatus('success');
        setMessage('Payment successful! Your account has been upgraded to Premium.');
      } else {
        setStatus('failed');
        setMessage('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      setStatus('failed');
      setMessage(error.response?.data?.message || 'Failed to verify payment');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'verifying' && (
          <>
            <Loader size={64} className="mx-auto mb-4 text-primary animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
            <p className="text-gray-600">Please wait while we confirm your payment</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                You now have access to:
              </p>
              <ul className="text-sm text-left mt-2 space-y-1">
                <li>✓ 7-day detailed forecasts</li>
                <li>✓ Crop-specific recommendations</li>
                <li>✓ Priority SMS alerts</li>
                <li>✓ Historical weather data</li>
              </ul>
            </div>
            <Link 
              to="/dashboard" 
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary inline-block"
            >
              Go to Dashboard
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle size={64} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2 text-red-600">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link 
                to="/upgrade" 
                className="block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary"
              >
                Try Again
              </Link>
              <Link 
                to="/" 
                className="block text-primary hover:underline"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}

        {reference && (
          <p className="text-xs text-gray-500 mt-6">
            Reference: {reference}
          </p>
        )}
      </div>
    </div>
  );
}
