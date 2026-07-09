const fs = require('fs');

let content = fs.readFileSync('src/screens/KnowledgeBaseManagerScreen.tsx', 'utf8');

const injection = `                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold">
                          <CheckCircle2 size={12} className="text-emerald-500" /> Indexed
                        </span>
                        {doc.aiProcessed && (
                           <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                             <Sparkles size={12} /> AI Integrated
                           </span>
                        )}
                      </div>
                    </td>`;

content = content.replace(/<td className="px-6 py-4">\s*<span className="flex items-center gap-1\.5 text-emerald-600 text-xs font-bold">\s*<CheckCircle2 size=\{14\} className="text-emerald-500" \/> Indexed\s*<\/span>\s*<\/td>/m, injection);
fs.writeFileSync('src/screens/KnowledgeBaseManagerScreen.tsx', content);
