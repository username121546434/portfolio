import { Trophy } from 'lucide-react';
import { AchievementCard } from './AchievementCard';
import { Achievement } from '../types/Achievement';

interface AchievementsSectionProps {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}

export function AchievementsSection({ achievements, loading, error }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Trophy size={32} className="text-yellow-600 dark:text-yellow-400" />
        <h2 className="text-3xl font-bold">Achievements</h2>
      </div>
      
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      ) : achievements.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-300">
          <p>No achievements found.</p>
        </div>
      )}
    </section>
  );
}