

async function getData(){
    const response = await fetch('/data/data.csv');
    const data = await response.text();

    //console.log(data);
    const strSmooth = [];
    const strRough = [];
    const rtsSmooth = [];
    const rtsRough = [];

    const table = data.split('\n');
    console.log(table);
    table.forEach(row => {
        const columns = row.split(',');

        strSmooth.push(columns[0]);
        strRough.push(columns[1]);

        rtsSmooth.push(columns[2]);
        rtsRough.push(columns[3]);
    });

    console.log(strSmooth);
    return {strSmooth, strRough, rtsSmooth, rtsRough}
}


async function createChart(){
    const data = await getData();
    const barChartSmooth = document.getElementById('smoothToRough');
    const barChartRough = document.getElementById('roughToSmooth');

    Chart.defaults.font.family = 'Fira Sans';
    Chart.defaults.color = '#685c4a';

    const sToR = new Chart(barChartSmooth, {
        type: 'bar',
        data: {
            labels: ['Control','1/2 Group','1/4 Group'],
            datasets: [
            {
                label:'Smooth Side',
                data: data.strSmooth,
                backgroundColor: 'rgba(20, 40, 225, 0.56)',
                borderColor: 'rgba(20, 40, 225, 1)',
                borderWidth: 1
            },
            {
                label:'Rough Side',
                data: data.strRough,
                backgroundColor: 'rgba(251, 153, 0, 0.56)',
                borderColor: 'rgba(251, 153, 0, 1)',
                borderWidth: 1
            }
        ]
        }, options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Group',
                        font: {
                            size: 14
                        }
                    },
                    font: {
                        size: 14
                    },
                    grid: {
                        color: '#98a1ab'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Planaria',
                        font: {
                            size: 14
                        }
                    },
                    ticks:{
                        callback: function(val, index){
                            return index%1 === 0 ? this.getLabelForValue(val) : ''
                        }
                    },
                    grid: {
                        color: '#98a1ab'
                    },
                    max: 12
                }
            },
            plugins:{
                title: {
                    display: true,
                    text: 'Smooth to Rough Group Comparisons',
                    font: {
                        size: 24
                    },
                    color: '#15616D',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'center',
                    position: 'bottom'
                }
            }
        }
    });

    const rToS = new Chart(barChartRough, {
        type: 'bar',
        data: {
            labels: ['Control','1/2 Group','1/4 Group'],
            datasets: [
            {
                label:'Smooth Side',
                data: data.rtsSmooth,
                backgroundColor: 'rgba(20, 40, 225, 0.56)',
                borderColor: 'rgba(20, 40, 225, 1)',
                borderWidth: 1
            },
            {
                label:'Rough Side',
                data: data.rtsRough,
                backgroundColor: 'rgba(251, 153, 0, 0.56)',
                borderColor: 'rgba(251, 153, 0, 1)',
                borderWidth: 1
            }
        ]
        }, options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Group',
                        font: {
                            size: 14
                        }
                    },
                    font: {
                        size: 14
                    },
                    grid: {
                        color: '#98a1ab'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Planaria',
                        font: {
                            size: 14
                        }
                    },
                    ticks:{
                        callback: function(val, index){
                            return index%1 === 0 ? this.getLabelForValue(val) : ''
                        }
                    },
                    grid: {
                        color: '#98a1ab'
                    },
                    max: 12
                }
            },
            plugins:{
                title: {
                    display: true,
                    text: 'Rough to Smooth Group Comparisons',
                    font: {
                        size: 24
                    },
                    color: '#15616D',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'center',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();