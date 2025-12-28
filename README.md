# Load and Stress Testing Experiment

This document provides a step-by-step guide to conducting a load and stress testing experiment on a REST API using k6. It is structured to walk developers through environment setup, defining objectives, selecting the system under test, identifying critical endpoints, creating load profiles, implementing test scripts, executing baseline, peak, and stress tests, and finally analyzing results. Each section includes detailed instructions, timing estimates, and example scripts to ensure the experiment is reproducible and clearly demonstrates system performance under increasing load conditions.

---

## Step 0 — Environment Setup (30 minutes)
1. Install **k6**
2. Clone the [jsonplaceholder](https://github.com/typicode/jsonplaceholder) repository
3. Prepare the following folder structure:
    ```
    load-test-experiment/
    ├── jsonplaceholder/
    ├── tests/
    ├── results/
    └── README.md
    ```
4. All experiments were conducted on a single machine running JSONPlaceholder locally.

---

## Step 1 — Define the Experiment Objective (10 minutes)
The objective of this experiment is to evaluate how system response time and error rate change under increasing levels of concurrent user load.

---

## Step 2 — Select System Under Test (SUT)
- **Name:** [JSONPlaceholder](https://github.com/typicode/jsonplaceholder)
- **Type:** REST API  
- **Version:** v0.3.3  
- **Deployment:** Local execution  

---

## Step 3 — Identify Critical Endpoint(s) (20 minutes)
One critical endpoint was selected for the experiment to minimize complexity and isolate performance behavior:
Critical operation:
    - Read operation: GET /posts


---

## Step 4 — Define Load Profile (15 minutes)

### 1. Virtual Users
Load levels:
- Baseline: 10 virtual users
- Peak: 50 virtual users
- Stress: 100 virtual users

### 2. Timing Configuration
- Ramp-up: 2 minutes
- Steady state: 5 minutes
- Ramp-down: 1 minute

---

## Step 5 — Create Load Test Script (45–60 minutes)

**File:** `tests/load_test.js`

    ```
    import http from 'k6/http';
    import { sleep } from 'k6';

    export let options = {
    stages: [
        { duration: '2m', target: 10 },  // Baseline
        { duration: '5m', target: 10 },

        { duration: '2m', target: 50 },  // Peak
        { duration: '5m', target: 50 },

        { duration: '2m', target: 100 }, // Stress
        { duration: '5m', target: 100 },

        { duration: '1m', target: 0 },
    ],
    };

    export default function () {
    http.get('http://localhost:3000/posts');
    sleep(1);
    }
    ```
--- 

## Step 6 — Smoke Test (10 minutes)
1. Run the test script: 
    `k6 run tests/load_test.js`
2. Verify:
    - The test executes successfully
    - Requests receive valid responses
    - No crashes or runtime errors occur

---

## Step 7 — Baseline Load Test (30 minutes)
1. Execute only the baseline load (10 virtual users):
    `k6 run tests/load_test.js > results/baseline.txt`
2. Record:
    - Avg response time
    - P95 response time
    - Error rate

---

## Step 8 — Peak Load Test (30–45 minutes)
1. Enable baseline and peak stages:
    `k6 run tests/load_test.js > results/peak.txt`
2. Record:
    - Avg response time
    - P95 response time
    - Error rate

---

## Step 9 — Stress Load Test (Optional) (30 minutes)
1. Enable baseline, peak and stress stages:
    `k6 run tests/load_test.js > results/stress.txt`
2. Record:
    - Avg response time
    - P95 response time
    - Error rate

---

## Step 11 — Analyze Results (1–2 hours)
Analyze collected metrics to identify:
- Performance degradation trends
- Scalability limits
- Saturation behavior

---

## Step 12 — Write Procedure Section (This Is Important)
1. Deploy the system locally
2. Identify a single critical endpoint
3. Define baseline, peak, and stress load levels
4. Execute load tests using k6
5. Measure response time and error rate
6. Analyze performance degradation across load levels

---