import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Database, BookOpen, Stethoscope, FileUp, Menu, X } from 'lucide-react';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import { useFileStore } from './store/fileStore';
import KnowledgeBaseScreen from './screens/KnowledgeBaseScreen';
import StudyEngineScreen from './screens/StudyEngineScreen';
import PharmacotherapyReviewScreen from './screens/PharmacotherapyReviewScreen';

function MediaManager() {
  const { files, fetchFiles } = useFileStore();

  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Media & Documents</h1>
        <p className="text-[var(--text-muted)]">Upload and manage your clinical media.</p>
      </div>

      <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
        <FileUploader category="general" />
      </div>

      <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
        <FileList files={files} />
      </div>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { to: '/', label: 'Pharmacotherapy Review', icon: Stethoscope },
    { to: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
    { to: '/study', label: 'Study Engine', icon: Database },
    { to: '/media', label: 'Media Manager', icon: FileUp },
  ];

  return (
    <>
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[var(--surface)] rounded-md border border-[var(--border)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[var(--surface)] border-r border-[var(--border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight">
            <Stethoscope size={24} strokeWidth={2.5} />
            CLINOVA
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">Pharmacy Support System</p>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--primary-container)] text-[var(--primary)]'
                    : 'text-[var(--text)] hover:bg-[var(--surface-dim)]'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 w-full">
          <Routes>
            <Route path="/" element={<PharmacotherapyReviewScreen />} />
            <Route path="/knowledge" element={<KnowledgeBaseScreen />} />
            <Route path="/study" element={<StudyEngineScreen />} />
            <Route path="/media" element={<MediaManager />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
