import React from 'react';
import { BookOpen } from 'lucide-react';

export function EducationSection() {
  return (
    <section id="education" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={32} className="text-green-600 dark:text-green-400" />
        <h2 className="text-3xl font-bold">Education</h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Cameron Heights Collegiate Institute</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">2023 - Present</p>
          <div className="space-y-2">
            <p className="text-lg">Currently enrolled in the following courses:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Advanced Functions</li>
              <li>Computer Science</li>
              <li>English</li>
              <li>Physics</li>
              <li>Calculus & Vectors</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Academic Achievements</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Honor Roll Student</li>
            <li>Top Grade in Computer Science</li>
            <li>Mathematics Competition Participant</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 