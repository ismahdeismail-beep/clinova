import fs from 'fs';

let content = fs.readFileSync('src/screens/KnowledgeBaseScreen.tsx', 'utf8');

const overviewRegex = /                  \{\/\* OVERVIEW SECTION \*\/\}\n                  \{activeModuleSection === 'overview' && \([\s\S]*?                      \<\/div\>\n                    \<\/div\>\n                  \)\}/;

const overviewReplacement = `                  {/* OVERVIEW SECTION */}
                  {activeModuleSection === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                          <BookOpen size={18} className="text-[var(--primary)]" /> Module Overview
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">{moduleContent.overview}</p>
                      </div>
                    </div>
                  )}

                  {/* LEARNING OUTCOMES SECTION */}
                  {activeModuleSection === 'learning-outcomes' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                          <Award size={18} className="text-[var(--primary)]" /> Key Learning Outcomes
                        </h4>
                        <ul className="mt-4 space-y-3">
                          {moduleContent.learningObjectives.map((obj: string, i: number) => (
                            <li key={i} className="text-sm text-[var(--text)] flex items-start gap-3 leading-relaxed p-3 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)]">
                              <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xs shrink-0">{i+1}</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* LECTURE NOTES SECTION */}
                  {activeModuleSection === 'lecture-notes' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                          <FileText size={18} className="text-[var(--primary)]" /> Official Lecture Notes
                        </h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-bold text-[var(--text)] mb-2">Foundations of Anatomy & Physiology</h4>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{moduleContent.anatomyReview || 'No anatomy notes available for this module.'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[var(--text)] mb-2">Pathophysiological Mechanisms</h4>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{moduleContent.pathophysiology || 'No pathophysiology notes available for this module.'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}`;

content = content.replace(overviewRegex, overviewReplacement);
fs.writeFileSync('src/screens/KnowledgeBaseScreen.tsx', content);
