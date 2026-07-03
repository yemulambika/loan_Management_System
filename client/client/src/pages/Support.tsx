import { MessageSquare, Phone, Mail } from 'lucide-react';

const Support = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Support</h1>
        <p className="text-muted mt-1">Get help and assistance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Live Chat</h3>
          </div>
          <p className="text-sm text-muted">Chat with our support team in real-time</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Phone Support</h3>
          </div>
          <p className="text-sm text-muted">Call us at 1-800-LOAN-HELP</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Email</h3>
          </div>
          <p className="text-sm text-muted">support@loanmanagement.com</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-xl">
            <h4 className="font-medium text-text-primary mb-2">How do I apply for a loan?</h4>
            <p className="text-sm text-muted">Navigate to the Loan Applications page and click "New Application" to start your application.</p>
          </div>
          <div className="p-4 bg-background rounded-xl">
            <h4 className="font-medium text-text-primary mb-2">How can I check my loan status?</h4>
            <p className="text-sm text-muted">Visit the Dashboard or Loans page to view all your loan applications and their current status.</p>
          </div>
          <div className="p-4 bg-background rounded-xl">
            <h4 className="font-medium text-text-primary mb-2">What documents are required?</h4>
            <p className="text-sm text-muted">Typically, you'll need ID proof, address proof, income proof, and bank statements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;