<template>
  <div class="category-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>#{{ index + 1 }}</td>
          <td>
            {{ category.name }}
            <span class="arrow-badge">→</span>
          </td>
          <td>
            <div class="action-buttons">
              <button class="icon-btn edit">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button class="icon-btn delete">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-2.142L9 7M20 7H4m0 0v6m0 0v6m0 0V7"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const categories = [
  { id: 1, name: 'Fashion and beauty' },
  { id: 2, name: 'For home' },
  { id: 3, name: 'Food, tobacco and alcohol products' },
  { id: 4, name: 'Computers, telephony, office supplies' },
  { id: 5, name: 'Industry, construction' },
  { id: 6, name: 'Children’s goods, entertainment, hobbies' },
  { id: 7, name: 'Auto parts, equipment' },
  { id: 8, name: 'Medical products' },
  { id: 9, name: 'Other' },
]
</script>

<style scoped>
.category-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background: #f9f9f9;
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #666;
  border-bottom: 1px solid #ddd;
}

tbody tr {
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background: #fafafa;
}

tbody td {
  padding: 16px;
  font-size: 14px;
  color: #333;
}

.arrow-badge {
  background: #f5a623;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-left: 8px;
  font-size: 12px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #f0f0f0;
}

.icon-btn.edit:hover {
  color: #007bff;
}

.icon-btn.delete:hover {
  color: #dc3545;
}
</style>