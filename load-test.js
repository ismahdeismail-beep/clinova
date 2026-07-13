// k6 load test for Clinova API endpoints.
// Run with: k6 run load-test.js
// Or via Docker: docker run -i grafana/k6 run - <load-test.js

import http from 'k6/http';
import { check, sleep, group } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const SEARCH_QUERIES = ['metformin', 'amoxicillin', 'malaria', 'diabetes', 'hypertension', 'asthma', 'UTI', 'ceftriaxone'];

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp up to 10 VUs
    { duration: '30s', target: 20 },   // ramp to 20
    { duration: '30s', target: 50 },   // ramp to 50
    { duration: '30s', target: 20 },   // scale down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.05'],    // <5% error rate
  },
};

function randomQuery() {
  return SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
}

export default function () {
  group('Health & Readiness', () => {
    const health = http.get(`${BASE_URL}/api/health`);
    check(health, { 'health ok': (r) => r.status === 200 });

    const ready = http.get(`${BASE_URL}/api/ready`);
    check(ready, { 'ready ok': (r) => r.status < 500 });
  });

  group('Drug Monographs', () => {
    const q = randomQuery();
    const res = http.get(`${BASE_URL}/api/drugs?q=${encodeURIComponent(q)}`);
    check(res, { 'drug search ok': (r) => r.status === 200 });

    const detail = http.get(`${BASE_URL}/api/drugs/${encodeURIComponent(q)}`);
    check(detail, { 'drug detail ok': (r) => r.status < 500 });
  });

  group('AI Assistant', () => {
    const res = http.post(`${BASE_URL}/api/gemini/assistant`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: `What is the mechanism of action of ${randomQuery()}?` }),
    });
    check(res, { 'assistant responds': (r) => r.status < 500 });
  });

  sleep(1);
}
