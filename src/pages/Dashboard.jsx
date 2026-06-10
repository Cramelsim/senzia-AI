import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { TrendingUp, TrendingDown, AlertCircle, MessageCircle, Zap, FileText, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  