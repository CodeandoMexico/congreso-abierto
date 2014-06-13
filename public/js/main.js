$(document).ready(function(){ 

$.getJSON("json/titulo_2.json", function(json) {
    $('#diputados_por_partido').dynatable({
        dataset: {
            records: json
        },
        features: {
            paginate: false,
            search: false,
            recordCount: false,
            perPageSelect: false
        }
    });
});

$.getJSON("json/titulo_10.json", function(json) {
    $('#diputados_partidos').dynatable({
        dataset: {
            records: json
        },
        features: {
            paginate: false,
            search: false,
            recordCount: false,
            perPageSelect: false
        }
    });
});

$.getJSON("json/titulo_4.json", function(json) {
    $('#diputados_faltan').dynatable({
        dataset: {
            records: json
        },
        features: {
            paginate: false,
            search: false,
            recordCount: false,
            perPageSelect: false
        }
    });
});

$.getJSON("json/titulo_5.json", function(json) {
    $('#diputados_asisten').dynatable({
        dataset: {
            records: json
        },
        features: {
            paginate: false,
            search: false,
            recordCount: false,
            perPageSelect: false
        }
    });
});

$.getJSON("json/titulo_6.json", function(json) {
    $('#partidos_asisten').dynatable({
        dataset: {
            records: json
        },
        features: {
            paginate: false,
            search: false,
            recordCount: false,
            perPageSelect: false
        }
    });
});


$.getJSON("json/titulo_7_2.json", function(json) {
    $(function () {
        $('#fox_diputados_contra').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Votos en contra marzo-abril 2001 bajo Fox'
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Porcentaje de votos en contra'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                stacking: 'percent'
                }
             },
            series: json
        });
    });
});

$.getJSON("json/titulo_8_2.json", function(json) {
    $(function () {
        $('#calderon_diputados_contra').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Votos en contra marzo-abril 2001 bajo Calderon'
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Porcentaje de votos en contra'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                stacking: 'percent'
                }
             },
            series: json
        });
    });
});

$.getJSON("json/titulo_9_2.json", function(json) {
    $(function () {
        $('#pena_diputados_contra').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Votos en contra marzo-abril 2001 bajo Peña'
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Porcentaje de votos en contra'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                stacking: 'percent'
                }
             },
            series: json
        });
    });
});

$.getJSON("json/titulo_7_1.json", function(json) {
    $(function () {
        $('#fox_diputados_favor').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Votos a favor marzo-abril 2001 bajo Fox'
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Porcentaje de votos a favor'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                stacking: 'percent'
                }
             },
            series: json
        });
    });
});

$.getJSON("json/titulo_8_1.json", function(json) {
    $(function () {
        $('#calderon_diputados_favor').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Votos a favor marzo-abril 2001 bajo Calderon'
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Porcentaje de votos a favor'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                stacking: 'percent'
                }
             },
            series: json
        });
    });
});

$.getJSON("json/titulo_9_1.json", function(json) {
    $(function () {
        $('#pena_diputados_favor').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Votos a favor marzo-abril 2001 bajo Peña'
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Porcentaje de votos a favor'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                stacking: 'percent'
                }
             },
            series: json
        });
    });
});

 topRange      = 100,  // measure from the top of the viewport to X pixels down
     edgeMargin    = 20,   // margin above the top or margin from the end of the page
     contentTop = [];

setTimeout( function(){ 
    // Do something after 1 second 
 // Set up content an array of locations
 $('#sidemenu').find('a').each(function(){
  contentTop.push( $( $(this).attr('href') ).offset().top );
 })

 // adjust side menu
 $(window).scroll(function(){
  var winTop = $(window).scrollTop(),
      bodyHt = $(document).height(),
      vpHt = $(window).height() + edgeMargin;  // viewport height + margin
  $.each( contentTop, function(i,loc){
   if ( ( loc > winTop - edgeMargin && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) ){
    $('#sidemenu li')
     .removeClass('selected')
     .eq(i).addClass('selected');
   }
  })
 })
  
  }
 , 1000 );

});
