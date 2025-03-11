import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Main function to migrate all data
export const migrateAllData = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required for data migration');
  }
  
  try {
    await Promise.all([
      migrateProfile(userId),
      migrateProjects(userId),
      migrateAchievements(userId),
      migrateEducation(userId),
      migrateExtracurriculars(userId)
    ]);
    
    console.log('All data migrated successfully');
    return true;
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
};

// Function to migrate profile data
export const migrateProfile = async (userId: string) => {
  try {
    // Create profile document in the user's collection
    const profileRef = doc(db, `users/${userId}/content/profile`);
    
    // Set the profile data
    await setDoc(profileRef, {
      name: "Atharv Gokule",
      subtitle: "Student & Developer",
      bio: "I'm a passionate high school student interested in software development, mathematics, and competitive programming. I enjoy building applications and solving complex problems.",
      location: "California, USA",
      email: "gokuleatharv06@gmail.com",
      github: "https://github.com/username121546434",
      website: "https://theatharv.co",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Profile data migrated successfully');
  } catch (error) {
    console.error('Error migrating profile data:', error);
    throw error;
  }
};

// Function to migrate projects data
export const migrateProjects = async (userId: string) => {
  try {
    // Create projects collection in the user's content area
    const projectsCollection = collection(db, `users/${userId}/content/projects/items`);
    
    // Define project data
    const projectsData = [
      {
        title: "Neural Network Visualizer",
        description: "An interactive web application that visualizes how neural networks learn and make predictions. Built with React and TensorFlow.js.",
        technologies: ["React", "TypeScript", "TensorFlow.js", "D3.js"],
        imageUrl: "https://placehold.co/600x400/png",
        projectUrl: "https://github.com/example/neural-visualizer",
        demoUrl: "https://neural-visualizer.example.com",
        featured: true,
        order: 0,
        createdAt: serverTimestamp()
      },
      {
        title: "Algorithmic Problem Solver",
        description: "A platform that helps users solve algorithmic problems by visualizing the solution process and providing step-by-step explanations.",
        technologies: ["Python", "Django", "JavaScript", "AlgorithmX"],
        imageUrl: "https://placehold.co/600x400/png",
        projectUrl: "https://github.com/example/algo-solver",
        demoUrl: "https://algo-solver.example.com",
        featured: true,
        order: 1,
        createdAt: serverTimestamp()
      },
      {
        title: "Smart Study Scheduler",
        description: "An application that creates optimized study schedules based on spaced repetition principles to maximize learning efficiency.",
        technologies: ["React Native", "Firebase", "Redux", "Machine Learning"],
        imageUrl: "https://placehold.co/600x400/png",
        projectUrl: "https://github.com/example/study-scheduler",
        demoUrl: "https://study-scheduler.example.com",
        featured: true,
        order: 2,
        createdAt: serverTimestamp()
      }
    ];
    
    // Add each project to the collection
    for (const project of projectsData) {
      await addDoc(projectsCollection, project);
    }
    
    console.log('Projects data migrated successfully');
  } catch (error) {
    console.error('Error migrating projects data:', error);
    throw error;
  }
};

// Function to migrate achievements data
export const migrateAchievements = async (userId: string) => {
  try {
    // Create achievements collection in the user's content area
    const achievementsCollection = collection(db, `users/${userId}/content/academicAchievements/items`);
    
    // Define achievements data
    const achievementsData = [
      {
        title: "National Merit Scholar Finalist",
        description: "Recognized as a National Merit Scholar Finalist based on PSAT/NMSQT scores and academic achievements.",
        year: 2023,
        order: 0,
        createdAt: serverTimestamp()
      },
      {
        title: "USA Computing Olympiad - Gold Division",
        description: "Qualified for the Gold Division in the USA Computing Olympiad by demonstrating advanced algorithmic problem-solving skills.",
        year: 2022,
        order: 1,
        createdAt: serverTimestamp()
      },
      {
        title: "AP Scholar with Distinction",
        description: "Earned the AP Scholar with Distinction award by achieving an average score of 3.5 on all AP exams taken, and scores of 3 or higher on five or more of these exams.",
        year: 2023,
        order: 2,
        createdAt: serverTimestamp()
      },
      {
        title: "International Mathematics Competition - Silver Medal",
        description: "Won a silver medal at the International Mathematics Competition for High School Students.",
        year: 2022,
        order: 3,
        createdAt: serverTimestamp()
      }
    ];
    
    // Add each achievement to the collection
    for (const achievement of achievementsData) {
      await addDoc(achievementsCollection, achievement);
    }
    
    console.log('Achievements data migrated successfully');
  } catch (error) {
    console.error('Error migrating achievements data:', error);
    throw error;
  }
};

// Function to migrate education data
export const migrateEducation = async (userId: string) => {
  try {
    // Create education collection in the user's content area
    const educationCollection = collection(db, `users/${userId}/content/education/items`);
    
    // Define education data
    const educationData = [
      {
        institution: "Prestigious High School",
        degree: "High School Diploma",
        fieldOfStudy: "Advanced STEM Curriculum",
        startDate: "2020",
        endDate: "2024",
        present: true,
        description: "Advanced coursework in Computer Science, Mathematics, and Physics. Participated in multiple research projects and programming competitions.",
        gpa: "4.0",
        order: 0,
        createdAt: serverTimestamp()
      },
      {
        institution: "Online Learning Platform",
        degree: "Certification",
        fieldOfStudy: "Machine Learning & Artificial Intelligence",
        startDate: "2022",
        endDate: "2022",
        present: false,
        description: "Completed comprehensive certification program covering neural networks, computer vision, natural language processing, and reinforcement learning.",
        order: 1,
        createdAt: serverTimestamp()
      }
    ];
    
    // Add each education item to the collection
    for (const education of educationData) {
      await addDoc(educationCollection, education);
    }
    
    console.log('Education data migrated successfully');
  } catch (error) {
    console.error('Error migrating education data:', error);
    throw error;
  }
};

// Function to migrate extracurriculars data
export const migrateExtracurriculars = async (userId: string) => {
  try {
    // Create extracurriculars collection in the user's content area
    const extracurricularsCollection = collection(db, `users/${userId}/content/extracurricularActivities/items`);
    
    // Define extracurriculars data
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
    
    // Add each extracurricular to the collection
    for (const extracurricular of extracurricularsData) {
      await addDoc(extracurricularsCollection, extracurricular);
    }
    
    console.log('Extracurriculars data migrated successfully');
  } catch (error) {
    console.error('Error migrating extracurriculars data:', error);
    throw error;
  }
}; 