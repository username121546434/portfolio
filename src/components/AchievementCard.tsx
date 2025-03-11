import React from 'react';
import { Achievement } from '../types/Achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{achievement.year}</p>
      <p className="text-gray-700 dark:text-gray-300">{achievement.description}</p>
      {achievement.certificateUrl && (
        <a 
          href={achievement.certificateUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Certificate
        </a>
      )}
    </div>
  );
}