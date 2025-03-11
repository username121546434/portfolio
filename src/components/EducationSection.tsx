import React from 'react';
import { BookOpen } from 'lucide-react';
import { Education } from '../types/Education';

interface EducationSectionProps {
  educationItems: Education[];
  loading: boolean;
  error: string | null;
}

export function EducationSection({ educationItems, loading, error }: EducationSectionProps) {
  return (
    <section id="education" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={32} className="text-green-600 dark:text-green-400" />
        <h2 className="text-3xl font-bold">Education</h2>
      </div>
      
      {loading ? (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 animate-pulse">
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-6"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      ) : educationItems.length > 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          {educationItems.map((education) => (
            <div key={education.id} className="mb-6 last:mb-0">
              <h3 className="text-2xl font-semibold mb-2">{education.institution}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {education.startDate} - {education.present ? 'Present' : education.endDate}
              </p>
              
              {education.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">{education.description}</p>
              )}
              
              {education.courses && education.courses.length > 0 && (
                <div className="space-y-2">
                  <p className="text-lg">Currently enrolled in the following courses:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                    {education.courses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {education.achievements && education.achievements.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xl font-semibold mb-2">Academic Achievements</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                    {education.achievements.map((achievement, index) => (
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
          <p>No education information found.</p>
        </div>
      )}
    </section>
  );
} 