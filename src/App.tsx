import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ExtracurricularsSection } from './components/ExtracurricularsSection';
import { ContactSection } from './components/ContactSection';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Project } from './types/Project';
import { Achievement } from './types/Achievement';
import { Education } from './types/Education';
import { Extracurricular } from './types/Extracurricular';
import { Profile } from './types/Profile';
import { 
  getProjects, 
  getAchievements, 
  getEducation, 
  getExtracurriculars,
  getProfile
} from './utils/firestore';
import { migrateAllData } from './utils/dataMigration';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMigrationButton, setShowMigrationButton] = useState(false);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data from Firestore
        const [projectsData, achievementsData, educationData, extracurricularsData, profileData] = 
          await Promise.all([
            getProjects(true), // Get featured projects only
            getAchievements(),
            getEducation(),
            getExtracurriculars(),
            getProfile()
          ]);
        
        setProjects(projectsData);
        setAchievements(achievementsData);
        setEducation(educationData);
        setExtracurriculars(extracurricularsData);
        setProfile(profileData);
        
        // If no data is found, show migration button
        if (
          projectsData.length === 0 && 
          achievementsData.length === 0 && 
          educationData.length === 0 && 
          !profileData
        ) {
          setShowMigrationButton(true);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMigrateData = async () => {
    try {
      setMigrating(true);
      await migrateAllData();
      
      // Refresh the data after migration
      const [projectsData, achievementsData, educationData, extracurricularsData, profileData] = 
        await Promise.all([
          getProjects(true),
          getAchievements(),
          getEducation(),
          getExtracurriculars(),
          getProfile()
        ]);
      
      setProjects(projectsData);
      setAchievements(achievementsData);
      setEducation(educationData);
      setExtracurriculars(extracurricularsData);
      setProfile(profileData);
      
      setShowMigrationButton(false);
      setMigrating(false);
    } catch (error) {
      console.error('Error migrating data:', error);
      setError('Failed to migrate data');
      setMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <NavBar />
      
      {/* Migration Button (only visible if no data is found) */}
      {showMigrationButton && (
        <div className="fixed top-20 right-4 z-50 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">First-time Setup</h3>
          <p className="mb-3">No data found in Firestore. Would you like to migrate your existing data?</p>
          <button 
            onClick={handleMigrateData} 
            disabled={migrating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {migrating ? 'Migrating...' : 'Migrate Data'}
          </button>
        </div>
      )}
      
      {/* Hero Section */}
      <header id="home" className="container mx-auto px-4 py-16 text-center">
        {loading ? (
          <div className="animate-pulse">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded max-w-md mx-auto mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded max-w-sm mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded max-w-lg mx-auto mb-8"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 dark:text-red-400">
            <p>{error}</p>
          </div>
        ) : profile ? (
          <>
            <div className="mb-8">
              <img 
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&h=200"}
                alt={`${profile.name} avatar`}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{profile.name}</h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-4">{profile.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{profile.bio || profile.tagline}</p>
            {profile.githubUrl && (
              <a 
                href={profile.githubUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <Github size={20} />
                View GitHub Profile
              </a>
            )}
          </>
        ) : (
          <div className="text-gray-600 dark:text-gray-300">
            <p>No profile information available.</p>
          </div>
        )}
      </header>

      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} loading={loading} error={error} />
      <AchievementsSection achievements={achievements} loading={loading} error={error} />
      <EducationSection educationItems={education} loading={loading} error={error} />
      <ExtracurricularsSection extracurriculars={extracurriculars} loading={loading} error={error} />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;