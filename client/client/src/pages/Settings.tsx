import { Settings as SettingsIcon, User, Bell, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-muted mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Profile</h3>
          </div>
          <p className="text-sm text-muted">Update your personal information and preferences</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Notifications</h3>
          </div>
          <p className="text-sm text-muted">Configure notification preferences</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Security</h3>
          </div>
          <p className="text-sm text-muted">Manage password and security settings</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;