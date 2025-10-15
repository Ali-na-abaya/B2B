<template>
  <div class="profile-container">

    <div class="profile-header">
      <h1 class="page-title">Profile</h1>
      <button class="menu-toggle" aria-label="Open menu">
        ☰
      </button>
    </div>

   
    <div class="content-wrapper">

      <div class="card user-info-card">
        <div class="avatar"></div>
        <div class="user-details">
          <h2 class="user-name">Surname Name</h2>
          <p class="user-email">E-mail: something@gmail.com</p>
          <p class="user-phone">Number: +1 222 333 44 55</p>
        </div>
      </div>

      
      <div class="card payment-card">
        <h3 class="card-title">Платежные данные</h3>
        <div class="form-group">
          <label class="form-label">Номер карточки:</label>
          <input
            type="text"
            class="card-number-input"
            value="************"
            readonly
          />
        </div>
        <div class="payment-methods">
          <button class="payment-logo">G Pay</button>
          <button class="payment-logo">Mastercard</button>
          <button class="payment-logo">VISA</button>
          <button class="payment-logo">Apple Pay</button>
        </div>
      </div>

      <div class="card company-card">
        <h3 class="card-title">About company</h3>
        <p><strong>Company name:</strong> Adilet</p>
        <p><strong>Specification:</strong> Toys</p>
        <p><strong>Product:</strong> Balls, dolls, cars</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
body{
  background-color: #FCA311;
}
.profile-container {
  
  background-color: #FCA311;
  padding: 20px;
  max-width: 1800px;
  margin: 0 auto;
}

.profile-header {
  background-color: #1a2238;
  color: white;
  padding: 20px 30px;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  margin: 0;
}

.menu-toggle {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card {
  background-color: #1a2238;
  color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-info-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  background-color: #cccccc;
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
}

.user-email,
.user-phone {
  margin: 5px 0;
  font-size: 0.95rem;
}

.card-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  color: #cccccc;
  margin-bottom: 6px;
}

.card-number-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  box-sizing: border-box;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.payment-logo {
  background-color: white;
  color: #333333;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-logo:hover {
  opacity: 0.9;
}


@media (max-width: 768px) {
  .profile-header {
    padding: 15px 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .user-info-card {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .card {
    padding: 20px;
  }

  .payment-methods {
    grid-template-columns: 1fr;
  }
}
</style>