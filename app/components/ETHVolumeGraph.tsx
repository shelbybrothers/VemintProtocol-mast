
'use client';

import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

export default function ETHVolumeGraph() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&interval=hourly"
      );
      const json = await res.json();

      const volumes = json.total_volumes.map((point: any) => point[1]);
      const times = json.total_volumes.map((point: any) => {
        const date = new Date(point[0]);
        return `${date.getHours()}:00`;
      });

      setDataPoints(volumes);
      setLabels(times);
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '2rem auto' }}>
      <h2>ETH Volume (24h)</h2>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'ETH Volume (USD)',
              data: dataPoints,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.3,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          },
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }}
      />
    </div>
  );
}
