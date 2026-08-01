# Kenyan Pharma Sources — Crawl Knowledge Base (persisted memory)

> Standing rule: every crawl's findings are saved here so future sessions never re-crawl from scratch.
> Last updated: 2026-08-01. Source: PPB facility register, MedStatus GMP registry, Lyttis, pharmchoices, businessradar.

## PPB-Licensed Kenyan Manufacturers (GMP active)

| Company | Website | Notes |
|---|---|---|
| Cosmos Limited | https://cosmos-pharm.com | Founded 1978, Nairobi; human + veterinary |
| Dawa Ltd | (dawa web) | Antibiotics, antimalarials |
| Beta Healthcare International Ltd | betapharma.co.ke (Aspen Group) | Hypertension, diabetes, infection |
| Elys Chemical Industries Ltd | https://elys.co.ke | 1961/1976; 100+ generics; beta-lactam Unit II |
| Laboratory & Allied Ltd | https://www.laballied.com/products | Product catalogue on site |
| Regal Pharmaceuticals Ltd | https://regalpharmaceuticals.com | Has "Product Range" page |
| Sphinx Pharmaceuticals | — | Antibiotics, anti-inflammatories, antivirals |
| Biodeal Laboratories Ltd | — | Injectables, tablets, syrups |
| Galaxy Pharmaceutical Ltd | — | |
| Questa Care Ltd | — | |
| Square Pharmaceuticals Kenya EPZ | — | Machakos |
| Autosterile (EA) Ltd | — | |
| B. Braun Pharmaceuticals EPZ | — | Machakos, SUSPENDED |
| Haleon Kenya Ltd (GSK) | — | GSK subsidiary |
| Universal Corporation Ltd (Kenya) | — | e.g. Duxcospan |
| Mac's Pharmaceuticals Ltd | — | Analgesics, antibiotics, veterinary |
| Medivet Products Ltd | — | Veterinary |
| Gesto Pharmaceutical Ltd | — | Generics |
| Didy Pharmaceuticals | — | OTC |
| Infusion Medicare Ltd | — | IV fluids |
| Trupharma Manufacturing Ltd | — | |
| Viva Healthcare Ltd | — | |
| Benmed Pharmaceuticals Kenya | — | |
| Amanta Healthcare Ltd | — | e.g. Bravemol IV infusion |
| Comet Healthcare Ltd | — | |
| Centurion Healthcare | — | |
| Abacus Pharma (Africa) Ltd | — | e.g. Abpara |
| Tasa Pharma Ltd | — | |
| Zain Pharma Ltd / Zazen Pharma | — | e.g. Fièvrenil |

## Key Registries / Directories (verified sources)

1. **MedStatus Kenya** — https://medstatus.co.ke — per-medicine pages listing registered brands + manufacturers + countries. E.g. https://medstatus.co.ke/medicine/hyoscine-butylbromide-injection-h93-103 showed: Bispanol (Regal), Bukol (Elys), Hyoscine Butylbromide (Cosmos), Duxcospan (Universal)...
   - GMP facilities: https://medstatus.co.ke/gmp-sites (26 facilities)
   - MAH directory: https://medstatus.co.ke/mah (3,217 MAHs)
2. **PPB Facility Register** — https://practice.pharmacyboardkenya.org/LicenseStatus?ftype=manufacturer&register=facilities
3. **Lyttis Kenya pharma** — https://www.lyttis.com/pharma/manufacturing (31 manufacturers) + https://www.lyttis.com/pharma/drug-brands/ (brand → manufacturer lookup)
4. **pharmchoices** — https://pharmchoices.com/pharmaceutical-companies-in-kenya-2/ (35 licensed manufacturers)
5. **FKPM** — http://fkpm.info.ke (Federation of Kenya Pharmaceutical Manufacturers, 18+ members)

## Known brand → manufacturer examples (from MedStatus, verified)

- Hyoscine butylbromide: Bispanol (Regal), Bukol (Elys), Duxcospan (Universal), Hyoscine Butylbromide (Cosmos)
- Paracetamol IV: Bravemol (Amanta), Fevadol (Vovantis), Parafast (Vovantis)
- Abpara (Abacus Pharma)

## Next crawl targets (product catalogs)

- https://regalpharmaceuticals.com/products (or /product-range)
- https://www.laballied.com/products
- https://cosmos-pharm.com (products)
- https://elys.co.ke (products)
- MedStatus medicine pages for the 86 image-less drugs (brand verification + images if present)

## TODO from this crawl

- [ ] Map catalog pages structure → build kenyanPharma provider
- [ ] Match products to 86 image-less monographs by brand/generic
- [ ] Persist matched product-image URLs here + supermemory when API key set
