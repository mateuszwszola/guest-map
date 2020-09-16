import { useState } from 'react';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const getLocation = (successCb, errorCb) => {
    if (status === 'loading') return;

    setStatus('loading');
    setError(null);

    if (!navigator.geolocation) {
      setStatus('error');
      const errMsg = 'Geolocation is not supported by your browser';
      setError(errMsg);
      errorCb(errMsg);
    } else {
      const onSuccess = (position) => {
        const { longitude, latitude } = position.coords;
        setLocation({ longitude, latitude });
        setStatus('success');
        successCb(position);
      };

      const onError = (err) => {
        setStatus('error');
        const errMsg = err.message || 'Unable to retrieve your location';
        setError(errMsg);
        errorCb(errMsg);
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return {
    location,
    status,
    getLocation,
    error,
    setLocation,
  };
}
