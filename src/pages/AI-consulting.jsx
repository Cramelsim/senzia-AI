import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Users, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const AIConsulting = () => {
  const services = [
    {
      icon: Lightbulb,
      title: 'AI Strategy Consulting',
      description: 'Develop a comprehensive AI roadmap tailored to your business goals and industry.',
      features: [
        'AI readiness assessment',
        'Strategic roadmap development',
        'Use case identification',
        'ROI analysis'
      ],
      color: '#7c3aed'
    },
    {
      icon: Users,
      title: 'Team Training',
      description: 'Upskill your team with practical AI knowledge and hands-on experience.',
      features: [
        'Customized training programs',
        'Hands-on workshops',
        'Practical use cases',
        'Ongoing support'
      ],
      color: '#8b5cf6'
    },
    {
      icon: Target,
      title: 'Workshops',
      description: 'Interactive sessions designed to solve specific business challenges with AI.',
      features: [
        'Problem-solving workshops',
        'AI ideation sessions',
        'Implementation planning',
        'Best practices sharing'
      ],