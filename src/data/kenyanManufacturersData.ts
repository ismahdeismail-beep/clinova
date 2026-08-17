export const BUNDLED_KENYAN_MANUFACTURERS: Array<{
  id: string
  name: string
  slug: string
  location: string | null
  products_description: string | null
  capabilities: string[]
  regulatory_status: string | null
  website: string | null
  founded_year: number | null
  employee_count: string | null
  certifications: string[]
  notes: string | null
}> = [
  {
    id: 'mfr-001',
    name: 'Cosmos Pharmaceuticals Ltd',
    slug: 'cosmos-pharmaceuticals',
    location: 'Nairobi, Kenya',
    products_description:
      'Manufacturer of generic pharmaceutical products including tablets, capsules, syrups, and ointments',
    capabilities: [
      'Tablet manufacturing',
      'Capsule filling',
      'Syrup manufacturing',
      'Ointment manufacturing',
    ],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: 1975,
    employee_count: '200-500',
    certifications: ['PPB GMP'],
    notes: 'One of the oldest pharmaceutical manufacturers in Kenya',
  },
  {
    id: 'mfr-002',
    name: 'Medisel Kenya Ltd',
    slug: 'medisel-kenya',
    location: 'Nairobi, Kenya',
    products_description:
      'Pharmaceutical manufacturer producing a wide range of essential medicines for the Kenyan market',
    capabilities: [
      'Tablet manufacturing',
      'Capsule filling',
      'Liquid manufacturing',
      'Ointment manufacturing',
    ],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: null,
    employee_count: '100-200',
    certifications: ['PPB GMP'],
    notes: 'Produces essential medicines for Kenyan public health facilities',
  },
  {
    id: 'mfr-003',
    name: 'Dawa Limited',
    slug: 'dawa-limited',
    location: 'Nairobi, Kenya',
    products_description:
      'Leading Kenyan pharmaceutical manufacturer producing generic medicines for domestic and regional markets',
    capabilities: [
      'Tablet manufacturing',
      'Capsule filling',
      'Injectable manufacturing',
      'Ointment manufacturing',
      'Syrup manufacturing',
    ],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: 1978,
    employee_count: '500-1000',
    certifications: ['PPB GMP', 'ISO 9001'],
    notes: 'One of the largest pharmaceutical manufacturers in East Africa',
  },
  {
    id: 'mfr-004',
    name: 'Pharmaceutical Manufacturers of Kenya (PMK)',
    slug: 'pmk',
    location: 'Nairobi, Kenya',
    products_description:
      'Manufacturer of pharmaceutical products including analgesics, antibiotics, and antimalarials',
    capabilities: ['Tablet manufacturing', 'Capsule filling'],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: null,
    employee_count: '100-200',
    certifications: ['PPB GMP'],
    notes: 'Produces essential medicines for the Kenyan market',
  },
  {
    id: 'mfr-005',
    name: 'Lab & Allied Pharmaceuticals Ltd',
    slug: 'lab-allied',
    location: 'Nairobi, Kenya',
    products_description:
      'Manufacturer and distributor of pharmaceutical products, healthcare products, and medical devices',
    capabilities: [
      'Tablet manufacturing',
      'Capsule filling',
      'Syrup manufacturing',
      'Ointment manufacturing',
      'Medical devices',
    ],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: null,
    employee_count: '200-500',
    certifications: ['PPB GMP'],
    notes: 'Also distributes international pharmaceutical brands in Kenya',
  },
  {
    id: 'mfr-006',
    name: 'Biodeal Laboratories Ltd',
    slug: 'biodeal-laboratories',
    location: 'Nairobi, Kenya',
    products_description:
      'Pharmaceutical manufacturer specializing in generic medicines and contract manufacturing',
    capabilities: [
      'Tablet manufacturing',
      'Capsule filling',
      'Liquid manufacturing',
      'Contract manufacturing',
    ],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: null,
    employee_count: '100-200',
    certifications: ['PPB GMP'],
    notes: 'Provides contract manufacturing services for other pharmaceutical companies',
  },
  {
    id: 'mfr-007',
    name: 'Cipla Quality Chemical Industries Ltd',
    slug: 'cipla-qc',
    location: 'Nairobi, Kenya',
    products_description:
      'Joint venture producing antimalarials, antiretrovirals, and other essential medicines for East Africa',
    capabilities: [
      'Tablet manufacturing',
      'Capsule filling',
      'Antimalarial production',
      'ARV production',
    ],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: 2009,
    employee_count: '200-500',
    certifications: ['PPB GMP', 'WHO prequalification'],
    notes: 'Major supplier of antimalarials and ARVs in East Africa',
  },
  {
    id: 'mfr-008',
    name: 'Mepha Pharmaceuticals Ltd',
    slug: 'mepha-pharmaceuticals',
    location: 'Mombasa, Kenya',
    products_description:
      'Pharmaceutical manufacturer producing tablets, capsules, and liquid formulations',
    capabilities: ['Tablet manufacturing', 'Capsule filling', 'Syrup manufacturing'],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: null,
    employee_count: '50-100',
    certifications: ['PPB GMP'],
    notes: 'Based in Mombasa, serving the coastal region',
  },
  {
    id: 'mfr-009',
    name: 'Cosmas & Kosgei Pharmaceuticals Ltd',
    slug: 'cosmas-kosgei',
    location: 'Eldoret, Kenya',
    products_description: 'Pharmaceutical manufacturer based in the Rift Valley region',
    capabilities: ['Tablet manufacturing', 'Syrup manufacturing'],
    regulatory_status: 'PPB licensed',
    website: null,
    founded_year: null,
    employee_count: '50-100',
    certifications: ['PPB GMP'],
    notes: 'Regional pharmaceutical manufacturer',
  },
  {
    id: 'mfr-010',
    name: 'KEMSA (Kenya Medical Supplies Authority)',
    slug: 'kemsa',
    location: 'Nairobi, Kenya',
    products_description:
      'Government agency responsible for procurement, storage, and distribution of health products and technologies to public health facilities',
    capabilities: [
      'Procurement',
      'Warehousing',
      'Distribution',
      'Cold chain management',
      'Supply chain management',
    ],
    regulatory_status: 'Government agency',
    website: null,
    founded_year: 1994,
    employee_count: '500-1000',
    certifications: ['ISO 9001'],
    notes: 'Primary distributor of essential medicines to Kenyan public health facilities',
  },
] as const
