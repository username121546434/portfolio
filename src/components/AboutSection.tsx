import React from 'react';
import { User } from 'lucide-react';
import { Profile } from '../types/Profile';

interface AboutSectionProps {
  profile: Profile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <User size={32} className="text-purple-600 dark:text-purple-400" />
        <h2 className="text-3xl font-bold">About Me</h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <p className="text-lg leading-relaxed">
          {profile?.bio || "I am a passionate software developer with a strong interest in competitive programming, algorithms, and building innovative solutions. I enjoy tackling challenging problems and continuously expanding my knowledge in the field of computer science."}
        </p>
      </div>
    </section>
  );
}