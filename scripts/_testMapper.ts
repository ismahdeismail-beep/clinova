function unitForSpecialty(spec: string | undefined): string | undefined {
  if (!spec) return undefined;
  const s = spec.toLowerCase();
  const rules: [string, string][] = [
    ["cardiov", "Cardiovascular Pharmacotherapy"],
    ["cardiology", "Cardiovascular Pharmacotherapy"],
    ["pediatric cardi", "Cardiovascular Pharmacotherapy"],
    ["respirat", "Respiratory Pharmacotherapy"],
    ["pulmon", "Respiratory Pharmacotherapy"],
    ["infectious", "Infectious Diseases & Antimicrobial Pharmacotherapy"],
    ["antimicrobial", "Infectious Diseases & Antimicrobial Pharmacotherapy"],
    ["steward", "Infectious Diseases & Antimicrobial Pharmacotherapy"],
    ["endocrin", "Endocrine Pharmacotherapy"],
    ["gastroenter", "Gastrointestinal Pharmacotherapy"],
    ["gastrointestinal", "Gastrointestinal Pharmacotherapy"],
    ["hepat", "Gastrointestinal Pharmacotherapy"],
    ["nephro", "Renal & Electrolyte Pharmacotherapy"],
    ["renal", "Renal & Electrolyte Pharmacotherapy"],
    ["neurol", "Central Nervous System Pharmacotherapy"],
    ["psychiat", "Central Nervous System Pharmacotherapy"],
    ["cns", "Central Nervous System Pharmacotherapy"],
    ["haemat", "Haematology & Oncology Pharmacotherapy"],
    ["hemat", "Haematology & Oncology Pharmacotherapy"],
    ["oncolog", "Haematology & Oncology Pharmacotherapy"],
    ["rheumat", "Rheumatology & Musculoskeletal Pharmacotherapy"],
    ["orthop", "Rheumatology & Musculoskeletal Pharmacotherapy"],
    ["musculoskeletal", "Rheumatology & Musculoskeletal Pharmacotherapy"],
    ["obstet", "Obstetrics & Gynaecology Pharmacotherapy"],
    ["gynaec", "Obstetrics & Gynaecology Pharmacotherapy"],
    ["gynec", "Obstetrics & Gynaecology Pharmacotherapy"],
    ["paediat", "Paediatric Pharmacotherapy"],
    ["pediat", "Paediatric Pharmacotherapy"],
    ["geriat", "Geriatric Pharmacotherapy"],
    ["dermat", "Dermatology Pharmacotherapy"],
    ["ophthal", "Ophthalmology Pharmacotherapy"],
    ["ent", "ENT Pharmacotherapy"],
    ["otolaryng", "ENT Pharmacotherapy"],
    ["emergency", "Emergency & Critical Care"],
    ["critical care", "Emergency & Critical Care"],
    ["toxic", "Toxicology & Poison Management"],
    ["poison", "Toxicology & Poison Management"],
  ];
  for (const [kw, unit] of rules) if (s.includes(kw)) return unit;
  return undefined;
}

console.log("Endocrinology ->", unitForSpecialty("Endocrinology"));
console.log("Endocrine Disorders ->", unitForSpecialty("Endocrine Disorders"));
console.log("Toxicology ->", unitForSpecialty("Toxicology"));
console.log("Endocrine Pharmacotherapy ->", unitForSpecialty("Endocrine Pharmacotherapy"));