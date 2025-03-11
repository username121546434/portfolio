import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  orderBy, 
  where, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Project } from '../types/Project';
import { Achievement } from '../types/Achievement';
import { Education } from '../types/Education';
import { Extracurricular } from '../types/Extracurricular';
import { Profile } from '../types/Profile';

// Helper function to convert Firestore timestamps to Date objects
export const convertTimestamps = <T>(obj: any): T => {
  const result = { ...obj };
  
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Timestamp) {
      result[key] = obj[key].toDate();
    } else if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result[key] = convertTimestamps(obj[key]);
    }
  });
  
  return result as T;
};

// Get profile information (about me section)
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const profilesCollection = collection(db, 'profiles');
    const profilesQuery = query(profilesCollection, limit(1));
    const profilesSnapshot = await getDocs(profilesQuery);
    
    if (profilesSnapshot.empty) return null;
    
    const profileData = profilesSnapshot.docs[0].data();
    return convertTimestamps<Profile>({
      id: profilesSnapshot.docs[0].id,
      ...profileData
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Get projects
export const getProjects = async (featuredOnly = false): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, 'projects');
    let projectsQuery;
    
    if (featuredOnly) {
      projectsQuery = query(
        projectsCollection, 
        where('featured', '==', true), 
        orderBy('order', 'asc')
      );
    } else {
      projectsQuery = query(
        projectsCollection, 
        orderBy('order', 'asc')
      );
    }
    
    const projectsSnapshot = await getDocs(projectsQuery);
    return projectsSnapshot.docs.map(doc => 
      convertTimestamps<Project>({
        id: doc.id,
        ...doc.data()
      })
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Get achievements
export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const achievementsCollection = collection(db, 'achievements');
    const achievementsQuery = query(
      achievementsCollection, 
      orderBy('order', 'asc')
    );
    
    const achievementsSnapshot = await getDocs(achievementsQuery);
    return achievementsSnapshot.docs.map(doc => 
      convertTimestamps<Achievement>({
        id: doc.id,
        ...doc.data()
      })
    );
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

// Get education
export const getEducation = async (): Promise<Education[]> => {
  try {
    const educationCollection = collection(db, 'education');
    const educationQuery = query(
      educationCollection, 
      orderBy('order', 'asc')
    );
    
    const educationSnapshot = await getDocs(educationQuery);
    return educationSnapshot.docs.map(doc => 
      convertTimestamps<Education>({
        id: doc.id,
        ...doc.data()
      })
    );
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
};

// Get extracurriculars
export const getExtracurriculars = async (): Promise<Extracurricular[]> => {
  try {
    const extracurricularsCollection = collection(db, 'extracurriculars');
    const extracurricularsQuery = query(
      extracurricularsCollection, 
      orderBy('order', 'asc')
    );
    
    const extracurricularsSnapshot = await getDocs(extracurricularsQuery);
    return extracurricularsSnapshot.docs.map(doc => 
      convertTimestamps<Extracurricular>({
        id: doc.id,
        ...doc.data()
      })
    );
  } catch (error) {
    console.error('Error fetching extracurriculars:', error);
    return [];
  }
}; 