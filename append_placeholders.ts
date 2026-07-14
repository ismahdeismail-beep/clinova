import fs from 'fs';

let content = fs.readFileSync('src/screens/KnowledgeBaseScreen.tsx', 'utf8');

const placeholder = `
                  {!['overview', 'pharmacology', 'clinical', 'practice', 'summary'].includes(activeModuleSection) && (
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center animate-in fade-in duration-300">
                      <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles size={32} className="text-[var(--text-muted)]" />
                      </div>
                      <h2 className="text-xl font-bold text-[var(--text)]">Coming Soon</h2>
                      <p className="text-[var(--text-muted)] mt-2 max-w-md mx-auto">
                        This section is currently under development. Please check back later.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
`;

content = content.replace(/ {16}<\/div>\n {14}<\/div>\n {12}\)\}\n {10}<\/div>/m, placeholder + '          </div>');

fs.writeFileSync('src/screens/KnowledgeBaseScreen.tsx', content);
