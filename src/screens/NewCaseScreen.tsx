import { useState } from 'react';

export default function NewCaseScreen() {
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
        <h3 className="text-base font-semibold text-[#0F172A] mb-1">New Clinical Case</h3>
        <p className="text-sm text-[#64748B] mb-6">Enter the presenting complaint and initial assessment</p>

        <div className="space-y-5">
          <div>
            <label className="form-label">Chief Complaint</label>
            <textarea
              value={chiefComplaint}
              onChange={e => setChiefComplaint(e.target.value)}
              className="form-input min-h-[80px]"
              placeholder="Describe the main reason for consultation..."
            />
          </div>

          <div>
            <label className="form-label">Symptoms</label>
            <textarea
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
              className="form-input min-h-[80px]"
              placeholder="List all symptoms..."
            />
          </div>

          <div>
            <label className="form-label">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="form-input max-w-xs"
              placeholder="e.g., 3 days, 2 weeks"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button className="btn-primary">Create Case</button>
            <button className="btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
