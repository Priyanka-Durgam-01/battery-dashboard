<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <button @click="toggleSidebar" class="toggle-btn">☰</button>
    <h2 v-if="!isCollapsed">Battery Dashboard</h2>
    <nav>
      <ul>
        <li><router-link to="/dashboard" @click="isCollapsed = true">Dashboard</router-link></li>
        <li><router-link to="/qms" @click="isCollapsed = true">QMS</router-link></li>
        <li><router-link to="/reports" @click="isCollapsed = true">Reports</router-link></li>
        <li><router-link to="/settings" @click="isCollapsed = true">Settings</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #1f2937;
  color: white;
  height: 100vh;
  padding: 1rem;
  position: fixed;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

.toggle-btn {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  white-space: nowrap;
}

.sidebar.collapsed h2 {
  display: none;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
}

.sidebar a.router-link-active {
  font-weight: bold;
}

.sidebar.collapsed a {
  padding: 0.5rem;
  text-align: center;
}

.sidebar.collapsed ul {
  padding: 0;
}
</style>