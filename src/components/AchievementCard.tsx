import React from 'react';

export interface Achievement {
  title: string;
  description: string;
  year: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{achievement.year}</p>
    </div>
  );
}