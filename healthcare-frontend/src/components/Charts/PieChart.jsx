import React, { useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Animation
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Animation,
  ChartDataLabels
);

const PieChart = ({ 
  title = "Doctor Distribution", 
  data = [], 
  labels = [], 
  unit = "doctors",
  showLegend = true,
  showDataLabels = true
}) => {
  const chartRef = useRef(null);

  // Default color palette with more professional tones
  const defaultColors = [
    'rgba(99, 102, 241, 0.8)',   // indigo
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(16, 185, 129, 0.8)',   // emerald
    'rgba(245, 158, 11, 0.8)',   // amber
    'rgba(59, 130, 246, 0.8)',   // blue
    'rgba(139, 92, 246, 0.8)',   // purple
    'rgba(20, 184, 166, 0.8)',   // teal
    'rgba(249, 115, 22, 0.8)'    // orange
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: defaultColors.slice(0, data.length),
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
        hoverBackgroundColor: defaultColors.map(color => color.replace('0.8', '1')),
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderWidth: 3,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#1f2937'
      },
      legend: {
        display: showLegend,
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} ${unit} (${percentage}%)`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6
      },
      datalabels: {
        display: showDataLabels,
        color: '#1f2937',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, data) => acc + data, 0);
          const percentage = Math.round((value / total) * 100);
          return `${percentage}%`;
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutQuart'
    },
    cutout: '65%', // Makes it a donut chart when between 0-100%
    rotation: -90, // Start from top
    circumference: 360 // Full circle
  };

  // Add subtle shadow effect on mount
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.options.plugins.shadow = {
        id: 'shadow',
        beforeDraw(chart, args, options) {
          const { ctx } = chart;
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 5;
        }
      };
      chart.update();
    }
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <Pie 
        ref={chartRef}
        data={chartData} 
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default PieChart;