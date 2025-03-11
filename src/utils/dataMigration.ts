import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// Function to migrate profile data
export const migrateProfile = async () => {
  try {
    // Check if profile already exists
    const profilesCollection = collection(db, 'profiles');
    const profileSnapshot = await getDocs(profilesCollection);
    
    if (!profileSnapshot.empty) {
      console.log('Profile already exists, skipping migration');
      return;
    }
    
    // Profile data from the current website
    const profileData = {
      name: 'Atharv Gokule',
      title: 'Software Developer',
      bio: 'Passionate about competitive programming and building innovative solutions.',
      avatarUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&h=200',
      githubUrl: 'https://github.com/username121546434',
      createdAt: serverTimestamp()
    };
    
    await addDoc(profilesCollection, profileData);
    console.log('Profile data migrated successfully');
  } catch (error) {
    console.error('Error migrating profile data:', error);
  }
};

// Function to migrate projects data
export const migrateProjects = async () => {
  try {
    // Check if projects already exist
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    
    if (!projectsSnapshot.empty) {
      console.log('Projects already exist, skipping migration');
      return;
    }
    
    // Project data from the current website
    const projectsData = [
      {
        name: 'pit-mopper',
        description: 'No description available',
        githubUrl: 'https://github.com/username121546434/pit-mopper',
        featured: true,
        order: 0,
        createdAt: serverTimestamp()
      },
      {
        name: 'Lastand',
        description: 'No description available',
        githubUrl: 'https://github.com/username121546434/Lastand',
        featured: true,
        order: 1,
        createdAt: serverTimestamp()
      },
      {
        name: 'TerminalVideoPlayer',
        description: 'No description available',
        githubUrl: 'https://github.com/username121546434/TerminalVideoPlayer',
        featured: true,
        order: 2,
        createdAt: serverTimestamp()
      }
    ];
    
    for (const project of projectsData) {
      await addDoc(projectsCollection, project);
    }
    
    console.log('Projects data migrated successfully');
  } catch (error) {
    console.error('Error migrating projects data:', error);
  }
};

// Function to migrate achievements data
export const migrateAchievements = async () => {
  try {
    // Check if achievements already exist
    const achievementsCollection = collection(db, 'achievements');
    const achievementsSnapshot = await getDocs(achievementsCollection);
    
    if (!achievementsSnapshot.empty) {
      console.log('Achievements already exist, skipping migration');
      return;
    }
    
    // Achievements data from the current website
    const achievementsData = [
      {
        title: "CCC Junior 2024",
        description: "Perfect score of 75/75 in the Canadian Computing Competition Junior division",
        year: "2024",
        order: 0,
        createdAt: serverTimestamp()
      },
      {
        title: "CCC Senior 2025",
        description: "Scored 27/75 in the Canadian Computing Competition Senior division",
        year: "2025",
        order: 1,
        createdAt: serverTimestamp()
      }
    ];
    
    for (const achievement of achievementsData) {
      await addDoc(achievementsCollection, achievement);
    }
    
    console.log('Achievements data migrated successfully');
  } catch (error) {
    console.error('Error migrating achievements data:', error);
  }
};

// Function to migrate education data
export const migrateEducation = async () => {
  try {
    // Check if education already exists
    const educationCollection = collection(db, 'education');
    const educationSnapshot = await getDocs(educationCollection);
    
    if (!educationSnapshot.empty) {
      console.log('Education already exists, skipping migration');
      return;
    }
    
    // Education data from the current website
    const educationData = [
      {
        institution: "Cameron Heights Collegiate Institute",
        startDate: "2023",
        endDate: "",
        present: true,
        courses: [
          "Advanced Functions",
          "Computer Science",
          "English",
          "Physics",
          "Calculus & Vectors"
        ],
        achievements: [
          "Honor Roll Student",
          "Top Grade in Computer Science",
          "Mathematics Competition Participant"
        ],
        order: 0,
        createdAt: serverTimestamp()
      }
    ];
    
    for (const education of educationData) {
      await addDoc(educationCollection, education);
    }
    
    console.log('Education data migrated successfully');
  } catch (error) {
    console.error('Error migrating education data:', error);
  }
};

// Function to migrate extracurriculars data
export const migrateExtracurriculars = async () => {
  try {
    // Check if extracurriculars already exist
    const extracurricularsCollection = collection(db, 'extracurriculars');
    const extracurricularsSnapshot = await getDocs(extracurricularsCollection);
    
    if (!extracurricularsSnapshot.empty) {
      console.log('Extracurriculars already exist, skipping migration');
      return;
    }
    
    // Extract extracurriculars data from ExtracurricularsSection component
    // This would be based on the data in the ExtracurricularsSection.tsx file
    const extracurricularsData = [
      {
        title: "Competitive Programming Club",
        organization: "School Club",
        description: "Founded and lead the competitive programming club at school, mentoring peers in algorithm design and problem-solving techniques.",
        startDate: "2023",
        endDate: "",
        present: true,
        role: "Founder & President",
        order: 0,
        createdAt: serverTimestamp()
      },
      {
        title: "Hackathon Participant",
        organization: "Various Events",
        description: "Participated in multiple hackathons, developing innovative solutions under time constraints and collaborating with diverse teams.",
        startDate: "2022",
        endDate: "",
        present: true,
        order: 1,
        createdAt: serverTimestamp()
      },
      {
        title: "Math Team",
        organization: "School Team",
        description: "Member of the school's mathematics team, competing in regional and national competitions and strengthening problem-solving skills.",
        startDate: "2023",
        endDate: "",
        present: true,
        order: 2,
        createdAt: serverTimestamp()
      }
    ];
    
    for (const extracurricular of extracurricularsData) {
      await addDoc(extracurricularsCollection, extracurricular);
    }
    
    console.log('Extracurriculars data migrated successfully');
  } catch (error) {
    console.error('Error migrating extracurriculars data:', error);
  }
};

// Function to run all migrations
export const migrateAllData = async () => {
  await migrateProfile();
  await migrateProjects();
  await migrateAchievements();
  await migrateEducation();
  await migrateExtracurriculars();
  
  console.log('All data migrated successfully!');
}; 