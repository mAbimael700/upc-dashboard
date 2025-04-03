// src/components/AsyncHandler.tsx
import React, { ReactNode } from 'react';

interface AsyncHandlerProps {
  loading: boolean;
  error?: Error | null;
  children: ReactNode;
  fallback?: ReactNode;
}

const AsyncHandler: React.FC<AsyncHandlerProps> = ({ 
  loading, 
  error, 
  children,
  fallback = <div className="loading-spinner">Cargando...</div>
}) => {
  if (loading) return <>{fallback}</>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  return <>{children}</>;
};

export default AsyncHandler;