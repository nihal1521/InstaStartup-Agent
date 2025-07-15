"use client";

import { LoadingState } from '@/components/loading-state';
import { ResultDisplay } from '@/components/result-display';
import { Button } from '@/components/ui/button';
import { StartupData } from '@/utils/startup-generator';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [startupData, setStartupData] = useState<StartupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const id = params?.id as string;
        if (!id) {
          setError('Invalid startup ID');
          setLoading(false);
          return;
        }

        // 1. Try to get data from sessionStorage first
        const cachedData = sessionStorage.getItem(`startup-${id}`);
        if (cachedData) {
          console.log('Found cached startup data in sessionStorage');
          const data = JSON.parse(cachedData) as StartupData;
          setStartupData({
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
          });
          setLoading(false);
          return;
        }

        console.log('No cached data, fetching from API...');
        // 2. Fallback to fetching from the API
        const res = await fetch(`/api/get-startup/${id}`);
        const json = await res.json();
        if (!res.ok || json.error) {
          console.error('Error fetching startup data:', json.error);
          setError(json.error || 'Startup not found');
        } else {
          const data = json.data as StartupData;
          console.log('Found startup data:', data.brandName);
          setStartupData({
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
          });
        }
      } catch (err) {
        console.error('Error fetching startup:', err);
        setError(`Failed to load startup data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupData();
  }, [params?.id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button onClick={() => router.push('/')} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </div>
    );
  }

  if (!startupData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="mb-8">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="flex items-center space-x-2 glass rounded-xl hover:glass-strong"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Generator</span>
          </Button>
        </div>

        <ResultDisplay startupData={startupData} />
      </motion.div>
    </div>
  );
}