import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Github, Linkedin, Check, AlertCircle } from 'lucide-react';

// Types for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Types for form submission status
interface FormStatus {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

export function ContactSection() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  // Form status state
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitting: false,
    submitted: false,
    error: null
  });
  
  // Form ref
  const form = useRef<HTMLFormElement>(null);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set submitting state
    setFormStatus({
      submitting: true,
      submitted: false,
      error: null
    });
    
    try {
      // Using the Vercel API endpoint
      // In development environment
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3001/api/contact'  // Local development
        : '/api/contact';                      // Production (Vercel)
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Set success state
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          submitted: false
        }));
      }, 5000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Set error state
      setFormStatus({
        submitting: false,
        submitted: false,
        error: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Phone size={32} className="text-green-600 dark:text-green-400" />
        <h2 className="text-3xl font-bold">Contact Me</h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              I'm always open to discussing new projects, opportunities, or collaborations. 
              Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-green-600 dark:text-green-400" size={20} />
                <a href="mailto:gokuleatharv06@gmail.com" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  gokuleatharv06@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Github className="text-green-600 dark:text-green-400" size={20} />
                <a href="https://github.com/username121546434" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  github.com/username121546434
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Linkedin className="text-green-600 dark:text-green-400" size={20} />
                <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  linkedin.com/in/atharv-gokule
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="text-green-600 dark:text-green-400" size={20} />
                <span>Kitchener, Ontario, Canada</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            {/* Success message */}
            {formStatus.submitted && (
              <div className="flex items-center gap-2 p-4 mb-4 bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 rounded-md">
                <Check size={20} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}
            
            {/* Error message */}
            {formStatus.error && (
              <div className="flex items-center gap-2 p-4 mb-4 bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400 rounded-md">
                <AlertCircle size={20} />
                <span>{formStatus.error}</span>
              </div>
            )}
            
            <form ref={form} className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange} 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors flex items-center justify-center ${formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 