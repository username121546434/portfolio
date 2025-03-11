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

// Get profile information
export const getProfile = async (userId: string | null = null): Promise<Profile | null> => {
  try {
    let profileDoc;
    
    if (userId) {
      // If userId is provided, get from user-specific collection
      profileDoc = doc(db, `users/${userId}/content/profile`);
    } else {
      // Legacy fallback to global collection
      profileDoc = doc(db, 'profile', 'main');
    }
    
    const profileSnapshot = await getDoc(profileDoc);
    
    if (!profileSnapshot.exists() && userId) {
      // If not found in user's collection, try legacy global collection as fallback
      const legacyProfileDoc = doc(db, 'profile', 'main');
      const legacyProfileSnapshot = await getDoc(legacyProfileDoc);
      
      if (legacyProfileSnapshot.exists()) {
        return convertTimestamps<Profile>(legacyProfileSnapshot.data());
      }
      return null;
    }
    
    if (!profileSnapshot.exists()) {
      return null;
    }
    
    return convertTimestamps<Profile>(profileSnapshot.data());
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Get projects
export const getProjects = async (featuredOnly = false, userId: string | null = null): Promise<Project[]> => {
  try {
    let projectsCollection;
    
    if (userId) {
      // If userId is provided, get from user-specific collection
      projectsCollection = collection(db, `users/${userId}/content/projects/items`);
    } else {
      // Legacy fallback to global collection
      projectsCollection = collection(db, 'projects');
    }
    
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
    
    // If no projects found in user collection and we have a userId, try legacy collection as fallback
    if (projectsSnapshot.empty && userId) {
      const legacyCollection = collection(db, 'projects');
      const legacyQuery = featuredOnly 
        ? query(legacyCollection, where('featured', '==', true), orderBy('order', 'asc'))
        : query(legacyCollection, orderBy('order', 'asc'));
      
      const legacySnapshot = await getDocs(legacyQuery);
      
      return legacySnapshot.docs.map(doc => 
        convertTimestamps<Project>({
          id: doc.id,
          ...doc.data()
        })
      );
    }
    
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
export const getAchievements = async (userId: string | null = null): Promise<Achievement[]> => {
  try {
    let achievementsCollection;
    
    if (userId) {
      // If userId is provided, get from user-specific collection
      achievementsCollection = collection(db, `users/${userId}/content/academicAchievements/items`);
    } else {
      // Legacy fallback to global collection
      achievementsCollection = collection(db, 'achievements');
    }
    
    const achievementsQuery = query(
      achievementsCollection, 
      orderBy('order', 'asc')
    );
    
    const achievementsSnapshot = await getDocs(achievementsQuery);
    
    // If no achievements found in user collection and we have a userId, try legacy collection as fallback
    if (achievementsSnapshot.empty && userId) {
      const legacyCollection = collection(db, 'achievements');
      const legacyQuery = query(legacyCollection, orderBy('order', 'asc'));
      const legacySnapshot = await getDocs(legacyQuery);
      
      return legacySnapshot.docs.map(doc => 
        convertTimestamps<Achievement>({
          id: doc.id,
          ...doc.data()
        })
      );
    }
    
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
export const getEducation = async (userId: string | null = null): Promise<Education[]> => {
  try {
    let educationCollection;
    
    if (userId) {
      // If userId is provided, get from user-specific collection
      educationCollection = collection(db, `users/${userId}/content/education/items`);
    } else {
      // Legacy fallback to global collection
      educationCollection = collection(db, 'education');
    }
    
    const educationQuery = query(
      educationCollection, 
      orderBy('order', 'asc')
    );
    
    const educationSnapshot = await getDocs(educationQuery);
    
    // If no education found in user collection and we have a userId, try legacy collection as fallback
    if (educationSnapshot.empty && userId) {
      const legacyCollection = collection(db, 'education');
      const legacyQuery = query(legacyCollection, orderBy('order', 'asc'));
      const legacySnapshot = await getDocs(legacyQuery);
      
      return legacySnapshot.docs.map(doc => 
        convertTimestamps<Education>({
          id: doc.id,
          ...doc.data()
        })
      );
    }
    
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
export const getExtracurriculars = async (userId: string | null = null): Promise<Extracurricular[]> => {
  try {
    let extracurricularsCollection;
    
    if (userId) {
      // If userId is provided, get from user-specific collection
      extracurricularsCollection = collection(db, `users/${userId}/content/extracurricularActivities/items`);
    } else {
      // Legacy fallback to global collection
      extracurricularsCollection = collection(db, 'extracurriculars');
    }
    
    const extracurricularsQuery = query(
      extracurricularsCollection, 
      orderBy('order', 'asc')
    );
    
    const extracurricularsSnapshot = await getDocs(extracurricularsQuery);
    
    // If no extracurriculars found in user collection and we have a userId, try legacy collection as fallback
    if (extracurricularsSnapshot.empty && userId) {
      const legacyCollection = collection(db, 'extracurriculars');
      const legacyQuery = query(legacyCollection, orderBy('order', 'asc'));
      const legacySnapshot = await getDocs(legacyQuery);
      
      return legacySnapshot.docs.map(doc => 
        convertTimestamps<Extracurricular>({
          id: doc.id,
          ...doc.data()
        })
      );
    }
    
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