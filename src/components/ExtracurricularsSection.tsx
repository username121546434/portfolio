import React from 'react';
import { Award } from 'lucide-react';

export function ExtracurricularsSection() {
  return (
    <section id="extracurriculars" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Award size={32} className="text-green-600 dark:text-green-400" />
        <h2 className="text-3xl font-bold">Extracurricular Activities</h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Programming Club</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Active member of the school's programming club, where I participate in coding challenges
            and collaborate with peers on various software projects.
          </p>
          <p className="text-gray-600 dark:text-gray-400 italic">2023 - Present</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Competitive Programming</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Regular participant in programming contests like CCC (Canadian Computing Competition),
            focusing on algorithm development and efficient problem-solving.
          </p>
          <p className="text-gray-600 dark:text-gray-400 italic">2023 - Present</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Math Club</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Member of the mathematics club, participating in various math competitions
            and working on challenging mathematical problems.
          </p>
          <p className="text-gray-600 dark:text-gray-400 italic">2023 - Present</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Open Source Contribution</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Active contributor to open-source projects on GitHub, helping to improve
            software used by people around the world.
          </p>
          <p className="text-gray-600 dark:text-gray-400 italic">2022 - Present</p>
        </div>
      </div>
    </section>
  );
} 