// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
let content = fs.readFileSync('src/screens/DrugIndexScreen.tsx', 'utf8');

const stateBlock = `  const [searchQuery, setSearchQuery] = useState('');
  const [savedDrugs, setSavedDrugs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);`;

content = content.replace(/ {2}const \[searchQuery, setSearchQuery\] = useState\(''\);\n {2}const \[selectedCategory, setSelectedCategory\] = useState<string \| null>\(null\);/, stateBlock);

const useEffectBlock = `  useEffect(() => {
    const saved = localStorage.getItem('savedDrugs');
    if (saved) {
      try {
        setSavedDrugs(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveDrugSearch = (drug: string) => {
    const clean = drug.trim();
    if (!clean) return;
    setSavedDrugs(prev => {
      let next = [clean, ...prev.filter(d => d.toLowerCase() !== clean.toLowerCase())];
      if (next.length > 10) next = next.slice(0, 10);
      localStorage.setItem('savedDrugs', JSON.stringify(next));
      return next;
    });
  };

  const handleSearch = async (e: React.FormEvent) => {`;

content = content.replace(/ {2}const handleSearch = async \(e: React\.FormEvent\) => \{/, useEffectBlock);

const saveDrugCall = `      setMonograph(entry.content);
      saveDrugSearch(searchQuery);
    } catch (err: any) {`;

content = content.replace(/ {6}setMonograph\(entry\.content\);\n {4}\} catch \(err: any\) \{/, saveDrugCall);

fs.writeFileSync('src/screens/DrugIndexScreen.tsx', content);
