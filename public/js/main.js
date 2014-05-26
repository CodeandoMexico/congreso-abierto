$.getJSON("json/diputados_partido.json", function(json) {
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

$.getJSON("json/faltas.json", function(json) {
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

$.getJSON("json/asisten.json", function(json) {
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

$.getJSON("json/asisten_partidos.json", function(json) {
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


$.getJSON("json/fox_contra.json", function(json) {
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

$.getJSON("json/calderon_contra.json", function(json) {
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

$.getJSON("json/pena_contra.json", function(json) {
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

$.getJSON("json/fox_favor.json", function(json) {
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

$.getJSON("json/calderon_favor.json", function(json) {
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

$.getJSON("json/pena_favor.json", function(json) {
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
