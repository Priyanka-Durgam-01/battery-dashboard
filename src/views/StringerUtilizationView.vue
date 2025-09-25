<template>
  <div class="op70-bar-chart-container">
    <header class="chart-tabs">
      <div class="tab-group">
        <button
          :class="{ active: activeMachineGroup === 'Machine 1,2' }"
          @click="activeMachineGroup = 'Machine 1,2'"
        >
          Machine 1,2
        </button>
        <button
          :class="{ active: activeMachineGroup === 'Machine 3,4' }"
          @click="activeMachineGroup = 'Machine 3,4'"
        >
          Machine 3,4
        </button>
        <button
          :class="{ active: activeMachineGroup === 'Machine 5,6' }"
          @click="activeMachineGroup = 'Machine 5,6'"
        >
          Machine 5,6
        </button>
        <button
          :class="{ active: activeMachineGroup === 'Machine 7,8' }"
          @click="activeMachineGroup = 'Machine 7,8'"
        >
          Machine 7,8
        </button>
      </div>
    </header>

    <div class="chart-grid">
      <div v-for="machine in filteredMachines" :key="machine.name" class="chart-card">
        <h4>{{ machine.name }}</h4>
        <div class="canvas-container">
          <canvas :ref="el => { chartRefs[machine.name] = el }"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

// Renamed activeStringerGroup to activeMachineGroup
const activeMachineGroup = ref('Machine 1,2');
const chartRefs = ref({});
const charts = {};

// Renamed allStringerData to allOP70Data
const allOP70Data = ref({
  'Machine 1,2': [
    {
      name: 'Machine 1A',
      data: [
        { productive: 80, idle: 15, engineering: 5 },
        { productive: 75, idle: 20, engineering: 5 },
        { productive: 85, idle: 10, engineering: 5 },
        { productive: 70, idle: 20, engineering: 10 },
        { productive: 60, idle: 30, engineering: 10 },
      ],
    },
    {
      name: 'Machine 1B',
      data: [
        { productive: 30, idle: 60, engineering: 10 },
        { productive: 25, idle: 65, engineering: 10 },
        { productive: 20, idle: 70, engineering: 10 },
        { productive: 5, idle: 5, engineering: 90 },
        { productive: 10, idle: 10, engineering: 80 },
      ],
    },
    {
      name: 'Machine 2A',
      data: [
        { productive: 50, idle: 40, engineering: 10 },
        { productive: 45, idle: 45, engineering: 10 },
        { productive: 60, idle: 30, engineering: 10 },
        { productive: 55, idle: 25, engineering: 20 },
        { productive: 35, idle: 45, engineering: 20 },
      ],
    },
    {
      name: 'Machine 2B',
      data: [
        { productive: 95, idle: 5, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 100, idle: 0, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 80, idle: 20, engineering: 0 },
      ],
    },
  ],
  'Machine 3,4': [
    {
      name: 'Machine 3A',
      data: [
        { productive: 50, idle: 40, engineering: 10 },
        { productive: 45, idle: 45, engineering: 10 },
        { productive: 60, idle: 30, engineering: 10 },
        { productive: 55, idle: 25, engineering: 20 },
        { productive: 35, idle: 45, engineering: 20 },
      ],
    },
    {
      name: 'Machine 3B',
      data: [
        { productive: 95, idle: 5, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 100, idle: 0, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 80, idle: 20, engineering: 0 },
      ],
    },
  ],
  'Machine 5,6': [
    {
      name: 'Machine 5A',
      data: [
        { productive: 50, idle: 40, engineering: 10 },
        { productive: 45, idle: 45, engineering: 10 },
        { productive: 60, idle: 30, engineering: 10 },
        { productive: 55, idle: 25, engineering: 20 },
        { productive: 35, idle: 45, engineering: 20 },
      ],
    },
    {
      name: 'Machine 5B',
      data: [
        { productive: 95, idle: 5, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 100, idle: 0, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 80, idle: 20, engineering: 0 },
      ],
    },
  ],
  'Machine 7,8': [
    {
      name: 'Machine 7A',
      data: [
        { productive: 50, idle: 40, engineering: 10 },
        { productive: 45, idle: 45, engineering: 10 },
        { productive: 60, idle: 30, engineering: 10 },
        { productive: 55, idle: 25, engineering: 20 },
        { productive: 35, idle: 45, engineering: 20 },
      ],
    },
    {
      name: 'Machine 7B',
      data: [
        { productive: 95, idle: 5, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 100, idle: 0, engineering: 0 },
        { productive: 90, idle: 10, engineering: 0 },
        { productive: 80, idle: 20, engineering: 0 },
      ],
    },
  ],
});

// Renamed filteredStringers to filteredMachines and updated source
const filteredMachines = computed(() => {
  return allOP70Data.value[activeMachineGroup.value];
});

const createCharts = () => {
  Object.values(charts).forEach((chart) => chart.destroy());
  for (const key in charts) {
    delete charts[key];
  }

  nextTick(() => {
    // Loop over filteredMachines instead of filteredStringers
    filteredMachines.value.forEach((machine) => {
      const canvasEl = chartRefs.value[machine.name];
      if (canvasEl) {
        const datasets = [
          {
            label: 'Productive',
            data: machine.data.map((d) => d.productive),
            backgroundColor: '#a3e4a3',
          },
          {
            label: 'Idle',
            data: machine.data.map((d) => d.idle),
            backgroundColor: '#f7dc6f',
          },
          {
            label: 'Engineering',
            data: machine.data.map((d) => d.engineering),
            backgroundColor: '#f1948a',
          },
        ];

        const chart = new Chart(canvasEl, {
          type: 'bar',
          data: {
            labels: ['6', '7', '8', '9', '10'],
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
              y: {
                stacked: true,
                display: false,
                max: 100,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            layout: {
              padding: {
                top: 0,
                bottom: 10,
              },
            },
          },
        });

        charts[machine.name] = chart;
      }
    });
  });
};

onMounted(() => {
  createCharts();
});

// Watch activeMachineGroup instead of activeStringerGroup
watch(activeMachineGroup, () => {
  createCharts();
});
</script>

<style scoped>
/* Renamed container class */
.op70-bar-chart-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f7f9;
}

.chart-tabs {
  margin-bottom: 20px;
}

.tab-group {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.tab-group button {
  padding: 10px 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: #555;
  transition: color 0.2s, border-bottom 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-group button.active {
  color: #007bff;
  font-weight: bold;
  border-bottom-color: #007bff;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.chart-card h4 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #333;
}

.canvas-container {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>