<template>
  <div>
    <LocalStorageDemo />
    <SessionStorageDemo />
    <StorageDiff />
  </div>
</template>

<script>
import LocalStorageDemo from "./LocalStorageDemo.vue";
import SessionStorageDemo from "./SessionStorageDemo.vue";
import StorageDiff from "./StorageDiff.vue";

export default {
  name: "demo",
  components: { LocalStorageDemo, SessionStorageDemo, StorageDiff },
};
</script>
