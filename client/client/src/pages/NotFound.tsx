import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
          <Home className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
        <p className="text-muted text-lg mb-8">Page not found</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;