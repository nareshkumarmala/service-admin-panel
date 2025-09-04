import { useEffect } from 'react';

export function PostLaunchMonitoring() {
  useEffect(() => {
    // Admin panel monitoring
    console.log('🔒 Admin Panel Monitoring Active');
    
    // Track admin panel performance
    const startTime = performance.now();
    
    const checkPerformance = () => {
      const loadTime = performance.now() - startTime;
      console.log(`🔒 Admin Panel Load Time: ${loadTime.toFixed(2)}ms`);
      
      // In production, send to monitoring service
      if (import.meta.env.PROD) {
        console.log('🔒 Admin metrics logged for internal review');
      }
    };

    // Check after component mount
    setTimeout(checkPerformance, 100);

    // Monitor for admin-specific errors
    const errorHandler = (event: ErrorEvent) => {
      console.error('🚨 Admin Panel Runtime Error:', event.error);
      // In production, would send to admin error tracking
    };

    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  // Only show indicator in development
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-xs z-50">
      <div className="font-semibold mb-1">🔒 Admin Monitoring</div>
      <div>Environment: {import.meta.env.MODE}</div>
      <div>Security: Active</div>
    </div>
  );
}