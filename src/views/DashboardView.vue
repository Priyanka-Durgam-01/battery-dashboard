<template>
  <div class="dashboard-container">
    <main class="main-content">
      <h1>Battery Factory Yield Dashboard - <span>{{ currentDate }}</span></h1>
      
      <div class="line-container container-line">
        <h2 class="container-label">Container Line</h2>
        <div class="dashboard-grid-group">
          <div
            class="chart-card"
          >
            <h3>Line 1</h3>
            <div class="card-content">
              <ul class="legend">
                <li v-for="(item, i) in linesData[0].legendItems" :key="i">
                  <span 
                    class="color-box" 
                    :style="{ 'background-color': item.isInput ? 'transparent' : item.color, 'border': item.isInput ? 'none' : '1px solid #eee' }"
                  ></span>
                  <span class="label">{{ item.label }}:</span>
                  <span class="value">
                    {{ linesData[0][item.dataKey] }} 
                    <template v-if="!item.isInput">
                        ({{ linesData[0][item.percentKey].toFixed(2) }}%)
                    </template>
                  </span>
                </li>
              </ul>
              <div class="chart-wrapper">
                <div class="chart-container" v-if="linesData[0].total > 0">
                  <canvas :ref="el => { chartRefs[0] = el }"></canvas>
                  <div class="yield-percentage">{{ linesData[0].gradeAPercent.toFixed(2) }}%</div>
                </div>
                <div class="zero-value" v-else>
                  <span>{{ (linesData[0].gradeAPercent).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="chart-card"
          >
            <h3>Line 2</h3>
            <div class="card-content">
              <ul class="legend">
                <li v-for="(item, i) in linesData[1].legendItems" :key="i">
                  <span 
                    class="color-box" 
                    :style="{ 'background-color': item.isInput ? 'transparent' : item.color, 'border': item.isInput ? 'none' : '1px solid #eee' }"
                  ></span>
                  <span class="label">{{ item.label }}:</span>
                  <span class="value">
                    {{ linesData[1][item.dataKey] }}
                    <template v-if="!item.isInput">
                        ({{ linesData[1][item.percentKey].toFixed(2) }}%)
                    </template>
                  </span>
                </li>
              </ul>
              <div class="chart-wrapper">
                <div class="chart-container" v-if="linesData[1].total > 0">
                  <canvas :ref="el => { chartRefs[1] = el }"></canvas>
                  <div class="yield-percentage">{{ linesData[1].gradeAPercent.toFixed(2) }}%</div>
                </div>
                <div class="zero-value" v-else>
                  <span>{{ (linesData[1].gradeAPercent).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="line-container container-mp">
        <h2 class="container-label">Module-Pack line</h2>
        <div class="dashboard-grid-group">
          <router-link
            :to="`/equipment-performance/1`"
            class="chart-card"
          >
            <h3>Line 1</h3>
            <div class="card-content">
              <ul class="legend">
                <li v-for="(item, i) in linesData[2].legendItems" :key="i">
                  <span 
                    class="color-box" 
                    :style="{ 'background-color': item.isInput ? 'transparent' : item.color, 'border': item.isInput ? 'none' : '1px solid #eee' }"
                  ></span>
                  <span class="label">{{ item.label }}:</span>
                  <span class="value">
                    {{ linesData[2][item.dataKey] }}
                    <template v-if="!item.isInput">
                        ({{ linesData[2][item.percentKey].toFixed(2) }}%)
                    </template>
                  </span>
                </li>
              </ul>
              <div class="chart-wrapper">
                <div class="chart-container" v-if="linesData[2].total > 0">
                  <canvas :ref="el => { chartRefs[2] = el }"></canvas>
                  <div class="yield-percentage">{{ linesData[2].gradeAPercent.toFixed(2) }}%</div>
                </div>
                <div class="zero-value" v-else>
                  <span>{{ (linesData[2].gradeAPercent).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </router-link>
          <div
            class="chart-card"
          >
            <h3>Line 2</h3>
            <div class="card-content">
                <ul class="legend">
                <li v-for="(item, i) in linesData[3].legendItems" :key="i">
                    <span 
                    class="color-box" 
                    :style="{ 'background-color': item.isInput ? 'transparent' : item.color, 'border': item.isInput ? 'none' : '1px solid #eee' }"
                    ></span>
                    <span class="label">{{ item.label }}:</span>
                    <span class="value">
                        {{ linesData[3][item.dataKey] }}
                        <template v-if="!item.isInput">
                            ({{ linesData[3][item.percentKey].toFixed(2) }}%)
                        </template>
                    </span>
                </li>
              </ul>
              <div class="chart-wrapper">
                <div class="chart-container" v-if="linesData[3].total > 0">
                  <canvas :ref="el => { chartRefs[3] = el }"></canvas>
                  <div class="yield-percentage">{{ linesData[3].gradeAPercent.toFixed(2) }}%</div>
                </div>
                <div class="zero-value" v-else>
                  <span>{{ (linesData[3].gradeAPercent).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="chart-card"
          >
            <h3>Line 3</h3>
            <div class="card-content">
              <ul class="legend">
                <li v-for="(item, i) in linesData[4].legendItems" :key="i">
                    <span 
                    class="color-box" 
                    :style="{ 'background-color': item.isInput ? 'transparent' : item.color, 'border': item.isInput ? 'none' : '1px solid #eee' }"
                    ></span>
                    <span class="label">{{ item.label }}:</span>
                    <span class="value">
                        {{ linesData[4][item.dataKey] }}
                        <template v-if="!item.isInput">
                            ({{ linesData[4][item.percentKey].toFixed(2) }}%)
                        </template>
                    </span>
                </li>
              </ul>
              <div class="chart-wrapper">
                <div class="chart-container" v-if="linesData[4].total > 0">
                  <canvas :ref="el => { chartRefs[4] = el }"></canvas>
                  <div class="yield-percentage">{{ linesData[4].gradeAPercent.toFixed(2) }}%</div>
                </div>
                <div class="zero-value" v-else>
                  <span>{{ (linesData[4].gradeAPercent).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="line-container container-telecom">
        <h2 class="container-label">Telecom Line</h2>
        <div class="dashboard-grid-group telecom-grid-group"> 
          <div
            class="chart-card"
          >
            <h3>Line 1</h3>
            <div class="card-content">
              <ul class="legend">
                <li v-for="(item, i) in linesData[5].legendItems" :key="i">
                    <span 
                    class="color-box" 
                    :style="{ 'background-color': item.isInput ? 'transparent' : item.color, 'border': item.isInput ? 'none' : '1px solid #eee' }"
                    ></span>
                    <span class="label">{{ item.label }}:</span>
                    <span class="value">
                        {{ linesData[5][item.dataKey] }}
                        <template v-if="!item.isInput">
                            ({{ linesData[5][item.percentKey].toFixed(2) }}%)
                        </template>
                    </span>
                </li>
              </ul>
              <div class="chart-wrapper">
                <div class="chart-container" v-if="linesData[5].total > 0">
                  <canvas :ref="el => { chartRefs[5] = el }"></canvas>
                  <div class="yield-percentage">{{ linesData[5].gradeAPercent.toFixed(2) }}%</div>
                </div>
                <div class="zero-value" v-else>
                  <span>{{ (linesData[5].gradeAPercent).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { Chart, ArcElement, DoughnutController, Legend, Tooltip } from 'chart.js';

// Register necessary chart.js components
Chart.register(ArcElement, DoughnutController, Legend, Tooltip);

const currentDate = ref('');
let intervalId = null;

const updateDateTime = () => {
  const now = new Date();
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(now);
  currentDate.value = formattedDate.replace(',', ' ').replace('am', 'AM').replace('pm', 'PM') + ' IST';
};

const chartRefs = ref([]);
const charts = []; // To store chart instances for destruction

// Special Legend Item for Input
const inputLegendItem = {
    label: 'Input', 
    color: '#000000', 
    dataKey: 'total', 
    isInput: true 
};

// 🛑 GROUP-SPECIFIC LEGEND DEFINITIONS 🛑

// 1. Container Line Group Legend
const containerLegendItems = [
  { label: 'Output', color: '#a3e4a3', dataKey: 'gradeA', percentKey: 'gradeAPercent' },
  
  { label: 'Reject', color: '#f1948a', dataKey: 'gradeC', percentKey: 'gradeCPercent' },
  { label: 'Scrap Module', color: '#d7d9db', dataKey: 'scrapLaminate', percentKey: 'scrapLaminatePercent' },
  { label: 'Scrap Pack', color: '#7f8c8d', dataKey: 'scrapModule', percentKey: 'scrapModulePercent' },
];

// 2. MP Line Group Legend
const mpLegendItems = [
  { label: 'Output', color: '#a3e4a3', dataKey: 'gradeA', percentKey: 'gradeAPercent' },
  { label: 'Reject', color: '#f1948a', dataKey: 'gradeB', percentKey: 'gradeCPercent' },
  { label: 'Scrap Cell ', color: '#d7d9db', dataKey: 'scrapLaminate', percentKey: 'scrapLaminatePercent' },
  { label: 'Scrap Module', color: '#916a66ff', dataKey: 'gradeC', percentKey: 'gradeCPercent' },
  { label: 'Scrap Pack', color: '#7f8c8d', dataKey: 'scrapModule', percentKey: 'scrapModulePercent' },
];

// 3. Telecom Line Group Legend
const telecomLegendItems = [
  { label: 'Telecom OK', color: '#a3e4a3', dataKey: 'gradeA', percentKey: 'gradeAPercent' },
  { label: 'Telecom Fail', color: '#f1948a', dataKey: 'gradeC', percentKey: 'gradeCPercent' },
  { label: 'Other Loss', color: '#7f8c8d', dataKey: 'scrapModule', percentKey: 'scrapModulePercent' },
];
// 🛑 END LEGEND DEFINITIONS 🛑


const linesData = ref([
 // LINE 1 (Container Line)

  // LINE 1 (Container Line) - Using your custom values: 890 + 53 + 34 + 23 = 1000
  {
    gradeA: 890, gradeAPercent: 89.00,
    gradeB: 0, gradeBPercent: 0.00, // Unused key set to 0
    gradeC: 53, gradeCPercent: 5.30,
    scrapLaminate: 34, scrapLaminatePercent: 3.40,
    scrapModule: 23, scrapModulePercent: 2.30,
    total: 1000,
    legendItems: [inputLegendItem, ...containerLegendItems]
  },

  // LINE 2 (Container Line) - Matching image: 930 + 25 + 30 + 15 = 1000
  {
    gradeA: 930, gradeAPercent: 93.00,
    gradeB: 0, gradeBPercent: 0.00, // Unused key set to 0
    gradeC: 25, gradeCPercent: 2.50,
    scrapLaminate: 30, scrapLaminatePercent: 3.00,
    scrapModule: 15, scrapModulePercent: 1.50,
    total: 1000,
    legendItems: [inputLegendItem, ...containerLegendItems]
  },

  // LINE 1 (Module-Pack line) - Matching image: 850 + 30 + 40 + 30 + 30 = 980 (IMAGE ERROR - Adjusting to sum 1000)
  // 💡 Adjustment: Scrap Pack (30) to 50 to make 1000.
  {
    gradeA: 850, gradeAPercent: 85.00, 
    gradeB: 50, gradeBPercent: 5.00, // Mapped to Scrap Module
    gradeC: 30, gradeCPercent: 3.00, // Mapped to Reject
    scrapLaminate: 40, scrapLaminatePercent: 4.00, // Mapped to Scrap Cell
    scrapModule: 30, scrapModulePercent: 3.00, // Mapped to Scrap Pack
    total: 1000,
    legendItems: [inputLegendItem, ...mpLegendItems]
  },
    
  // LINE 2 (Module-Pack line) - Matching image: 910 + 10 + 35 + 10 (ERROR, Used 25) + 25 = 1000
  // 💡 Mapping Note: The image uses "Reject: 10" and "Scrap Module: 10", but the previous code used 5 components.
  // 910 + 10 (Reject) + 35 (Scrap Cell) + 20 (Scrap Module) + 25 (Scrap Pack) = 1000
  {
    gradeA: 910, gradeAPercent: 91.00, 
    gradeB: 20, gradeBPercent: 2.00, // Mapped to Scrap Module
    gradeC: 10, gradeCPercent: 1.00, // Mapped to Reject
    scrapLaminate: 35, scrapLaminatePercent: 3.50, // Mapped to Scrap Cell
    scrapModule: 25, scrapModulePercent: 2.50, // Mapped to Scrap Pack
    total: 1000,
    legendItems: [inputLegendItem, ...mpLegendItems]
  },

  // LINE 3 (Module-Pack line) - Matching image: 750 + 50 + 60 + 50 + 40 = 950 (IMAGE ERROR - Adjusting to sum 1000)
  // 💡 Adjustment: Scrap Pack (40) to 90 to make 1000.
  {
    gradeA: 750, gradeAPercent: 75.00, 
    gradeB: 50, gradeBPercent: 5.00, // Mapped to Scrap Module
    gradeC: 50, gradeCPercent: 5.00, // Mapped to Reject
    scrapLaminate: 60, scrapLaminatePercent: 6.00, // Mapped to Scrap Cell
    scrapModule: 90, scrapModulePercent: 9.00, // Mapped to Scrap Pack
    total: 1000,
    legendItems: [inputLegendItem, ...mpLegendItems]
  },

  // LINE 1 (Telecom Line) - Retaining dummy data
  {
    gradeA: 950, gradeAPercent: 95.00, 
    gradeB: 10, gradeBPercent: 1.00, 
    gradeC: 40, gradeCPercent: 4.0,
    scrapLaminate: 5, scrapLaminatePercent: 0.50, 
    scrapModule: 10, scrapModulePercent: 10.0,
    total: 1000,
    legendItems: [inputLegendItem, ...telecomLegendItems]
  }

]);

const createCharts = () => {
  charts.forEach(chart => chart.destroy());
  charts.length = 0;

  linesData.value.forEach((line, index) => {
    if (line.total > 0 && chartRefs.value[index]) {
      
      // Filter out the 'Input' item as it should not be part of the donut chart data
      const chartLegendItems = line.legendItems.filter(item => !item.isInput);

      // Dynamically generate data, colors, and labels based on the filtered legendItems
      const data = chartLegendItems.map(item => line[item.dataKey]);
      const backgroundColors = chartLegendItems.map(item => item.color);
      const labels = chartLegendItems.map(item => item.label);
      
      const newChart = new Chart(chartRefs.value[index], {
        type: 'doughnut',
        data: {
          labels: labels, 
          datasets: [{
            data: data, 
            backgroundColor: backgroundColors, 
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) { label += ': '; }
                  if (context.parsed !== null) {
                    // Find the corresponding data item from the line's chartLegendItems
                    const dataKey = chartLegendItems[context.dataIndex].dataKey;
                    const percentKey = chartLegendItems[context.dataIndex].percentKey;
                    
                    const value = line[dataKey];
                    const percentage = line[percentKey].toFixed(2);
                    
                    label += `${value} (${percentage}%)`;
                  }
                  return label;
                }
              }
            }
          },
          cutout: '70%'
        }
      });
      charts.push(newChart);
    }
  });
};

watchEffect(() => {
    if (chartRefs.value.every(ref => ref !== null)) {
      createCharts();
    }
}, { flush: 'post' });

onMounted(() => {
  updateDateTime();
  intervalId = setInterval(updateDateTime, 1000); 
  createCharts();
});

onUnmounted(() => {
  clearInterval(intervalId); 
  charts.forEach(chart => chart.destroy());
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.main-content {
  width: 100%;
  padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.line-container {
  border: 2px dashed #a0a0a0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  position: relative;
}

/* Style for Telecom Line background */
.container-telecom {
    background-color: #f0f0f0; 
    border-color: #7f8c8d; 
}

/* Updated dashboard-grid-group for responsiveness (default for Container/MP) */
.dashboard-grid-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* 🚀 NEW STYLE TO DECREASE TELECOM CARD SIZE 🚀 */
.telecom-grid-group {
    /* Override the default grid for the Telecom section to only allow one column of fixed size */
    grid-template-columns: minmax(280px, 500px);
    /* To keep the card centered/left-aligned instead of stretching across the page */
    justify-content: flex-start; 
}

.container-label {
  position: absolute;
  top: -15px;
  left: 15px;
  background-color: #f4f7f9;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #555;
}

/* Update label color for better contrast against the gray background */
.container-telecom .container-label {
    background-color: #f0f0f0;
}

/* Updated chart-card to be flexible */
.chart-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  /* Removed text-decoration: none and color: inherit to prevent link styling issues on non-link cards */
  transition: transform 0.2s, box-shadow 0.2s;
}

.chart-card:hover {
  /* Keep hover effect consistent */
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Add specific styling for the router-link element to ensure proper appearance */
.dashboard-grid-group > a.chart-card {
  text-decoration: none;
  color: inherit;
  cursor: pointer; /* Explicitly show it's clickable */
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #34495e;
  width: 100%;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.card-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  padding-top: 10px;
}

.legend {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  width: 50%;
  font-size: 0.9rem;
}

.legend li {
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.legend .label {
  margin-right: 5px;
  flex-shrink: 0;
}

.legend .value {
  font-weight: bold;
  text-align: right;
  flex-grow: 1;
}

/* Adjusted style for the color box to remove the dot for "Input" */
.color-box {
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.chart-wrapper {
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container {
  position: relative;
  height: 120px; 
  width: 120px;  
  margin: 0;
}

.yield-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem; 
  font-weight: bold;
  color: #2c3e50;
  z-index: 10;
  white-space: nowrap;
}

.zero-value {
  font-size: 1.2rem; 
  font-weight: bold;
  color: #666;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: 100%;
}
</style>