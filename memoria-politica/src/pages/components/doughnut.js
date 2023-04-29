import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Chart from 'chart.js/auto';

function DoughnutChart() {
  const chartRef = useRef();
  const [isChartInView, setIsChartInView] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setIsChartInView(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isChartInView) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [isChartInView]);

  return (
    <div className= 'flex justify-center items-center' ref={ref}>
      <canvas id="myChart" ref={chartRef}/>
    </div>
  );
}

export default DoughnutChart;
