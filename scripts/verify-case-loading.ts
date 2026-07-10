import { ClinicalCaseService } from './src/services/clinicalCase.service';

async function main() {
  console.log('Fetching cases...');
  const { cases, total } = await ClinicalCaseService.fetchCases({ pageSize: 2000 });
  console.log('Loaded cases:', cases.length);
  console.log('Total cases:', total);
  if (cases.length > 0) {
    console.log('Sample case unitId:', cases[0].unitId);
  }
}
main();
