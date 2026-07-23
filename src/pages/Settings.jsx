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

  