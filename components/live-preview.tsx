"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StartupData } from '@/utils/startup-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Smartphone, 
  Edit3, 
  Eye, 
  ExternalLink,
  Download,
  Share2,
  Palette,
  Type,
  Layout
} from 'lucide-react';

interface LivePreviewProps {
  startupData: StartupData;
  onEdit?: (field: string, value: string) => void;
  isEditing?: boolean;
}

export function LivePreview({ startupData, onEdit, isEditing = false }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = () => {
    if (editingField && onEdit) {
      onEdit(editingField, tempValue);
    }
    setEditingField(null);
    setTempValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  return (
    <div className="w-full">
      {/* Preview Controls */}
      <div className="flex items-center justify-between mb-6 p-4 glass-strong rounded-2xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 glass rounded-xl p-2">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
              className="flex items-center space-x-2"
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
              className="flex items-center space-x-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </Button>
          </div>
          
          <Badge variant="outline" className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>Live Preview</span>
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>Preview</span>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Live Website Preview */}
      <motion.div
        layout
        className={`mx-auto transition-all duration-500 ${
          viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'
        }`}
      >
        <div className="glass-strong rounded-3xl p-2 shadow-2xl">
          {/* Browser Chrome */}
          <div className="flex items-center space-x-2 p-3 border-b border-white/20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 mx-4">
              <div className="glass rounded-lg px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
                {startupData.brandName.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>
          </div>

          {/* Website Content */}
          <div className="bg-white dark:bg-gray-900 rounded-b-3xl overflow-hidden">
            {/* Header */}
            <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {startupData.logoUrl && (
                    <img 
                      src={startupData.logoUrl} 
                      alt="Logo"
                      className="w-8 h-8 rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/32x32/${startupData.colors.primary.replace('#', '')}/white?text=${encodeURIComponent(startupData.brandName.substring(0, 2).toUpperCase())}`;
                      }}
                    />
                  )}
                  <EditableText
                    value={startupData.brandName}
                    field="brandName"
                    isEditing={editingField === 'brandName'}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    tempValue={tempValue}
                    setTempValue={setTempValue}
                    className="text-xl font-bold"
                  />
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Pricing</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">About</a>
                </nav>
              </div>
            </header>

            {/* Hero Section */}
            <section className="px-6 py-12 text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
              <div className="max-w-4xl mx-auto">
                <EditableText
                  value={startupData.marketingCopy.heroTitle}
                  field="heroTitle"
                  isEditing={editingField === 'heroTitle'}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                />
                
                <EditableText
                  value={startupData.marketingCopy.heroSubtitle}
                  field="heroSubtitle"
                  isEditing={editingField === 'heroSubtitle'}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                />

                <Button 
                  className="px-8 py-3 text-lg font-semibold rounded-xl"
                  style={{ backgroundColor: startupData.colors.primary }}
                >
                  {startupData.marketingCopy.ctaText}
                </Button>
              </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-12">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {startupData.features.slice(0, 3).map((feature, index) => (
                    <Card key={index} className="text-center p-6">
                      <CardContent>
                        <div 
                          className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                          style={{ backgroundColor: startupData.colors.accent }}
                        >
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Experience the power of {feature.toLowerCase()} in your workflow.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-gray-600 dark:text-gray-300">
                <p>&copy; 2024 {startupData.brandName}. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <Palette className="w-4 h-4" />
          <span>Customize Colors</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Type className="w-4 h-4" />
          <span>Change Fonts</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Layout className="w-4 h-4" />
          <span>Edit Layout</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Share2 className="w-4 h-4" />
          <span>Share Preview</span>
        </Button>
      </div>
    </div>
  );
}

interface EditableTextProps {
  value: string;
  field: string;
  isEditing: boolean;
  onEdit: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  tempValue: string;
  setTempValue: (value: string) => void;
  className?: string;
}

function EditableText({ 
  value, 
  field, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  tempValue, 
  setTempValue, 
  className = "" 
}: EditableTextProps) {
  if (isEditing) {
    return (
      <div className="inline-flex items-center space-x-2">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className={`${className} bg-white dark:bg-gray-800 border border-indigo-300 rounded px-2 py-1`}
          autoFocus
        />
        <Button size="sm" onClick={onSave} className="px-2 py-1 text-xs">
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="px-2 py-1 text-xs">
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <span 
      className={`${className} cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded px-1 transition-colors group`}
      onClick={() => onEdit(field, value)}
    >
      {value}
      <Edit3 className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-50 transition-opacity" />
    </span>
  );
}