# Clinova Exam Curriculum Sorting System

> User-authored spec (2026-08-09). Governs how exam content is classified, filtered,
> generated and presented. Reference for the exam curriculum-track restructure.

## Purpose

Clinova uses the Clinical Pharmacy and Pharmacology curriculum to organize, classify,
filter, generate and present examination questions. The curriculum determines:

- Which year a question belongs to
- Which trimester a question belongs to
- Which subject area it belongs to
- Which unit it belongs to
- Which topic it belongs to
- Which curriculum version it belongs to
- Which questions can appear together in an examination

The system must support **OLD CURRICULUM** and **NEW CURRICULUM**.
Do not mix OLD and NEW curriculum questions unless the user explicitly requests a combined examination.

## 1. Curriculum structure

```
CURRICULUM VERSION
    ↓ YEAR
    ↓ TRIMESTER
    ↓ AREA        (Pharmacology | Clinical Pharmacy)
    ↓ UNIT
    ↓ TOPIC
    ↓ SUBTOPIC
    ↓ QUESTION
```

## 2. Curriculum versions

`curriculum_version`: `OLD` | `NEW` | `UNCLASSIFIED` (never guess; UNCLASSIFIED when undetermined).

## 3. Unit placement (year / trimester)

### Pharmacology (traditional numbering)
- Y3T1 — Pharmacology I (Introduction), II (Autonomic)
- Y3T2 — III (Autacoids & Inflammation), IV (CNS)
- Y3T3 — V (Hypnotics & Sedatives), VI (Cardiovascular), VII (Respiratory & Renal)
- Y4T1 — VIII (GIT), IX (Chemotherapy I)
- Y4T2 — X (Chemotherapy II)
- Y5T1 — XI (Anticancers, Dermatologic & Ocular), XII (Vitamins & Endocrine)
- Y5T2 — XIII (Veterinary)
- Y5T3 — XIV (Toxicology)

### Clinical Pharmacy (traditional numbering, PHAM codes)
- Y3T2 — CP I (PHAM 3215, Introduction)
- Y3T3 — CP II (PHAM 3316, Respiratory & Renal)
- Y4T1 — CP III (PHAM 4117, Antimicrobials), CP IV (PHAM 4118, CVS)
- Y4T2 — CP V (PHAM 4219), CP VI (PHAM 4220)
- Y5T1 — CP VII (PHAM 5121), CP VIII (PHAM 5122)
- Y5T2 — CP IX (PHAM 5223), CP X (PHAM 5224)
- Y5T3 — CP XI (PHAM 5325)

## 4. Question classification

Every question carries:

```text
question
curriculum_version
year
trimester
area
unit
topic
subtopic
question_type
difficulty
marks
answer
explanation
```
