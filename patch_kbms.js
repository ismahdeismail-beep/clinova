const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importReplacement = `const EducationHubScreen = React.lazy(() => import('./screens/EducationHubScreen'));
const KnowledgeBaseManagerScreen = React.lazy(() => import('./screens/KnowledgeBaseManagerScreen'));`;
content = content.replace(/const EducationHubScreen = React\.lazy\(\(\) => import\('\.\/screens\/EducationHubScreen'\)\);/, importReplacement);

const linksReplacement = `    ...(userData?.role === 'admin' ? [
      { to: '/admin', label: 'Admin Console', icon: ShieldCheck },
      { to: '/admin/kbms', label: 'KB Engine', icon: Database }
    ] : []),`;
content = content.replace(/    \.\.\.\(userData\?\.role === 'admin' \? \[\{ to: '\/admin', label: 'Admin Console', icon: ShieldCheck \}\] : \[\]\),/, linksReplacement);

const routesReplacement = `              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboardScreen />
                </AdminRoute>
              } />
              <Route path="/admin/kbms" element={
                <AdminRoute>
                  <KnowledgeBaseManagerScreen />
                </AdminRoute>
              } />`;
content = content.replace(/              <Route path="\/admin" element=\{\s*<AdminRoute>\s*<AdminDashboardScreen \/>\s*<\/AdminRoute>\s*\} \/>/, routesReplacement);

fs.writeFileSync('src/App.tsx', content);
