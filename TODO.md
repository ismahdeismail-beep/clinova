# Clinova — Current Tasks & Progress

## In Progress
- [ ] Implement Firestore service layer (workflow, rules, knowledge services)
- [ ] Connect Decision Tree to real workflow data from Firestore
- [ ] Wire Study Engine to Gemini API for document conversion
- [ ] Implement pharmacotherapy reasoning with KDI drug data
- [ ] Connect Settings/Privacy controls to Firestore persistence
- [ ] Add Firebase security rules for clinical data

## High Priority
- [ ] Set up `GEMINI_API_KEY` in `.env.local`
- [ ] Configure Firebase project credentials in `src/lib/firebase.ts`
- [ ] Implement rule evaluation engine in `rules.service.ts`
- [ ] Build drug interaction checker in `knowledge.service.ts`
- [ ] Create patient case CRUD for Case Learning screen

## Medium Priority
- [ ] Add PII redaction/de-identification engine
- [ ] Implement Kenya Drug Index v2024 data seeding
- [ ] Add user profile management (institution, specialty)
- [ ] Build admin governance console
- [ ] Add audit logging for clinical decisions

## Low Priority / Future
- [ ] Multi-language support (Swahili, etc.)
- [ ] Offline mode with Firestore persistence
- [ ] Mobile-responsive layout refinement
- [ ] Integration with hospital EMR systems
- [ ] CI/CD pipeline with GitHub Actions
- [ ] End-to-end testing with Playwright/Cypress
- [ ] Performance optimization for large decision trees
- [ ] Analytics dashboard for clinical outcomes
- [ ] Export/import for decision tree workflows
