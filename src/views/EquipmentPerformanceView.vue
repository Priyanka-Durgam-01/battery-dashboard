<template>
  <div class="equipment-performance-container">
    <header class="header">
      <div class="header-left">
        <router-link to="/" class="back-link">
          <span class="material-icons-outlined back-icon">arrow_back</span>
        </router-link>
        <h2>Equipment Performance - Line 1</h2>
        <span class="date-and-shift">{{ currentDate }} | All Shift</span>
      </div>
      <div class="header-right">
        <span class="powered-by">Powered by</span>
        <span class="data-refreshed">Data Refreshed: {{ dataRefreshedTime }}</span>
      </div>
    </header>

    <nav class="tabs">
      <button :class="{ active: activeTab === 'Overview' }" @click="activeTab = 'Overview'">
        <span class="tab-icon material-icons-outlined">grid_view</span>
        Overview
      </button>
      <button
        v-for="tab in tabs.filter(t => t.name !== 'Overview')"
        :key="tab.name"
        :class="{ 'active': activeTab === tab.name }"
        @click="activeTab = tab.name"
      >
        <span v-if="tab.icon" class="tab-icon material-icons-outlined">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </nav>

    <main class="chart-grid-container">
      <div class="chart-grid">
        <div 
          class="chart-card" 
          v-for="(equipment, index) in filteredEquipment" 
          :key="index"
          @click="navigateToBreakdown(equipment.name)"
        >
          <div class="card-header">
            <h4>{{ equipment.name }}</h4>
            <span class="status-indicator" :class="equipment.status"></span>
          </div>
          <div class="chart-container">
            <canvas :ref="el => { chartRefs[index] = el }"></canvas>
            <div class="performance-percentage">{{ equipment.performance }}%</div>
          </div>

          <div v-if="equipment.name === 'Cell Pre Stacking'" class="hover-card-wrapper">
            <div class="hover-card">
                <h4>Cell Pre Stacking</h4> <div class="hover-content">
                  <div class="uptime-section">
                    <h5>Uptime</h5>
                    <ul class="uptime-list">
                      <li>
                        <span class="color-box productive"></span>
                        <span class="label">Productive:</span>
                        <span class="value">4:50 (100%)</span>
                      </li>
                      <li>
                        <span class="color-box idle"></span>
                        <span class="label">Idle:</span>
                        <span class="value">0:0 (0%)</span>
                      </li>
                      <li>
                        <span class="color-box engineering"></span>
                        <span class="label">Engineering:</span>
                        <span class="value">0:0 (0%)</span>
                      </li>
                      <li>
                        <span class="color-box scheduled"></span>
                        <span class="label">Scheduled:</span>
                        <span class="value">0:0 (0%)</span>
                      </li>
                      <li>
                        <span class="color-box unscheduled"></span>
                        <span class="label">Unscheduled:</span>
                        <span class="value">0:0 (0%)</span>
                      </li>
                    </ul>
                  </div>
                  <div class="production-section">
                    <h5>Production:</h5>
                    <ul class="production-list">
                      <li>
                        <span class="color-box output"></span>
                        <span class="label">Output:</span>
                        <span class="value">0 (0%)</span>
                      </li>
                    </ul>
                  </div>
                  <div class="quality-section">
                    <h5>Quality:</h5>
                    <ul class="quality-list">
                      <li>
                        <span class="color-box defects"></span>
                        <span class="label">Defects:</span>
                        <span class="value">0 (0.0%)</span>
                      </li>
                    </ul>
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
import { ref, onMounted, watch, nextTick } from 'vue';
import { Chart, ArcElement, DoughnutController, Tooltip } from 'chart.js';
import { useRouter } from 'vue-router';

Chart.register(ArcElement, DoughnutController, Tooltip);

const router = useRouter();
const currentDate = ref('');
const dataRefreshedTime = ref('');
const chartRefs = ref([]);
const charts = [];
const activeTab = ref('Overview');

const tabs = ref([
  { name: 'Overview', label: 'Overview', icon: 'grid_view' },
  
 
]);

const equipmentData = ref([
  { name: 'Cell Loading', performance: 99, status: 'high', group: 'Overview' },
  { name: 'Cell Barcode scanning & OCV/IR Test', performance: 98, status: 'high', group: 'Overview' },
  { name: 'Strip Foam & Aerogel Pad Assembly', performance: 78, status: 'medium', group: 'Overview' }, // The target card
  { name: 'Cell Assembly Adhesive Inspection', performance: 97, status: 'high', group: 'Overview' },
  { name: 'Manual Rework Station', performance: 91, status: 'high', group: 'Overview' },
  { name: 'End Plate Loading', performance: 98, status: 'high', group: 'Overview' },
  { name: 'Install Insullation Cover & Strip Foam on End Plate', performance: 55, status: 'low', group: 'Overview' },
  { name: 'Cell Pre Stacking', performance: 47, status: 'low', group: 'Overview' },
  { name: 'Module Stacking', performance: 48, status: 'low', group: 'Overview' },
  { name: 'Module Shaping', performance: 53, status: 'low', group: 'Overview' },
  { name: 'Module Steel Strap Assembly', performance: 50, status: 'low', group: 'Overview' },
  { name: 'Module PET Strap Assembly', performance: 91, status: 'high', group: 'Overview' },
  { name: 'Manual Rework Station', performance: 50, status: 'low', group: 'Overview' },
  { name: 'Hi-Pot Test & Laser Marking', performance: 47, status: 'low', group: 'Overview' },
  { name: 'Terminal Addressing', performance: 94, status: 'high', group: 'Overview' },
  { name: 'Terminal Laser Cleaning', performance: 99, status: 'high', group: 'Overview' },
  { name: 'Outpole Pole Bracket Installation', performance: 98, status: 'high', group: 'Overview' },
  { name: 'FPC Base Installation', performance: 50, status: 'low', group: 'Overview' },
  { name: 'CCS Installation', performance: 49, status: 'low', group: 'Overview' },
  { name: 'Busbar Welding', performance: 82, status: 'medium', group: 'Overview' },
  { name: 'Post-Weld Cleaning', performance: 95, status: 'high', group: 'Overview' },
  { name: 'Post-Weld Inspection', performance: 100, status: 'high', group: 'Overview' },
  { name: 'Post-Weld Manual Inspection', performance: 97, status: 'high', group: 'Overview' },
  { name: 'EOL Test', performance: 47, status: 'low', group: 'Overview' }
]);

const filteredEquipment = ref([]);

const updateDateTime = () => {
  const now = new Date();
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  currentDate.value = now.toLocaleDateString('en-US', dateOptions);
  
  const timeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedTime = now.toLocaleDateString('en-CA', timeOptions).replace(/,/, '').replace(/\//g, '/').replace(' ', '/');
  dataRefreshedTime.value = formattedTime.replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2:$3');
};

const createCharts = () => {
  charts.forEach(chart => chart.destroy());
  charts.length = 0;

  nextTick(() => {
    filteredEquipment.value.forEach((equipment, index) => {
      const canvasRef = chartRefs.value[index];
      if (canvasRef) {
        const remaining = 100 - equipment.performance;
        const backgroundColor = getColor(equipment.performance);
        
        const newChart = new Chart(canvasRef, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [equipment.performance, remaining],
              backgroundColor: [backgroundColor, '#f0f0f0'],
              borderWidth: 0,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            rotation: -90,
            circumference: 360,
            plugins: {
              tooltip: { enabled: false },
              legend: { display: false }
            },
          }
        });
        charts.push(newChart);
      }
    });
  });
};

const getColor = (performance) => {
  if (performance >= 80) return '#a3e4a3';
  if (performance >= 50) return '#f7dc6f';
  return '#f1948a';
};

const navigateToBreakdown = (equipmentName) => {
  if (equipmentName === 'Cell Pre Stacking') {
    router.push('/stringer-breakdown');
  }
};

watch(activeTab, (newTab) => {
  filteredEquipment.value = equipmentData.value.filter(item => item.group === newTab);
  createCharts();
}, { immediate: true });

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

.equipment-performance-container {
  font-family: Arial, sans-serif;
  padding: 1rem;
  background-color: #f4f7f9;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.back-link {
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.2s ease-in-out;
}

.back-link:hover {
  color: #007bff;
}

.back-icon {
  font-size: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-left h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.date-and-shift {
  font-size: 0.9rem;
  color: #666;
}

.header-right {
  text-align: right;
  font-size: 0.8rem;
  color: #888;
}

.powered-by {
  display: block;
}

.data-refreshed {
  font-weight: bold;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.tabs button {
  background: none;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  color: #555;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.tabs button:hover {
  color: #007bff;
}

.tabs button.active {
  color: #007bff;
  border-bottom-color: #007bff;
  font-weight: bold;
}

.tab-icon {
  margin-right: 5px;
  font-size: 1.2rem;
}

.chart-grid-container {
  overflow-x: auto;
  padding-top: 1rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.chart-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative; 
}

/* Remove hover effect on the card that has the hover-card-wrapper, to prevent conflicts */
.chart-card:hover:not(:has(.hover-card-wrapper)) {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h4 {
  margin: 0;
  font-size: 1rem;
  color: #444;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #ccc;
}

.status-indicator.high { background-color: #a3e4a3; box-shadow: 0 0 0 1px #a3e4a3; }
.status-indicator.medium { background-color: #f7dc6f; box-shadow: 0 0 0 1px #f7dc6f; }
.status-indicator.low { background-color: #f1948a; box-shadow: 0 0 0 1px #f1948a; }

.chart-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.performance-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

/* ---------------------------------------------------- */
/* 🚀 HOVER CARD STYLES (UPDATED) 🚀 */
/* ---------------------------------------------------- */

/* Wrapper to control visibility and position of the card */
.hover-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  z-index: 10; 
  cursor: default; 
}

/* Show the wrapper when the parent chart-card is hovered */
.chart-card:hover .hover-card-wrapper {
  opacity: 1;
  visibility: visible;
}

.hover-card {
  position: absolute;
  top: 50%;
  /* Shift right by 20px, adjust as needed */
  left: calc(50% + 20px); 
  transform: translate(-50%, -50%); 
  
  /* Styling */
  background-color: #fff;
  border: none; /* REMOVED BORDER */
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  padding: 15px;
  width: 250px; 
  text-align: left;
}

.hover-card h4 {
  font-size: 1.2rem;
  color: #007bff;
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.hover-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 0.9rem;
}

.hover-content h5 {
  font-size: 1rem;
  color: #555;
  margin: 0 0 5px 0;
}

.uptime-list, .production-list, .quality-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.uptime-list li, .production-list li, .quality-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.uptime-list .label, .production-list .label, .quality-list .label {
  flex-grow: 1;
  text-align: left;
  margin-right: 10px;
}

.uptime-list .value, .production-list .value, .quality-list .value {
  font-weight: bold;
  flex-shrink: 0;
  white-space: nowrap;
}

/* Color Boxes for Uptime/Production/Quality */
.color-box {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

.color-box.productive { background-color: #a3e4a3; }
.color-box.idle { background-color: #f7dc6f; }
.color-box.engineering { background-color: #f1948a; }
.color-box.scheduled { background-color: #85c1e9; }
.color-box.unscheduled { background-color: #af7ac5; }
.color-box.output { background-color: #a3e4a3; }
.color-box.defects { background-color: #f1948a; }
</style>