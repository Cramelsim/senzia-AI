import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, ShieldCheck, LineChart, Target, Bot, Plug,
  CheckCircle2, ArrowRight
} from 'lucide-react';

// Swap these paths to wherever you place the images in your project,
// e.g. src/assets/product/dashboard-overview.jpeg
import dashboardImg from '../assets/product/dashboard-overview.jpeg';
import forecastingImg from '../assets/product/forecasting-center.jpeg';
import insightsImg from '../assets/product/insights-hub.jpeg';
import integrationsImg from '../assets/product/integrations-hub.jpeg';
import alertsImg from '../assets/product/alerts-center.jpeg';

const Product = () => {
  const features = [
    {
      icon: Brain,
      tag: 'FINANCIAL INTELLIGENCE',
      title: 'See exactly where profit comes from — and where it leaks.',
      desc: 'Senzia pulls together revenue, expenses, margins and cash flow into one live view, so you always know the real financial health of your business.',
      points: [
        'Real-time revenue, profit & expense tracking',
        'Automatic margin and cash flow analysis',
        'Breakdown by branch, channel and product',
      ],
      image: dashboardImg,
      color: '#a78bfa',
      bg: 'rgba(124, 58, 237, 0.12)',
      reverse: false,
    },
    {
      icon: ShieldCheck,
      tag: 'FRAUD & RISK INTELLIGENCE',
      title: 'Catch suspicious activity before it costs you.',
      desc: 'AI continuously scans transactions, inventory and user activity for anomalies — flagging risks in real time instead of after the damage is done.',
      points: [
        'Anomaly detection on transactions & expenses',
        'Inventory discrepancy and shrinkage alerts',
        'Unusual login and user-activity monitoring',
      ],
      image: alertsImg,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      reverse: true,
    },
    {
      icon: LineChart,
      tag: 'FORECASTING INTELLIGENCE',
      title: 'Plan ahead with AI-powered forecasts you can trust.',
      desc: 'Predict revenue, expenses, cash flow and inventory needs 30, 60 or 90 days out — with confidence scores so you know how much to rely on each forecast.',
      points: [
        'Revenue, expense & cash flow forecasting',
        'Inventory demand prediction',
        'Scenario planning ("what if I increase ad spend 20%?")',
      ],
      image: forecastingImg,
      color: '#60a5fa',
      bg: 'rgba(59, 130, 246, 0.12)',
      reverse: false,
    },
    {
      icon: Target,
      tag: 'BUSINESS OPPORTUNITY ENGINE',
      title: 'Discover hidden revenue you didn\u2019t know you had.',
      desc: 'Senzia analyzes your performance trends to surface concrete opportunities — from underpriced products to high-potential marketing channels.',
      points: [
        'Opportunity Spotlight with potential KES impact',
        'Top-performing area breakdown',
        'Pricing and cost-saving recommendations',
      ],
      image: insightsImg,
      color: '#4ade80',
      bg: 'rgba(34, 197, 94, 0.12)',
      reverse: true,
    },
    {
      icon: Plug,
      tag: 'INTEGRATIONS',
      title: 'Connects to the tools you already use.',
      desc: 'POS systems, M-Pesa, banks, accounting software, e-commerce platforms and more — Senzia plugs into your existing stack in minutes, not months.',
      points: [
        '16+ native integrations (QuickBooks, M-Pesa, Shopify, Stripe...)',
        '98.7% data sync success rate',
        'Custom integrations via open API',
      ],
      image: integrationsImg,
      color: '#22d3ee',
      bg: 'rgba(34, 211, 238, 0.12)',
      reverse: false,
    },
  ];

  