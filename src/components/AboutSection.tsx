import { User } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <User size={32} className="text-green-600 dark:text-green-400" />
        <h2 className="text-3xl font-bold">About Me</h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          I am a 15 year old programmer living in Canada.
        </p>
      </div>
    </section>
  );
}