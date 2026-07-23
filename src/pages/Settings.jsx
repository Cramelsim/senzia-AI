import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Lock,
  Globe,
  DollarSign,
  Palette,
  Monitor,
  Database,
  AlertTriangle,
  ChevronRight,
  Check,
  Edit,
  Key,
  LogOut,
  Calendar,
  Users,
  HardDrive,
  Activity,
  Eye,
  EyeOff,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Building,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'Senzia Limited',
    businessId: 'SEN-2024-001',
    email: 'info@senzia.com',
    phone: '+254 700 123 456',
    address: 'WestPark Towers, 7th Floor, Waiyaki Way, Nairobi, Kenya',
    language: 'English',
    timezone: 'EAT (UTC+3)',
    currency: 'KES - Kenyan Shilling',
    theme: 'dark',
    compactMode: false,
    twoFactorAuth: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activityLog, setActivityLog] = useState([
    { action: 'User permissions updated', user: 'Alice Nijuguna', time: 'Today, 09:15 AM' },
    { action: 'New user invited', user: 'Brian Otieno', time: 'Yesterday, 04:45 PM' },
    { action: 'User deactivated', user: 'Cynthia Wanjiku', time: 'May 11, 2025, 02:30 PM' },
    { action: 'System settings updated', user: 'John M.', time: 'May 10, 2025, 11:20 AM' },
    { action: 'Data export requested', user: 'Sarah K.', time: 'May 9, 2025, 09:45 AM' }
  ]);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'data', label: 'Data Settings', icon: Database },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
    console.log('Settings saved:', formData);
  };

