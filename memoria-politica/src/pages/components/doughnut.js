import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Chart from 'chart.js/auto';

function DoughnutChart(props) {

  const politicalParty = props.politicalParty;

  const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow']);
  const [backgroundColors, setBackgroundColors] = useState(['Red', 'Blue', 'Yellow']);

  const [data, setData] = useState([Math.random() * 100, Math.random() * 100, Math.random() * 100]);

  const chartRef = useRef();
  const [isChartInView, setIsChartInView] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setIsChartInView(true); 
    }
    else{
      setIsChartInView(false); 
    }
  }, [inView]);

  useEffect(() => {
    if(politicalParty == 'Partido Socialista'){
      setLabels(['PSD', 'IL', 'CHEGA']);
      setData([4118, 410, 20]);
      setBackgroundColors(['#f68a21', '#52c1ec', '#333399'])
    }
    else if(politicalParty == 'Partido Social Democrata'){
      setLabels(['PS', 'IL', 'CHEGA']);
      setData([6917, 271, 16]);
      setBackgroundColors(['#ff66ff', '#52c1ec', '#333399'])
    }
    else if(politicalParty == 'Chega'){
      setLabels(['PSD', 'PS']);
      setData([123, 87]);
      setBackgroundColors(['#f68a21', '#ff66ff'])
    }
    else if(politicalParty == 'Iniciativa Liberal'){
      setLabels(['PSD', 'PS', 'CHEGA']);
      setData([4118, 410, 20]);
      setBackgroundColors(['#f68a21', '#ff66ff', '#333399'])
    }
    else if(politicalParty == 'Partido Comunista Português'){
      setLabels(['PSD', 'IL', 'CHEGA']);  
      setData([4118, 410, 20]);
      setBackgroundColors(['#f68a21', '#52c1ec', '#333399'])
    }
    else if(politicalParty == 'Bloco de Esquerda'){
      setLabels(['PSD', 'IL', 'CHEGA']);
      setData([4118, 410, 20]);
      setBackgroundColors(['#f68a21', '#52c1ec', '#333399'])
    }

    if (isChartInView  ) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Mentions of other Political Parties',
              data: data,
              backgroundColor: backgroundColors,
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
