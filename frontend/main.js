import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

// MODULES
import './assets/modules/overviewChart';
import './assets/modules/transacoes';


// JQUERY
$(".burger-squeeze").click(function(){  
  $(".burger-squeeze").toggleClass("open");  
  $(".side-bar").toggleClass("toggler");
  $(".bg-sidebar").toggleClass("background-sidebar");
});  
$(".bg-sidebar").click(function(){
  $(".burger-squeeze").toggleClass("open");  
  $(".side-bar").toggleClass("toggler");
  $(".bg-sidebar").toggleClass("background-sidebar");
});