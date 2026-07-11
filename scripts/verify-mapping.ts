import { ClinicalCaseService } from '../src/services/clinicalCase.service';
import { getIntegratedUnitId } from '../src/data/curriculum';
import { SPECIALTIES } from '../src/data/clinicalCasesData';

async function verify() {
  console.log('Fetching cases...');
  const { cases } = await ClinicalCaseService.fetchCases({ pageSize: 100 });
  
  // Test unit mapping for the first case
  if (cases.length > 0) {
    const c = cases[0];
    const specialty = SPECIALTIES[0]; // Cardiovascular Pharmacotherapy
    const unitId = getIntegratedUnitId(specialty);
    
    console.log('Sample case specialty:', c.specialty);
    console.log('Sample case unitId:', c.unitId);
    console.log('Selected specialty:', specialty);
    console.log('Mapped unitId:', unitId);
    
    const matches = (c.unitId === unitId) || (c.specialty === specialty);
    console.log('Matches unit?', matches);
  } else {
    console.log('No cases found!');
  }
}
verify();
