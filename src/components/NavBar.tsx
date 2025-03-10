import React from 'react';
import { Home, User, Briefcase, Award, BookOpen, Phone } from 'lucide-react';

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Atharv Gokule</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <Home size={16} />
              <span>Home</span>
            </a>
            <a href="#about" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <User size={16} />
              <span>About</span>
            </a>
            <a href="#projects" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <Briefcase size={16} />
              <span>Projects</span>
            </a>
            <a href="#achievements" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <Award size={16} />
              <span>Achievements</span>
            </a>
            <a href="#education" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <BookOpen size={16} />
              <span>Education</span>
            </a>
            <a href="#extracurriculars" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <Award size={16} />
              <span>Extracurriculars</span>
            </a>
            <a href="#contact" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <Phone size={16} />
              <span>Contact</span>
            </a>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 