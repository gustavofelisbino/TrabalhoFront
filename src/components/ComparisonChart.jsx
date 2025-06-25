import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonChart({ opcoes = [] }) {
  if (!opcoes.length) {
    return <p>Nenhuma opção para mostrar no gráfico.</p>;
  }

  const labels = opcoes.map((op) => op.nome);

  const prosScores = opcoes.map(op =>
    (op.pros || []).reduce((acc, p) => acc + (p.peso || 0), 0)
  );
  const contrasScores = opcoes.map(op =>
    (op.contras || []).reduce((acc, c) => acc + (c.peso || 0), 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Prós',
        data: prosScores,
        backgroundColor: 'rgba(76, 201, 240, 0.7)',
      },
      {
        label: 'Contras',
        data: contrasScores.map(c => -c),
        backgroundColor: 'rgba(219, 68, 55, 0.7)',
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Comparação de Prós e Contras por Opção',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            const val = ctx.raw;
            return val < 0 ? `Contras: ${-val}` : `Prós: ${val}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: val => Math.abs(val),
        }
      },
      y: {
        stacked: true,
      }
    }
  };

  return <Bar data={data} options={options} />;
}
