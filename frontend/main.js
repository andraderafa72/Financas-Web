import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css'

let ctx = document.getElementById('myChart');
let myBarChart = new Chart(ctx, {
    type: 'bar',
    data: 
      {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Despesa Mensal em $',
            data: [10, 9, 12, 19, 21, 7, 10, 10, 42, 19, 30, 7],
            backgroundColor:'rgba(229, 35, 49, 0.15)',
            borderColor:'rgba(229, 35, 49, 1)',
            borderWidth: 1,
      }, 
      {
        label: 'Receita Mensal em R$',
        data: [11,13, 17, 15, 26, 14, 15, 12, 32, 29, 35, 12],
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
