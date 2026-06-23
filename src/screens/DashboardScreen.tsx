import { Activity, Users, AlertTriangle, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const stats = [
  { label: 'Active Patients', value: '12', icon: Users, color: 'var(--primary)', bg: 'var(--primary-container)' },
  { label: 'Reviews Today', value: '8', icon: ClipboardList, color: 'var(--success)', bg: 'var(--success-container)' },
  { label: 'Drug Alerts', value: '3', icon: AlertTriangle, color: 'var(--warning)', bg: 'var(--warning-container)' },
  { label: 'Pending Cases', value: '5', icon: Activity, color: 'var(--danger)', bg: 'var(--danger-container)' },
];

const recentPatients = [
  { name: 'John Kamau', ip: 'IP-2024-3841', ward: 'Medical 3B', review: 'Pharmacotherapy' },
  { name: 'Mary Wanjiku', ip: 'IP-2024-3842', ward: 'Pediatrics', review: 'Drug Interaction' },
  { name: 'Peter Otieno', ip: 'IP-2024-3843', ward: 'Surgical 2A', review: 'Dose Adjustment' },
  { name: 'Grace Mwangi', ip: 'IP-2024-3844', ward: 'ICU', review: 'Renal Dosing' },
];

export default function DashboardScreen() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              variants={item}
              className="glass-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: s.bg }}
                >
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <span className="text-2xl font-bold text-[var(--text)]">{s.value}</span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">{s.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text)]">Active Patients</h3>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {recentPatients.map((p, i) => (
            <motion.div
              key={p.ip}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.06, ease: 'easeOut' }}
              className="px-5 py-3.5 flex items-center justify-between hover:bg-[var(--surface-dim)] transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-[var(--text)]">{p.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{p.ip} &middot; {p.ward}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--primary-container)] text-[var(--primary)] font-medium">
                {p.review}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
