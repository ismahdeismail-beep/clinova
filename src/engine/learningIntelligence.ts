// ============================================================
// Clinova Learning Intelligence Service
// Tracks educational progress, personalizes recommendations
// ============================================================

// ============================================================
// Types
// ============================================================

export interface StudySession {
  id: string;
  userId: string;
  type: 'reading' | 'flashcard_review' | 'quiz' | 'oral_practice' | 'clinical_case' | 'revision' | 'ai_chat' | 'study_guide' | 'note_taking';
  resourceId?: string;
  resourceTitle?: string;
  discipline: string;
  unit?: string;
  topic?: string;
  duration: number;
  score?: number;
  itemsReviewed?: number;
  itemsCorrect?: number;
  completedAt: number;
}

export interface LearnerProfile {
  userId: string;
  educationalLevel: string;
  disciplines: string[];
  strongAreas: string[];
  weakAreas: string[];
  recentlyStudied: string[];
  completedTopics: string[];
  savedResources: string[];
  revisionFrequency: Record<string, number>;
  learningStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalStudyMinutes: number;
  sessionsCompleted: number;
  averageScore: number;
  performanceByDiscipline: Record<string, { sessions: number; avgScore: number; totalMinutes: number }>;
  createdAt: number;
  updatedAt: number;
}

export interface PersonalizedRecommendation {
  type: 'resource' | 'flashcard_review' | 'quiz' | 'clinical_case' | 'oral_practice' | 'study_guide' | 'revision_note';
  title: string;
  resourceId?: string;
  reason: string;
  priority: number;
  urgency: 'immediate' | 'today' | 'this_week' | 'this_month';
}

export interface WeakArea {
  topic: string;
  score: number;
  urgency: string;
  recommendedAction: string;
  sessionsCount: number;
}

export interface PerformanceTrend {
  date: string;
  score: number;
  sessions: number;
  totalDuration: number;
}

export interface RevisionScheduleItem {
  day: string;
  topics: string[];
  estimatedMinutes: number;
}

export interface DueReviewItem {
  topic: string;
  daysSinceLastReview: number;
  priority: number;
  reason: string;
}

// ============================================================
// Learning Intelligence — Main Class
// ============================================================

export class LearningIntelligence {
  private profiles: Map<string, LearnerProfile> = new Map();
  private sessions: Map<string, StudySession[]> = new Map();
  private static PROFILE_PREFIX = 'clinova_li_profile_';
  private static SESSIONS_PREFIX = 'clinova_li_sessions_';

  constructor() {
    this.loadFromStorage();
  }

  // ============================================================
  // Session Recording
  // ============================================================

  recordSession(session: StudySession): LearnerProfile {
    const userId = session.userId;

    // Store session
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, []);
    }
    this.sessions.get(userId)!.push(session);

    // Get or create profile
    const profile = this.getProfile(userId);

    // Update profile
    profile.sessionsCompleted++;
    profile.totalStudyMinutes += session.duration;
    profile.lastActiveDate = new Date().toISOString().split('T')[0];

    if (session.score !== undefined) {
      const prevTotal = profile.averageScore * (profile.sessionsCompleted - 1);
      profile.averageScore = Math.round((prevTotal + session.score) / profile.sessionsCompleted);
    }

    if (session.topic) {
      if (!profile.recentlyStudied.includes(session.topic)) {
        profile.recentlyStudied.unshift(session.topic);
        if (profile.recentlyStudied.length > 20) profile.recentlyStudied.pop();
      }
      profile.revisionFrequency[session.topic] = Date.now();
    }

    // Update discipline performance
    if (!profile.performanceByDiscipline[session.discipline]) {
      profile.performanceByDiscipline[session.discipline] = { sessions: 0, avgScore: 0, totalMinutes: 0 };
    }
    const perf = profile.performanceByDiscipline[session.discipline];
    perf.sessions++;
    perf.totalMinutes += session.duration;
    if (session.score !== undefined) {
      const prevAvg = perf.avgScore * (perf.sessions - 1);
      perf.avgScore = Math.round((prevAvg + session.score) / perf.sessions);
    }

    // Update streak
    profile.learningStreak = this.calculateStreak(userId);
    if (profile.learningStreak > profile.longestStreak) {
      profile.longestStreak = profile.learningStreak;
    }

    // Update weak/strong areas
    this.updateAreas(userId);

    profile.updatedAt = Date.now();
    this.persistProfile(profile);
    this.persistSessions(userId);

    return profile;
  }

  // ============================================================
  // Profile Management
  // ============================================================

  getProfile(userId: string): LearnerProfile {
    if (!this.profiles.has(userId)) {
      const newProfile: LearnerProfile = {
        userId,
        educationalLevel: 'General',
        disciplines: [],
        strongAreas: [],
        weakAreas: [],
        recentlyStudied: [],
        completedTopics: [],
        savedResources: [],
        revisionFrequency: {},
        learningStreak: 0,
        longestStreak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        totalStudyMinutes: 0,
        sessionsCompleted: 0,
        averageScore: 0,
        performanceByDiscipline: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      this.profiles.set(userId, newProfile);
      return newProfile;
    }
    return this.profiles.get(userId)!;
  }

  updateProfile(userId: string, updates: Partial<LearnerProfile>): LearnerProfile {
    const profile = this.getProfile(userId);
    Object.assign(profile, updates, { updatedAt: Date.now() });
    this.persistProfile(profile);
    return profile;
  }

  // ============================================================
  // Area Analysis
  // ============================================================

  updateAreas(userId: string): void {
    const profile = this.getProfile(userId);
    const userSessions = this.sessions.get(userId) || [];

    // Group sessions by topic
    const topicScores: Record<string, { total: number; count: number; recent: number }> = {};

    for (const session of userSessions) {
      if (!session.topic) continue;
      if (!topicScores[session.topic]) {
        topicScores[session.topic] = { total: 0, count: 0, recent: 0 };
      }
      topicScores[session.topic].total += session.score || 0;
      topicScores[session.topic].count++;
      // Recent sessions weigh more (last 7 days)
      const daysAgo = (Date.now() - session.completedAt) / (1000 * 60 * 60 * 24);
      if (daysAgo <= 7) topicScores[session.topic].recent++;
    }

    const strongAreas: string[] = [];
    const weakAreas: string[] = [];

    for (const [topic, data] of Object.entries(topicScores)) {
      const avgScore = data.total / data.count;
      if (avgScore >= 80 && data.count >= 2) {
        strongAreas.push(topic);
      } else if (avgScore < 60 || (avgScore < 70 && data.count >= 3)) {
        weakAreas.push(topic);
      }
    }

    profile.strongAreas = [...new Set(strongAreas)];
    profile.weakAreas = [...new Set(weakAreas)];
  }

  // ============================================================
  // Streak Calculation
  // ============================================================

  calculateStreak(userId: string): number {
    const userSessions = this.sessions.get(userId) || [];
    if (userSessions.length === 0) return 0;

    // Get unique dates with activity
    const activeDates = new Set<string>();
    for (const session of userSessions) {
      const date = new Date(session.completedAt).toISOString().split('T')[0];
      activeDates.add(date);
    }

    const sortedDates = Array.from(activeDates).sort().reverse();
    if (sortedDates.length === 0) return 0;

    let streak = 1;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Streak must include today or yesterday to be active
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) return 0;

    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i - 1]);
      const previous = new Date(sortedDates[i]);
      const diffDays = (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

      if (Math.round(diffDays) === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  // ============================================================
  // Personalized Recommendations
  // ============================================================

  getRecommendations(userId: string, limit: number = 5): PersonalizedRecommendation[] {
    const profile = this.getProfile(userId);
    const recommendations: PersonalizedRecommendation[] = [];

    // 1. Focus on weak areas first
    for (const weakArea of profile.weakAreas.slice(0, 3)) {
      recommendations.push({
        type: 'flashcard_review',
        title: `Review: ${weakArea}`,
        reason: `You need practice in ${weakArea} (average score below 60%)`,
        priority: 0.95,
        urgency: 'immediate',
      });
      recommendations.push({
        type: 'quiz',
        title: `Quiz: ${weakArea}`,
        reason: `Test your knowledge of ${weakArea} to improve`,
        priority: 0.9,
        urgency: 'today',
      });
    }

    // 2. Suggest revisiting topics due for spaced repetition
    const dueItems = this.getDueForReview(userId);
    for (const item of dueItems.slice(0, 3)) {
      recommendations.push({
        type: 'revision_note',
        title: `Revise: ${item.topic}`,
        reason: item.reason,
        priority: item.priority,
        urgency: item.priority > 0.8 ? 'immediate' : 'this_week',
      });
    }

    // 3. Suggest next topic to study
    const nextTopic = this.suggestNextTopic(userId);
    if (nextTopic) {
      recommendations.push({
        type: 'study_guide',
        title: `Study: ${nextTopic.topic}`,
        resourceId: nextTopic.unit,
        reason: nextTopic.reason,
        priority: 0.7,
        urgency: 'this_week',
      });
    }

    // 4. Recommend clinical cases (high value learning)
    const recentDisciplines = profile.recentlyStudied.slice(0, 3);
    for (const discipline of recentDisciplines) {
      recommendations.push({
        type: 'clinical_case',
        title: `Clinical Case: ${discipline}`,
        reason: `Apply your knowledge of ${discipline} to a real clinical scenario`,
        priority: 0.65,
        urgency: 'this_week',
      });
    }

    // Sort by priority and return top N
    recommendations.sort((a, b) => b.priority - a.priority);
    return recommendations.slice(0, limit);
  }

  // ============================================================
  // Weak Area Analysis
  // ============================================================

  identifyWeakAreas(userId: string): WeakArea[] {
    const profile = this.getProfile(userId);
    const userSessions = this.sessions.get(userId) || [];
    const weakAreas: WeakArea[] = [];
    const topicData: Record<string, { scores: number[]; count: number; lastSession: number }> = {};

    for (const session of userSessions) {
      if (!session.topic || session.score === undefined) continue;
      if (!topicData[session.topic]) {
        topicData[session.topic] = { scores: [], count: 0, lastSession: 0 };
      }
      topicData[session.topic].scores.push(session.score);
      topicData[session.topic].count++;
      topicData[session.topic].lastSession = Math.max(topicData[session.topic].lastSession, session.completedAt);
    }

    for (const [topic, data] of Object.entries(topicData)) {
      const avgScore = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      if (avgScore < 70 && data.count >= 1) {
        const daysSinceLastReview = (Date.now() - data.lastSession) / (1000 * 60 * 60 * 24);
        const urgency = daysSinceLastReview > 7 ? 'high' : daysSinceLastReview > 3 ? 'medium' : 'low';

        let recommendedAction = 'Review core concepts and take a practice quiz';
        if (avgScore < 40) recommendedAction = 'Start with fundamentals, use study guide';
        else if (avgScore < 60) recommendedAction = 'Review with flashcards and practice questions';

        weakAreas.push({
          topic,
          score: Math.round(avgScore),
          urgency,
          recommendedAction,
          sessionsCount: data.count,
        });
      }
    }

    // Sort by score ascending (worst first)
    weakAreas.sort((a, b) => a.score - b.score);
    return weakAreas;
  }

  // ============================================================
  // Next Topic Suggestion
  // ============================================================

  suggestNextTopic(userId: string): { discipline: string; unit: string; topic: string; reason: string } | null {
    const profile = this.getProfile(userId);
    const userSessions = this.sessions.get(userId) || [];

    // If user has weak areas, suggest fixing those first
    if (profile.weakAreas.length > 0) {
      return {
        discipline: profile.disciplines[0] || 'Clinical Pharmacy',
        unit: profile.weakAreas[0],
        topic: profile.weakAreas[0],
        reason: `You scored low in ${profile.weakAreas[0]}. Let's improve your understanding.`,
      };
    }

    // If no topics studied yet, suggest starting with fundamentals
    if (userSessions.length === 0) {
      return {
        discipline: 'Pharmacology',
        unit: 'General Pharmacology',
        topic: 'Introduction to Pharmacology',
        reason: 'Start your learning journey with the fundamentals of pharmacology.',
      };
    }

    // Suggest continuing with a discipline the user has started
    const disciplineSessions: Record<string, number> = {};
    for (const session of userSessions) {
      disciplineSessions[session.discipline] = (disciplineSessions[session.discipline] || 0) + 1;
    }

    const mostStudied = Object.entries(disciplineSessions).sort((a, b) => b[1] - a[1]);
    if (mostStudied.length > 0) {
      return {
        discipline: mostStudied[0][0],
        unit: profile.recentlyStudied[0] || 'General',
        topic: profile.recentlyStudied[0] || 'Continue your studies',
        reason: `You've been studying ${mostStudied[0][0]}. Continue building on your knowledge.`,
      };
    }

    return null;
  }

  // ============================================================
  // Revision Schedule Generator
  // ============================================================

  generateRevisionSchedule(userId: string, daysAhead: number = 7): RevisionScheduleItem[] {
    const schedule: RevisionScheduleItem[] = [];
    const weakAreas = this.identifyWeakAreas(userId);
    const dueItems = this.getDueForReview(userId);

    // Combine weak areas and due items, deduplicate
    const allTopics = new Map<string, { topic: string; priority: number }>();
    for (const area of weakAreas) {
      allTopics.set(area.topic, { topic: area.topic, priority: 1 - area.score / 100 });
    }
    for (const item of dueItems) {
      const existing = allTopics.get(item.topic);
      if (!existing || item.priority > existing.priority) {
        allTopics.set(item.topic, { topic: item.topic, priority: item.priority });
      }
    }

    const sorted = Array.from(allTopics.values()).sort((a, b) => b.priority - a.priority);

    // Distribute topics across days
    const topicsPerDay = Math.max(1, Math.ceil(sorted.length / daysAhead));
    for (let day = 0; day < daysAhead; day++) {
      const start = day * topicsPerDay;
      const dayTopics = sorted.slice(start, start + topicsPerDay);
      if (dayTopics.length === 0) continue;

      const date = new Date(Date.now() + day * 86400000);
      schedule.push({
        day: date.toISOString().split('T')[0],
        topics: dayTopics.map((t) => t.topic),
        estimatedMinutes: dayTopics.length * 30,
      });
    }

    return schedule;
  }

  // ============================================================
  // Performance Trends
  // ============================================================

  getPerformanceTrends(userId: string, days: number = 30): PerformanceTrend[] {
    const userSessions = this.sessions.get(userId) || [];
    const cutoff = Date.now() - days * 86400000;
    const recentSessions = userSessions.filter((s) => s.completedAt >= cutoff && s.score !== undefined);

    // Group by date
    const byDate: Record<string, { totalScore: number; count: number; totalDuration: number }> = {};
    for (const session of recentSessions) {
      const date = new Date(session.completedAt).toISOString().split('T')[0];
      if (!byDate[date]) byDate[date] = { totalScore: 0, count: 0, totalDuration: 0 };
      byDate[date].totalScore += session.score || 0;
      byDate[date].count++;
      byDate[date].totalDuration += session.duration;
    }

    const trends: PerformanceTrend[] = [];
    for (const [date, data] of Object.entries(byDate)) {
      trends.push({
        date,
        score: Math.round(data.totalScore / data.count),
        sessions: data.count,
        totalDuration: data.totalDuration,
      });
    }

    trends.sort((a, b) => a.date.localeCompare(b.date));
    return trends;
  }

  // ============================================================
  // Spaced Repetition — Due for Review
  // ============================================================

  getDueForReview(userId: string): DueReviewItem[] {
    const profile = this.getProfile(userId);
    const dueItems: DueReviewItem[] = [];
    const now = Date.now();

    for (const [topic, lastReviewTimestamp] of Object.entries(profile.revisionFrequency)) {
      const daysSinceLastReview = (now - lastReviewTimestamp) / (1000 * 60 * 60 * 24);
      let priority = 0;

      // Spaced repetition intervals
      if (daysSinceLastReview >= 30) priority = 0.9;
      else if (daysSinceLastReview >= 14) priority = 0.7;
      else if (daysSinceLastReview >= 7) priority = 0.5;
      else if (daysSinceLastReview >= 3) priority = 0.3;
      else priority = 0.1;

      if (priority >= 0.3) {
        let reason = '';
        if (daysSinceLastReview >= 30) reason = `It's been over a month since you reviewed ${topic}`;
        else if (daysSinceLastReview >= 14) reason = `Review ${topic} to reinforce your memory (last reviewed ${Math.round(daysSinceLastReview)} days ago)`;
        else reason = `Quick review of ${topic} recommended`;

        dueItems.push({
          topic,
          daysSinceLastReview: Math.round(daysSinceLastReview),
          priority,
          reason,
        });
      }
    }

    dueItems.sort((a, b) => b.priority - a.priority);
    return dueItems;
  }

  // ============================================================
  // Learning Stats
  // ============================================================

  getLearningStats(userId: string): {
    totalSessions: number;
    totalMinutes: number;
    averageScore: number;
    streak: number;
    longestStreak: number;
    strongTopics: number;
    weakTopics: number;
    disciplines: string[];
    sessionsByType: Record<string, number>;
  } {
    const profile = this.getProfile(userId);
    const userSessions = this.sessions.get(userId) || [];
    const sessionsByType: Record<string, number> = {};

    for (const session of userSessions) {
      sessionsByType[session.type] = (sessionsByType[session.type] || 0) + 1;
    }

    return {
      totalSessions: profile.sessionsCompleted,
      totalMinutes: profile.totalStudyMinutes,
      averageScore: profile.averageScore,
      streak: profile.learningStreak,
      longestStreak: profile.longestStreak,
      strongTopics: profile.strongAreas.length,
      weakTopics: profile.weakAreas.length,
      disciplines: Object.keys(profile.performanceByDiscipline),
      sessionsByType,
    };
  }

  // ============================================================
  // Persistence
  // ============================================================

  private persistProfile(profile: LearnerProfile): void {
    try {
      localStorage.setItem(
        LearningIntelligence.PROFILE_PREFIX + profile.userId,
        JSON.stringify(profile),
      );
    } catch (error) {
      console.warn('[LearningIntelligence] Failed to persist profile:', error);
    }
  }

  private persistSessions(userId: string): void {
    try {
      const userSessions = this.sessions.get(userId) || [];
      // Only keep last 500 sessions per user to avoid storage limits
      const trimmed = userSessions.slice(-500);
      localStorage.setItem(
        LearningIntelligence.SESSIONS_PREFIX + userId,
        JSON.stringify(trimmed),
      );
    } catch (error) {
      console.warn('[LearningIntelligence] Failed to persist sessions:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      // Load profiles
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(LearningIntelligence.PROFILE_PREFIX)) {
          const userId = key.slice(LearningIntelligence.PROFILE_PREFIX.length);
          const data = localStorage.getItem(key);
          if (data) {
            this.profiles.set(userId, JSON.parse(data));
          }
        }
        if (key?.startsWith(LearningIntelligence.SESSIONS_PREFIX)) {
          const userId = key.slice(LearningIntelligence.SESSIONS_PREFIX.length);
          const data = localStorage.getItem(key);
          if (data) {
            this.sessions.set(userId, JSON.parse(data));
          }
        }
      }
    } catch (error) {
      console.warn('[LearningIntelligence] Failed to load from storage:', error);
    }
  }

  clearAllData(userId: string): void {
    this.profiles.delete(userId);
    this.sessions.delete(userId);
    try {
      localStorage.removeItem(LearningIntelligence.PROFILE_PREFIX + userId);
      localStorage.removeItem(LearningIntelligence.SESSIONS_PREFIX + userId);
    } catch {
      // silent
    }
  }
}

// ============================================================
// Singleton Export
// ============================================================
export const learningIntelligence = new LearningIntelligence();
