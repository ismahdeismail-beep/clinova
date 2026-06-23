import React, { useEffect } from 'react';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import { useFileStore } from './store/fileStore';

function App() {
  const { files, fetchFiles } = useFileStore();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Clinova OS Media</h1>
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
    </div>
  );
}

export default App;
