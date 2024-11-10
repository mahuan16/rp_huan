

async function getData(){
    const response = await fetch('../data/data.csv');
    const data = await response.text();

    //console.log(data);
    const strControl = [];
    const strHalf = [];
    const strFourth = [];

    const rtsControl = [];
    const rtsHalf = [];
    const rtsFourth = [];

    const table = data.split('\n')
    table.forEach(row => {
        let bars = row.split(',');

        strControl.push(bars[0]);
        strHalf.push(bars[1]);
        strFourth.push(bars[2]);

        rtsControl.push(bars[3]);
        rtsHalf.push(bars[4]);
        rtsFourth.push(bars[5]);
    });

    //console.log(strControl);
    return {strControl,strHalf,strFourth,rtsControl,rtsHalf,rtsFourth}
}

/**
 * const table = data.split('\n')
 * table.forEach(row => {
 * let bars = row.split(',');
 * 
 * strControl.push(bars[0]);
 * strHalf.push(bars[1]);
 * strFourth.push(bars[2]);
 * 
 * rtsControl.push(bars[3]);
 * rtsHalf.push(bars[4]);
 * rtsFourth.push(bars[5]);
 * })
 *
 * 
 */

async function createChart(){
    const data = await getData();
    const barChartSmooth = document.getElementById('smoothToRough');
    const barChartRough = document.getElementById('roughToSmooth');

    const sToR = new Chart(barChartSmooth, {
        type: 'bar',
        data: {
            labels: ['Control','1/2 Group','1/4 Group'],
            datasets: [
            {
                label:['Smooth Side','Rough Side'],
                data: data.strControl,
                backgroundColor: ['rgba(20, 40, 225, 0.56)', 'rgba(251, 153, 0, 0.56)'],
                borderColor: ['rgba(20, 40, 225, 1)', 'rgba(251, 153, 0, 1)'],
                borderWidth: 1
            },
            {
                label:['Smooth Side','Rough Side'],
                data: data.strHalf,
                backgroundColor: ['rgba(20, 40, 225, 0.56)', 'rgba(251, 153, 0, 0.56)'],
                borderColor: ['rgba(20, 40, 225, 1)', 'rgba(251, 153, 0, 1)'],
                borderWidth: 1
            },
            {
                label:['Smooth Side','Rough Side'],
                data: data.strFourth,
                backgroundColor: ['rgba(20, 40, 225, 0.56)', 'rgba(251, 153, 0, 0.56)'],
                borderColor: ['rgba(20, 40, 225, 1)', 'rgba(251, 153, 0, 1)'],
                borderWidth: 1
            }
        ]
        }, options: {
            responsive: true,
            maintainAspectRatio: false,
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
                    }
                }
            },
            plugins:{
                title: {
                    display: true,
                    text: 'Smooth to Rough Group Comparisons',
                    font: {
                        size: 24
                    },
                    color: '#333333',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
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
                data: data.rtsControl,
                backgroundColor: ['rgba(20, 40, 225, 0.56)', 'rgba(251, 153, 0, 0.56)'],
                borderColor: ['rgba(20, 40, 225, 1)', 'rgba(251, 153, 0, 1)'],
                borderWidth: 1
            },
            {
                data: data.rtsHalf,
                backgroundColor: ['rgba(20, 40, 225, 0.56)', 'rgba(251, 153, 0, 0.56)'],
                borderColor: ['rgba(20, 40, 225, 1)', 'rgba(251, 153, 0, 1)'],
                borderWidth: 1
            },
            {
                data: data.rtsFourth,
                backgroundColor: ['rgba(20, 40, 225, 0.56)', 'rgba(251, 153, 0, 0.56)'],
                borderColor: ['rgba(20, 40, 225, 1)', 'rgba(251, 153, 0, 1)'],
                borderWidth: 1
            }
        ]
        }, options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Group',
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        callback: function(val, index){
                            return index%1 === 0? this.getLabelForValue(val) : ''
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
                    }
                }
            },
            plugins:{
                title: {
                    display: true,
                    text: 'Rough to Smooth Group Comparisons',
                    font: {
                        size: 24
                    },
                    color: '#333333',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();