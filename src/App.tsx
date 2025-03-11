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
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { userId, isAuthenticated } = useAuth();
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
            getProjects(true, userId), // Get featured projects only
            getAchievements(userId),
            getEducation(userId),
            getExtracurriculars(userId),
            getProfile(userId)
          ]);
        
        setProjects(projectsData);
        setAchievements(achievementsData);
        setEducation(educationData);
        setExtracurriculars(extracurricularsData);
        setProfile(profileData);
        
        // If no data is found, show migration button (only for authenticated users)
        if (
          isAuthenticated &&
          projectsData.length === 0 && 
          achievementsData.length === 0 && 
          educationData.length === 0 && 
          !profileData
        ) {
          setShowMigrationButton(true);
        } else {
          setShowMigrationButton(false);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, isAuthenticated]);

  const handleMigrateData = async () => {
    if (!userId) return;
    
    try {
      setMigrating(true);
      await migrateAllData(userId);
      alert('Data migration completed! Refreshing page...');
      window.location.reload();
    } catch (error) {
      console.error('Error during migration:', error);
      alert('Error during data migration. See console for details.');
    } finally {
      setMigrating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-b-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Content</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      
      <main>
        <AboutSection profile={profile} />
        
        {projects.length > 0 && <ProjectsSection projects={projects} loading={loading} error={error} />}
        
        {achievements.length > 0 && <AchievementsSection achievements={achievements} loading={loading} error={error} />}
        
        {education.length > 0 && <EducationSection educationItems={education} loading={loading} error={error} />}
        
        {extracurriculars.length > 0 && <ExtracurricularsSection extracurriculars={extracurriculars} loading={loading} error={error} />}
        
        <ContactSection />
        
        {showMigrationButton && (
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-xl font-bold mb-4">Admin Tools</h2>
            <button
              onClick={handleMigrateData}
              disabled={migrating}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {migrating ? 'Migrating Data...' : 'Migrate Data from Default Content'}
            </button>
            <p className="mt-2 text-sm text-gray-600">
              This will populate your content with sample data. Use only once.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;