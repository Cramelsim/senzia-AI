import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { TrendingUp, TrendingDown, AlertCircle, MessageCircle, Zap, FileText, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const metrics = [
    { label: 'Revenue (MTD)', value: 'KES 2,450,000', change: '+18.6%', trend: 'up', vs: 'vs Apr' },
    { label: 'Gross Profit', value: 'KES 1,125,000', change: '+14.3%', trend: 'up', vs: 'vs Apr' },
    { label: 'Net Profit', value: 'KES 540,000', change: '+21.7%', trend: 'up', vs: 'vs Apr' },
    { label: 'Operating Expenses', value: 'KES 710,000', change: '-6.4%', trend: 'down', vs: 'vs Apr' }
  ];

  const alerts = [
    { title: 'High supplier payment detected', time: 'May 31, 2025 - 10:32 AM', type: 'warning' },
    { title: 'Unusual discount given', time: 'May 31, 2025 - 9:15 AM', type: 'danger' },
    { title: 'Inventory variance detected', time: 'May 31, 2025 - 8:06 AM', type: 'warning' }
  ];

  const handleAskAI = () => {
    if (aiQuery.trim()) {
      setAiResponse(`Based on your data, ${aiQuery}. Your revenue is up 18.6% MTD, and we recommend optimizing supplier payments to reduce expenses further.`);
    }
  };

  