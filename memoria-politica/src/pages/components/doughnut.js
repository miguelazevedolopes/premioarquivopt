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
    if(politicalParty == 'Partido Socialista'){
      setLabels(['PSD', 'Livre', 'Bloco',  'Chega','IL', 'PCP', 'PAN']);
      setData([20016, 173, 1556,93,93,2616,673]);
      setBackgroundColors(['#f68a21','#00CD8C','#000000', '#333399', '#52c1ec','#EC1B24','#036A84'])
    }
    else if(politicalParty == 'Partido Social Democrata'){
      setLabels(['PS', 'Livre', 'Bloco',  'Chega','IL', 'PCP', 'PAN']);
      setData([27098, 1027, 1391,57,18,8401,62]);
      setBackgroundColors(['#ff66ff','#00CD8C','#000000', '#333399', '#52c1ec','#EC1B24','#036A84'])
    }
    else if(politicalParty == 'Chega'){
      setLabels(['PSD', 'PS', 'Livre', 'Bloco', 'IL', 'PCP', 'PAN']);
      setData([87, 124, 283,39,0,48,10]);
      setBackgroundColors(['#f68a21','#ff66ff','#00CD8C','#000000', '#52c1ec','#EC1B24','#036A84'])
    }
    else if(politicalParty == 'Iniciativa Liberal'){
      setLabels(['PSD', 'PS', 'Livre', 'Bloco', 'Chega', 'PCP', 'PAN']);
      setData([784, 629, 163,46,631,1586,197]);
      setBackgroundColors(['#f68a21','#ff66ff','#00CD8C','#000000', '#333399','#EC1B24','#036A84'])
    }
    else if(politicalParty == 'Partido Comunista Português'){
      setLabels(['PSD', 'PS', 'Livre', 'Bloco', 'Chega', 'IL', 'PAN']);  
      setData([54708, 83672, 1441,1203,205,108,1926]);
      setBackgroundColors(['#f68a21','#ff66ff','#00CD8C','#000000', '#333399','#52c1ec','#036A84'])
    }
    else if(politicalParty == 'Bloco de Esquerda'){
      setLabels(['PSD', 'PS', 'Livre', 'IL', 'Chega', 'PCP', 'PAN']);
      setData([4590, 649, 169,8,1970,92,9266]);
      setBackgroundColors(['#f68a21','#ff66ff','#00CD8C','#52c1ec', '#333399','#EC1B24','#036A84'])
    }
    else if(politicalParty == 'Pessoas-Animais-Natureza'){
      setLabels(['PSD', 'PS', 'Livre', 'IL', 'Chega', 'PCP', 'Bloco']);
      setData([623, 94, 7,91,7,682,1066]);
      setBackgroundColors(['#f68a21','#ff66ff','#00CD8C','#52c1ec', '#333399','#EC1B24','#000000'])
    }
    else if(politicalParty == 'Livre'){
      setLabels(['PSD', 'PS', 'Bloco', 'IL', 'Chega', 'PCP', 'PAN']);
      setData([1331, 3, 10,467,391,397,1314]);
      setBackgroundColors(['#f68a21','#ff66ff','#000000','#52c1ec', '#333399','#EC1B24','#036A84'])
    }
    if (inView) {
      setIsChartInView(true); 
    }
    else{
      setIsChartInView(false); 
    }
  }, [inView]);

  useEffect(() => {
    if (isChartInView) {
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
