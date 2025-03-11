import React from 'react';
import { Briefcase } from 'lucide-react';
import { Extracurricular } from '../types/Extracurricular';

interface ExtracurricularsSectionProps {
  extracurriculars: Extracurricular[];
  loading: boolean;
  error: string | null;
}

export function ExtracurricularsSection({ extracurriculars, loading, error }: ExtracurricularsSectionProps) {
  return (
    <section id="extracurriculars" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Briefcase size={32} className="text-red-600 dark:text-red-400" />
        <h2 className="text-3xl font-bold">Extracurricular Activities</h2>
      </div>
      
      {loading ? (
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
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
      ) : extracurriculars.length > 0 ? (
        <div className="space-y-8">
          {extracurriculars.map((activity) => (
            <div key={activity.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
              {activity.organization && (
                <p className="text-gray-600 dark:text-gray-400 mb-1">{activity.organization}</p>
              )}
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {activity.startDate} - {activity.present ? 'Present' : activity.endDate}
                {activity.role && ` • ${activity.role}`}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
              
              {activity.achievements && activity.achievements.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                    {activity.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-300">
          <p>No extracurricular activities found.</p>
        </div>
      )}
    </section>
  );
} 