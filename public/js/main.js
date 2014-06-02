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
