import React from 'react';
import ExamPrepView from '../components/ExamPrepView';

export default function ExamPrepScreen() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <ExamPrepView />
    </div>
  );
}
