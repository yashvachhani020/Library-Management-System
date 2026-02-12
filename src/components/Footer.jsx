import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-slate-400">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              Library Management System
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A professional digital platform for managing library assets, student circulation, and academic resources securely.
            </p>
            <div className="flex gap-3">
              <button className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
                <Github size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-blue-400 hover:text-white hover:border-blue-400 transition">
                <Twitter size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-blue-700 hover:text-white hover:border-blue-700 transition">
                <Linkedin size={16} />
              </button>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition">Browse Catalog</li>
              <li className="hover:text-blue-500 cursor-pointer transition">Member Portal</li>
              <li className="hover:text-blue-500 cursor-pointer transition">Admin Access</li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition">Documentation</li>
              <li className="hover:text-blue-500 cursor-pointer transition">Library Rules</li>
              <li className="hover:text-blue-500 cursor-pointer transition">API Status</li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-blue-500 cursor-pointer transition">Terms of Service</li>
              <li className="hover:text-blue-500 cursor-pointer transition">Cookie Settings</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© 2026 Library Management System. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
            <span className="hover:text-white cursor-pointer transition">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}