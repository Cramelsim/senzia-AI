import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: 'KES 4,999', period: '/month', features: ['Up to 5,000 transactions/month', 'Basic fraud detection', 'AI dashboard (basic)', 'WhatsApp reports (daily)', 'Email support'] },
    { name: 'Growth', price: 'KES 9,999', period: '/month', features: ['Up to 25,000 transactions/month', 'Advanced fraud detection', 'AI dashboard (advanced)', 'WhatsApp reports (real-time)', 'Priority email support'], popular: true },
    { name: 'Business', price: 'KES 19,999', period: '/month', features: ['Up to 100,000 transactions/month', 'Custom AI models', 'Custom report scheduling', 'Dedicated account manager', 'Phone & WhatsApp support'] },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited transactions', 'Custom integrations', 'On-premise deployment', 'SLA & compliance support', 'Dedicated support team'] }
  ];
