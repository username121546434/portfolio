import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { Octokit } from 'octokit';
import { Project } from './components/ProjectCard';
import { Achievement } from './components/AchievementCard';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ExtracurricularsSection } from './components/ExtracurricularsSection';
import { ContactSection } from './components/ContactSection';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const octokit = new Octokit();
        const projectNames = ['pit-mopper', 'Lastand', 'TerminalVideoPlayer'];
        
        const projectData = await Promise.all(
          projectNames.map(async (repo) => {
            const response = await octokit.request('GET /repos/{owner}/{repo}', {
              owner: 'username121546434',
              repo: repo,
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            });
            
            return {
              name: response.data.name,
              description: response.data.description || 'No description available',
              stars: response.data.stargazers_count,
              url: response.data.html_url
            };
          })
        );

        setProjects(projectData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch project data');
        setLoading(false);
        console.error('Error fetching GitHub data:', err);
      }
    };

    fetchProjects();
  }, []);

  const achievements: Achievement[] = [
    {
      title: "CCC Junior 2024",
      description: "Perfect score of 75/75 in the Canadian Computing Competition Junior division",
      year: "2024"
    },
    {
      title: "CCC Senior 2025",
      description: "Scored 27/75 in the Canadian Computing Competition Senior division",
      year: "2025"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <NavBar />
      
      {/* Hero Section */}
      <header id="home" className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&h=200"
            alt="Coding Background"
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-2">Atharv Gokule</h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-4">Software Developer</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Passionate about competitive programming and building innovative solutions</p>
        <a 
          href="https://github.com/username121546434" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          <Github size={20} />
          View GitHub Profile
        </a>
      </header>

      <AboutSection />
      <ProjectsSection projects={projects} loading={loading} error={error} />
      <AchievementsSection achievements={achievements} />
      <EducationSection />
      <ExtracurricularsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;