const url = 'https://financas-web-app.herokuapp.com/api/overview/chart';

// URL PARA FETCH EM DESENVOLVIMENTO LOCALHOST
// const devUrl = 'http://localhost:5500/api/overview/chart';

fetch(url)
.then( function(response) {
  return response.json()
})
.then(function(data){
  const chartData = data.dados;

  let ctx = document.getElementById('myChart');
  let myBarChart = new Chart(ctx, {
      type: 'bar',
      data: 
        {
          labels: [
                  chartData[0].mes,
                  chartData[1].mes,
                  chartData[2].mes,
                  chartData[3].mes,
                  chartData[4].mes,
                  chartData[5].mes,
                  chartData[6].mes,
                  chartData[7].mes,
                  chartData[8].mes,
                  chartData[9].mes,
                  chartData[10].mes,
                  chartData[11].mes,
          ],
          datasets: [{
              label: 'Despesa Mensal em $',
              data: [
                    chartData[0].valores.despesa,
                    chartData[1].valores.despesa,
                    chartData[2].valores.despesa,
                    chartData[3].valores.despesa,
                    chartData[4].valores.despesa,
                    chartData[5].valores.despesa,
                    chartData[6].valores.despesa,
                    chartData[7].valores.despesa,
                    chartData[8].valores.despesa,
                    chartData[9].valores.despesa,
                    chartData[10].valores.despesa,
                    chartData[11].valores.despesa,
              ],
              backgroundColor:[
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(229, 35, 49, 0.15)',
                'rgba(255, 255, 0, 0.15)',
                'rgba(132, 219, 57, 0.15)',              ],
              borderColor:[
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(229, 35, 49, 1)',
                'rgba(200, 158, 58, 1)',
                'rgba(132, 219, 57, 1)',
              ],
              borderWidth: 1,
        }, 
        {
          label: 'Receita Mensal em R$',
          data: [
                chartData[0].valores.receita,
                chartData[1].valores.receita,
                chartData[2].valores.receita,
                chartData[3].valores.receita,
                chartData[4].valores.receita,
                chartData[5].valores.receita,
                chartData[6].valores.receita,
                chartData[7].valores.receita,
                chartData[8].valores.receita,
                chartData[9].valores.receita,
                chartData[10].valores.receita,
                chartData[11].valores.receita,
          ],
          backgroundColor: 'rgba(36,254,65,.05)',
          borderColor:'rgba(36, 254, 65, 1)',
          type:'line'
        }]
    },
      options:  {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
  });

})
  .catch( function(error){
    console.log(error)
  })  
