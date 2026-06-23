import { Activity, Users, AlertTriangle, ClipboardList } from 'lucide-react';

export default function DashboardScreen() {
  const stats = [
    { label: 'Active Patients', value: '12', icon: Users, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Reviews Today', value: '8', icon: ClipboardList, color: '#16A34A', bg: '#F0FDF4' },
    { label: 'Drug Alerts', value: '3', icon: AlertTriangle, color: '#D97706', bg: '#FFFBEB' },
    { label: 'Pending Cases', value: '5', icon: Activity, color: '#DC2626', bg: '#FEF2F2' },
  ];

  const recentPatients = [
    { name: 'John Kamau', ip: 'IP-2024-3841', ward: 'Medical 3B', review: 'Pharmacotherapy' },
    { name: 'Mary Wanjiku', ip: 'IP-2024-3842', ward: 'Pediatrics', review: 'Drug Interaction' },
    { name: 'Peter Otieno', ip: 'IP-2024-3843', ward: 'Surgical 2A', review: 'Dose Adjustment' },
    { name: 'Grace Mwangi', ip: 'IP-2024-3844', ward: 'ICU', review: 'Renal Dosing' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <span className="text-2xl font-bold text-[#0F172A]">{s.value}</span>
              </div>
              <p className="text-sm text-[#64748B]">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <h3 className="text-sm font-semibold text-[#0F172A]">Active Patients</h3>
        </div>
        <div className="divide-y divide-[#E2E8F0]">
          {recentPatients.map((p) => (
            <div key={p.ip} className="px-5 py-3.5 flex items-center justify-between hover:bg-[#F8FAFC]">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{p.name}</p>
                <p className="text-xs text-[#64748B]">{p.ip} &middot; {p.ward}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] font-medium">
                {p.review}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
