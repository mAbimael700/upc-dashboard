// src/components/AsyncHandler.tsx
import { LoaderCircle } from 'lucide-react';
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
  fallback = <div className="text-sm text-muted-foreground flex gap-2 items-center"><LoaderCircle className='animate-spin h-4 w-4' /> Cargando...</div>
}) => {
  if (loading) return <>{fallback}</>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  return <>{children}</>;
};

export default AsyncHandler;