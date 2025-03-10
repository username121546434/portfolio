import { Trophy } from 'lucide-react';
import { Achievement, AchievementCard } from './AchievementCard';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Trophy size={32} className="text-yellow-600 dark:text-yellow-400" />
        <h2 className="text-3xl font-bold">Achievements</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.title} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}