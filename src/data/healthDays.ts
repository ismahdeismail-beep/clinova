// WHO global public health days & weeks (mandated "official" days plus widely
// observed health days). Dates are fixed annually, so the spotlight is always
// current. `relatedDrugId` links an observance to a relevant drug from the
// bundled Kenya Drug Index catalogue so the daily spotlight can feature it.

export interface HealthDay {
  /** 1-indexed month (1 = January) */
  month: number;
  /** starting day of the observance */
  day: number;
  /** optional end day for week-long observances */
  endDay?: number;
  title: string;
  official: boolean;
  theme: string;
  blurb: string;
  /** bundled-xxx id of a catalogue drug relevant to this observance */
  relatedDrugId?: string;
  /** external learn-more resource */
  learnMoreUrl?: string;
}

export const HEALTH_DAYS: HealthDay[] = [
  {
    month: 1,
    day: 30,
    title: 'World Neglected Tropical Diseases Day',
    official: true,
    theme: 'Ending neglect, investing in communities',
    blurb:
      'Highlights a group of communicable diseases that primarily affect communities in tropical and subtropical regions with limited access to health care.',
    relatedDrugId: 'bundled-008',
    learnMoreUrl: 'https://www.who.int/campaigns/world-ntd-day',
  },
  {
    month: 1,
    day: 30,
    title: 'World Leprosy Day',
    official: false,
    theme: 'Beat leprosy, end stigma',
    blurb:
      'Raises awareness of leprosy (Hansen’s disease) and the need to eliminate discrimination and stigma faced by those affected.',
    relatedDrugId: 'bundled-013',
    learnMoreUrl: 'https://www.who.int/campaigns/world-leprosy-day',
  },
  {
    month: 3,
    day: 3,
    title: 'World Hearing Day',
    official: false,
    theme: 'Changing mindsets: let’s make ear and hearing care a reality',
    blurb:
      'Promotes ear and hearing care across the life course and tackles the stigma around hearing loss.',
    learnMoreUrl: 'https://www.who.int/campaigns/world-hearing-day',
  },
  {
    month: 3,
    day: 24,
    title: 'World TB Day',
    official: true,
    theme: 'Yes! We can end TB',
    blurb:
      'Commemorates the discovery of Mycobacterium tuberculosis and drives global efforts to eliminate tuberculosis — still one of the world’s deadliest infectious diseases.',
    relatedDrugId: 'bundled-013',
    learnMoreUrl: 'https://www.who.int/campaigns/world-tb-day',
  },
  {
    month: 4,
    day: 7,
    title: 'World Health Day',
    official: true,
    theme: 'My health, my right',
    blurb:
      'Marks the founding of the World Health Organization and spotlights a priority global health theme each year.',
    relatedDrugId: 'bundled-098',
    learnMoreUrl: 'https://www.who.int/campaigns/world-health-day',
  },
  {
    month: 4,
    day: 14,
    title: 'World Chagas Disease Day',
    official: true,
    theme: 'Prevent, control and cure',
    blurb:
      'Raises visibility of Chagas disease and other neglected tropical diseases caused by parasites.',
    relatedDrugId: 'bundled-008',
    learnMoreUrl: 'https://www.who.int/campaigns/world-chagas-disease-day',
  },
  {
    month: 4,
    day: 25,
    title: 'World Malaria Day',
    official: true,
    theme: 'Accelerating the fight against malaria',
    blurb:
      'Mobilizes action to control and eliminate malaria, a mosquito-borne disease that disproportionately affects children under five.',
    relatedDrugId: 'bundled-011',
    learnMoreUrl: 'https://www.who.int/campaigns/world-malaria-day',
  },
  {
    month: 4,
    day: 24,
    endDay: 30,
    title: 'World Immunization Week',
    official: true,
    theme: 'Vaccines bring us closer',
    blurb:
      'Promotes the use of vaccines to protect people of all ages against disease and highlights the life-saving power of immunization.',
    learnMoreUrl: 'https://www.who.int/campaigns/world-immunization-week',
  },
  {
    month: 5,
    day: 31,
    title: 'World No Tobacco Day',
    official: true,
    theme: 'Protecting youth from industry manipulation',
    blurb:
      'Exposes the tobacco industry’s harmful practices and advocates for policies that reduce tobacco use and related disease.',
    learnMoreUrl: 'https://www.who.int/campaigns/world-no-tobacco-day',
  },
  {
    month: 6,
    day: 14,
    title: 'World Blood Donor Day',
    official: true,
    theme: 'Give blood, give plasma, share life',
    blurb:
      'Thanks voluntary blood donors and raises awareness of the need for safe, accessible blood and blood products.',
    relatedDrugId: 'bundled-108',
    learnMoreUrl: 'https://www.who.int/campaigns/world-blood-donor-day',
  },
  {
    month: 7,
    day: 25,
    title: 'World Drowning Prevention Day',
    official: true,
    theme: 'Anyone can drown, no one should',
    blurb:
      'Calls for coordinated action on proven, low-cost drowning prevention measures worldwide.',
    learnMoreUrl: 'https://www.who.int/campaigns/world-drowning-prevention-day',
  },
  {
    month: 7,
    day: 28,
    title: 'World Hepatitis Day',
    official: true,
    theme: 'It’s time for action',
    blurb:
      'Urges action to prevent, diagnose and treat viral hepatitis — a leading cause of liver cancer and cirrhosis.',
    relatedDrugId: 'bundled-018',
    learnMoreUrl: 'https://www.who.int/campaigns/world-hepatitis-day',
  },
  {
    month: 9,
    day: 17,
    title: 'World Patient Safety Day',
    official: true,
    theme: 'Engaging patients for patient safety',
    blurb:
      'Calls on health workers, patients and families to work together to improve medication safety and reduce harm.',
    relatedDrugId: 'bundled-077',
    learnMoreUrl: 'https://www.who.int/campaigns/world-patient-safety-day',
  },
  {
    month: 11,
    day: 15,
    title: 'World Prematurity Day',
    official: false,
    theme: 'Zero separation: act now, keep parents and babies together',
    blurb:
      'Raises awareness of the challenges of preterm birth and the care that saves newborn lives.',
    relatedDrugId: 'bundled-070',
    learnMoreUrl: 'https://www.who.int/campaigns/world-prematurity-day',
  },
  {
    month: 11,
    day: 17,
    title: 'World Cervical Cancer Elimination Day',
    official: false,
    theme: 'Accelerating elimination',
    blurb:
      'Supports the global strategy to eliminate cervical cancer as a public health problem through vaccination, screening and treatment.',
    relatedDrugId: 'bundled-086',
    learnMoreUrl: 'https://www.who.int/campaigns/world-cervical-cancer-elimination-day',
  },
  {
    month: 11,
    day: 18,
    endDay: 24,
    title: 'World AMR Awareness Week',
    official: true,
    theme: 'Preventing antimicrobial resistance together',
    blurb:
      'Raises awareness of antimicrobial resistance and promotes best practices to slow its spread — protecting medicines we rely on.',
    relatedDrugId: 'bundled-001',
    learnMoreUrl: 'https://www.who.int/campaigns/world-amr-awareness-week',
  },
  {
    month: 12,
    day: 1,
    title: 'World AIDS Day',
    official: true,
    theme: 'Let communities lead',
    blurb:
      'Stands in solidarity with people living with HIV and renews commitment to ending the AIDS epidemic as a public health threat.',
    relatedDrugId: 'bundled-018',
    learnMoreUrl: 'https://www.who.int/campaigns/world-aids-day',
  },
];
