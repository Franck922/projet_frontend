<script setup>
import { computed } from 'vue';
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: null,
  },
  typemessage: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div v-if="typemessage == 1" class="flex items-start mb-2">
    <img
      src="https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93"
      alt="Avatar"
      class="w-10 h-10 rounded-full"
    />
    <div class="ml-4 bg-gray-100 p-4 rounded-lg">
      <p class="text-gray-800">{{ message }}</p>
      <span class="text-gray-500 text-sm">{{ date }}</span>
    </div>
  </div>
  <div v-else class="flex items-end mb-2 justify-end">
    <div class="mr-4 bg-blue-500 text-white p-4 rounded-lg">
      <p>{{ message }}</p>
      <span class="text-gray-200 text-sm">{{ date }}</span>
    </div>
    <img
      src="https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93"
      alt="Avatar"
      class="w-10 h-10 rounded-full"
    />
  </div>
</template>
