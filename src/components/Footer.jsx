import React from 'react';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 pt-10 pb-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            LMS
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering education through accessible digital library solutions. Manage, track, and discover knowledge effortlessly.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="/" className="hover:text-blue-400 transition">Browse Library</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Account Settings</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Search Catalog</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="/" className="hover:text-blue-400 transition">Help Center</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Library Rules</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Report Issue</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="/" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Terms of Service</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs">
          © 2026 LMS Pro System. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Github size={18} className="text-slate-500 hover:text-white cursor-pointer transition" />
          <Twitter size={18} className="text-slate-500 hover:text-white cursor-pointer transition" />
          <Linkedin size={18} className="text-slate-500 hover:text-white cursor-pointer transition" />
        </div>
      </div>
    </footer>
  );
}