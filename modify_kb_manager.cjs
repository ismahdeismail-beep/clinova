const fs = require('fs');

let content = fs.readFileSync('src/screens/KnowledgeBaseManagerScreen.tsx', 'utf8');

const injection = `    try {
      // 1. Upload via real StorageService
      setUploadProgress(20);
      const res = await StorageService.uploadFile(
        selectedFile,
        { category: 'knowledge', accessScope: 'public' },
        (progress) => {
          setUploadProgress(20 + Math.min(30, Math.round(progress.percentage * 0.3)));
        }
      );

      // 2. Intelligent AI Processing Pipeline
      setUploadProgress(60);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('extractionType', 'educational_resource');

      let aiMetadata = {};
      try {
        const aiRes = await fetch('/api/gemini/extract-file', {
          method: 'POST',
          body: formData,
        });
        
        if (aiRes.ok) {
           aiMetadata = await aiRes.json();
           setUploadProgress(90);
        } else {
           console.warn('AI Extraction returned error, falling back to basic indexing.');
        }
      } catch(aiErr) {
        console.warn('AI Extraction failed, falling back to basic indexing:', aiErr);
      }

      // 3. Enrich the Firestore file document with our custom attributes and AI metadata
      const finalMetadata = {
        author: author.trim() || userData?.name || userData?.email?.split('@')[0] || 'Unknown Author',
        discipline: aiMetadata?.classification?.subject || aiMetadata?.classification?.learningArea || discipline,
        type: aiMetadata?.classification?.resourceType || type,
        title: aiMetadata?.title || title.trim() || selectedFile.name.replace(/\\.[^/.]+$/, ""),
        summary: aiMetadata?.summary || '',
        learningObjectives: aiMetadata?.learningObjectives || [],
        textContent: aiMetadata?.textContent || '',
        classification: aiMetadata?.classification || {},
        relationships: aiMetadata?.relationships || {},
        suggestions: aiMetadata?.suggestions || {},
        aiProcessed: true,
      };

      await StorageService.updateFileMetadata(res.file.id, finalMetadata);

      // 4. Add to local zustand state for instant reactivity
      addFile({
        ...res.file,
        ...finalMetadata
      } as any);

      setUploadProgress(100);`;

// Let's replace the whole try block
content = content.replace(/try\s*\{\s*\/\/\s*1\.\s*Upload\s*via\s*real\s*StorageService[\s\S]*?setUploadProgress\(100\);/m, injection);
fs.writeFileSync('src/screens/KnowledgeBaseManagerScreen.tsx', content);
