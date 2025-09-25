<template>
  <div class="stringer-breakdown-container">
    <aside class="sidebar">
      <nav>
        <ul>
          <li>
            <a href="#" :class="{ active: activeTab === 'Utilization' }" @click.prevent="activeTab = 'Utilization'">
              <span class="material-icons-outlined">insights</span>
              Utilization
            </a>
          </li>
          <li>
            <a href="#" :class="{ active: activeTab === 'Gantt' }" @click.prevent="activeTab = 'Gantt'">
              <span class="material-icons-outlined">timeline</span>
              Gantt
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    
    <main class="main-content">
      <header class="header">
        <div class="header-left">
          <router-link to="/equipment-performance/1" class="back-link">
            <span class="material-icons-outlined back-icon">arrow_back</span>
          </router-link>
          <h2>Cell Pre Stacking</h2>
          <span class="date-and-shift">{{ currentDate }} | All Shift</span>
        </div>
        <div class="header-right">
          <span class="powered-by">Powered by</span>
          <span class="data-refreshed">Data Refreshed: {{ dataRefreshedTime }}</span>
        </div>
      </header>

      <div class="content-area">
        <StringerUtilizationView v-if="activeTab === 'Utilization'" />
        <StringerGanttView v-else-if="activeTab === 'Gantt'" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Kept in case navigation is used elsewhere
import StringerUtilizationView from './StringerUtilizationView.vue';
import StringerGanttView from './StringerGanttView.vue';

// Set the default tab to 'Utilization' as 'Overview' was removed
const activeTab = ref('Utilization');

const currentDate = ref('');
const dataRefreshedTime = ref('');

const updateDateTime = () => {
  const now = new Date();
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  currentDate.value = now.toLocaleDateString('en-US', dateOptions);

  const timeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedTime = now.toLocaleDateString('en-CA', timeOptions).replace(/,/, '').replace(/\//g, '/').replace(' ', '/');
  dataRefreshedTime.value = formattedTime.replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2:$3');
};

onMounted(() => {
  updateDateTime();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

/* Main Layout */
.stringer-breakdown-container {
  display: flex;
  font-family: Arial, sans-serif;
  background-color: #f4f7f9;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
}

.content-area {
  padding-top: 1rem;
}

/* Sidebar Styling */
.sidebar {
  width: 200px;
  background-color: #2c3e50;
  padding: 20px;
  color: #fff;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav li {
  margin-bottom: 10px;
}

.sidebar nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  text-decoration: none;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.sidebar nav a:hover {
  background-color: #4a5d73;
}

.sidebar nav a.active {
  background-color: #55687f;
}

/* Header Styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
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

/* Back Link */
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
</style>