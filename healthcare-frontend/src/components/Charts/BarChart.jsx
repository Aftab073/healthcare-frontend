import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Animation
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
  Animation
);

const BarChart = ({ data, title = "Patient Age Distribution", unit = "years" }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Age",
        data: data.map((item) => item.age),
        backgroundColor: (context) => {
          const value = context.raw;
          return value > 60 
            ? 'rgba(220, 38, 38, 0.7)' // red for seniors
            : value > 40 
              ? 'rgba(234, 88, 12, 0.7)' // orange for middle-aged
              : 'rgba(139, 92, 246, 0.7)'; // purple for younger
        },
        borderColor: (context) => {
          const value = context.raw;
          return value > 60 
            ? 'rgba(220, 38, 38, 1)'
            : value > 40 
              ? 'rgba(234, 88, 12, 1)'
              : 'rgba(139, 92, 246, 1)';
        },
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: (context) => {
          const value = context.raw;
          return value > 60 
            ? 'rgba(220, 38, 38, 0.9)'
            : value > 40 
              ? 'rgba(234, 88, 12, 0.9)'
              : 'rgba(139, 92, 246, 0.9)';
        },
        hoverBorderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.raw} ${unit}`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        cornerRadius: 8
      },
      datalabels: {
        display: true,
        color: '#1f2937',
        anchor: 'end',
        align: 'top',
        formatter: (value) => `${value} ${unit}`,
        font: {
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            weight: '500'
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#6b7280',
          callback: function(value) {
            return `${value} ${unit}`;
          }
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.5)',
          drawBorder: false
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Add gradient on initial render
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <Bar 
        ref={chartRef}
        data={chartData} 
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default BarChart;