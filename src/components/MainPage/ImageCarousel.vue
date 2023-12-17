<template>
  <div class="carousel">
    <div class="item">
      <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
      <p>Item 1</p>
    </div>
    <div class="item">
      <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
      <p>Item 2</p>
    </div>
    <!-- Add more carousel items here -->
  </div>
</template>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  padding: 20px;
}

.item {
  flex: 0 0 auto;
  margin-right: 20px;
  text-align: center;
}

.item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
