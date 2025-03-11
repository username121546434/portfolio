import React, { useState } from 'react';
import { Mail, Github, Instagram, Youtube, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AdminLoginModal } from './AdminLoginModal';

export function Footer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, signOut, currentUser } = useAuth();

  const handleAdminAction = () => {
    if (isAuthenticated) {
      // If authenticated, ask if they want to logout
      if (window.confirm('Do you want to log out?')) {
        signOut();
      }
    } else {
      // If not authenticated, open login modal
      setIsLoginModalOpen(true);
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Atharv Gokule. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:gokuleatharv06@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="https://github.com/username121546434"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://instagram.com/superheroyrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://youtube.com/@Superheroyrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
            <button
              onClick={handleAdminAction}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
              aria-label={isAuthenticated ? "Admin Logout" : "Admin Login"}
            >
              {isAuthenticated ? (
                <>
                  <LogOut size={20} />
                  <span className="text-xs">Admin</span>
                </>
              ) : (
                <>
                  <Settings size={20} />
                  <span className="text-xs">Admin</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {isAuthenticated && currentUser && (
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Connected as: {currentUser.email}
          </div>
        )}
      </div>
      
      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </footer>
  );
}
