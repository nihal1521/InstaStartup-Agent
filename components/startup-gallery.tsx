"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Heart, 
  Eye, 
  Star,
  TrendingUp,
  Users,
  Zap,
  Filter,
  Search
} from 'lucide-react';

interface GalleryItem {
  id: string;
  brandName: string;
  tagline: string;
  description: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logoUrl: string;
  likes: number;
  views: number;
  rating: number;
  aiProvider: string;
  featured: boolean;
}

const sampleStartups: GalleryItem[] = [
  {
    id: '1',
    brandName: 'EcoTrack',
    tagline: 'Sustainability made simple',
    description: 'AI-powered carbon footprint tracking for businesses',
    category: 'Sustainability',
    colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
    logoUrl: 'https://via.placeholder.com/200x200/10b981/white?text=ET',
    likes: 234,
    views: 1520,
    rating: 4.8,
    aiProvider: 'OpenAI GPT-4',
    featured: true
  },
  {
    id: '2',
    brandName: 'CodeMentor AI',
    tagline: 'Learn coding with AI guidance',
    description: 'Personalized programming education platform',
    category: 'Education',
    colors: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' },
    logoUrl: 'https://via.placeholder.com/200x200/3b82f6/white?text=CM',
    likes: 189,
    views: 980,
    rating: 4.6,
    aiProvider: 'Google Gemini',
    featured: false
  },
  {
    id: '3',
    brandName: 'FitFlow',
    tagline: 'Your personal fitness journey',
    description: 'AI-powered workout and nutrition planning',
    category: 'Health & Fitness',
    colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
    logoUrl: 'https://via.placeholder.com/200x200/f59e0b/white?text=FF',
    likes: 156,
    views: 750,
    rating: 4.7,
    aiProvider: 'GitHub Copilot',
    featured: true
  },
  {
    id: '4',
    brandName: 'TaskFlow Pro',
    tagline: 'Productivity redefined',
    description: 'Smart project management for remote teams',
    category: 'Productivity',
    colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
    logoUrl: 'https://via.placeholder.com/200x200/8b5cf6/white?text=TF',
    likes: 298,
    views: 1840,
    rating: 4.9,
    aiProvider: 'OpenAI GPT-4',
    featured: true
  },
  {
    id: '5',
    brandName: 'CryptoSafe',
    tagline: 'Secure digital assets',
    description: 'Next-generation cryptocurrency wallet',
    category: 'Fintech',
    colors: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
    logoUrl: 'https://via.placeholder.com/200x200/ef4444/white?text=CS',
    likes: 445,
    views: 2100,
    rating: 4.5,
    aiProvider: 'Google Gemini',
    featured: false
  },
  {
    id: '6',
    brandName: 'SocialSync',
    tagline: 'Connect authentically',
    description: 'Privacy-first social media platform',
    category: 'Social Media',
    colors: { primary: '#06b6d4', secondary: '#0891b2', accent: '#22d3ee' },
    logoUrl: 'https://via.placeholder.com/200x200/06b6d4/white?text=SS',
    likes: 167,
    views: 890,
    rating: 4.4,
    aiProvider: 'GitHub Copilot',
    featured: false
  }
];

const categories = ['All', 'Sustainability', 'Education', 'Health & Fitness', 'Productivity', 'Fintech', 'Social Media'];

export function StartupGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular');

  const filteredStartups = sampleStartups
    .filter(startup => 
      (selectedCategory === 'All' || startup.category === selectedCategory) &&
      (searchTerm === '' || 
        startup.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Startup Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing startups created by our AI. Get inspired and see what's possible.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">1,247</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Startups Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600">$2.4M</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Funding Raised</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-strong rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass rounded-xl border border-white/20 focus:border-indigo-400 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-indigo-500' : 'glass'}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass rounded-lg px-3 py-1 text-sm border border-white/20"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStartups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-strong hover:glass border-indigo-200 dark:border-indigo-700 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                {/* Header with Logo */}
                <div 
                  className="h-32 relative flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${startup.colors.primary}, ${startup.colors.secondary})` 
                  }}
                >
                  {startup.featured && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <img 
                    src={startup.logoUrl} 
                    alt={`${startup.brandName} Logo`}
                    className="w-16 h-16 rounded-2xl shadow-lg"
                  />
                </div>

                <div className="p-6">
                  {/* Brand Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{startup.brandName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{startup.tagline}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{startup.description}</p>
                  </div>

                  {/* Category & AI Provider */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {startup.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {startup.aiProvider}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{startup.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{startup.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{startup.rating}</span>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: startup.colors.primary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: startup.colors.secondary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: startup.colors.accent }}
                      />
                    </div>

                    <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" className="glass border-indigo-200 dark:border-indigo-700">
          Load More Startups
        </Button>
      </div>
    </div>
  );
}