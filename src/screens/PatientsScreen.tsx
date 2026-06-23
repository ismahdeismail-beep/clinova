import { Search, MoreHorizontal } from 'lucide-react';

export default function PatientsScreen() {
  const patients = [
    { name: 'John Kamau', ip: 'IP-2024-3841', age: 45, sex: 'M', ward: 'Medical 3B', admission: '2024-12-10' },
    { name: 'Mary Wanjiku', ip: 'IP-2024-3842', age: 8, sex: 'F', ward: 'Pediatrics', admission: '2024-12-11' },
    { name: 'Peter Otieno', ip: 'IP-2024-3843', age: 62, sex: 'M', ward: 'Surgical 2A', admission: '2024-12-09' },
    { name: 'Grace Mwangi', ip: 'IP-2024-3844', age: 34, sex: 'F', ward: 'ICU', admission: '2024-12-08' },
    { name: 'Samuel Kiprop', ip: 'IP-2024-3845', age: 28, sex: 'M', ward: 'Casualty', admission: '2024-12-12' },
    { name: 'Emily Akinyi', ip: 'IP-2024-3846', age: 55, sex: 'F', ward: 'Medical 2A', admission: '2024-12-07' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-9 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#475569] uppercase tracking-wider">Patient</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#475569] uppercase tracking-wider">IP Number</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#475569] uppercase tracking-wider">Age/Sex</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#475569] uppercase tracking-wider">Ward</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#475569] uppercase tracking-wider">Admission</th>
              <th className="w-10 px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {patients.map((p) => (
              <tr key={p.ip} className="hover:bg-[#F8FAFC]">
                <td className="px-5 py-3.5 text-sm font-medium text-[#0F172A]">{p.name}</td>
                <td className="px-5 py-3.5 text-sm text-[#475569] font-mono">{p.ip}</td>
                <td className="px-5 py-3.5 text-sm text-[#475569]">{p.age}y / {p.sex}</td>
                <td className="px-5 py-3.5 text-sm text-[#475569]">{p.ward}</td>
                <td className="px-5 py-3.5 text-sm text-[#475569]">{p.admission}</td>
                <td className="px-5 py-3.5">
                  <button className="text-[#94A3B8] hover:text-[#475569] p-1">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
