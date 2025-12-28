import { sleep } from 'k6';
import http from 'k6/http';

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
    http.get('http://localhost:3000/posts')
    sleep(1);
}