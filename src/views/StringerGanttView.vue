<template>
  <div class="gantt-container">
    <div class="gantt-chart-grid">
      <div class="gantt-chart-card" v-for="machine in op70Machines" :key="machine.name">
        <div class="gantt-row-label">
          <h4>{{ machine.name }}</h4>
        </div>
        <div class="gantt-timeline-header">
          <div class="timeline-label" v-for="hour in hours" :key="hour">{{ hour }}:00</div>
        </div>
        <div class="gantt-bar-row">
          <div 
            v-for="(segment, index) in machine.segments" 
            :key="index"
            class="gantt-segment"
            :style="{ 
              width: segment.width,
              backgroundColor: getStatusColor(segment.status) 
            }"
            :title="segment.status"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// activeTab is no longer needed since tabs are removed

const hours = ['06', '07', '08', '09', '10', '11'];

// Renamed allGanttData and flattened it to just hold the machines from 'Stringer 1,2'
const op70Machines = ref([
  {
    name: 'Machine 1A',
    segments: [
      { status: 'Productive', width: '20%' },
      { status: 'Idle', width: '5%' },
      { status: 'Productive', width: '15%' },
      { status: 'Idle', width: '10%' },
      { status: 'Productive', width: '25%' },
      { status: 'Engineering', width: '10%' },
      { status: 'Productive', width: '15%' }
    ]
  },
  {
    name: 'Machine 1B',
    segments: [
      { status: 'Idle', width: '10%' },
      { status: 'Engineering', width: '5%' },
      { status: 'Idle', width: '30%' },
      { status: 'Engineering', width: '20%' },
      { status: 'Productive', width: '5%' },
      { status: 'Idle', width: '30%' }
    ]
  },
  {
    name: 'Machine 2A',
    segments: [
      { status: 'Productive', width: '40%' },
      { status: 'Engineering', width: '10%' },
      { status: 'Productive', width: '20%' },
      { status: 'Idle', width: '10%' },
      { status: 'Productive', width: '10%' },
      { status: 'Engineering', width: '5%' },
      { status: 'Productive', width: '5%' }
    ]
  },
  {
    name: 'Machine 2B',
    segments: [
      { status: 'Idle', width: '90%' },
      { status: 'Engineering', width: '10%' }
    ]
  }
]);

// filteredData is no longer a computed property based on a tab, so it can be removed
// or just reference the main data array if you want to keep the name for consistency.
const filteredData = computed(() => {
  return op70Machines.value;
});

const getStatusColor = (status) => {
  switch (status) {
    case 'Productive':
      return '#a3e4a3'; // Light Green
    case 'Idle':
      return '#f7dc6f'; // Yellow
    case 'Engineering':
      return '#f1948a'; // Light Red
    default:
      return '#d5dbdb'; // Grey
  }
};
</script>

<style scoped>
.gantt-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f7f9;
}

/* Removed .gantt-tabs and its child styles */

.gantt-chart-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gantt-chart-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.gantt-row-label h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #444;
}

.gantt-timeline-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding-left: 0; 
}

.timeline-label {
  font-size: 0.8rem;
  color: #777;
  text-align: center;
  flex: 1;
}

.gantt-bar-row {
  display: flex;
  width: 100%;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.gantt-segment {
  height: 100%;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
</style>