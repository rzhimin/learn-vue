<template>
  <div>
    <Count />
    <hr />
    <Person />
  </div>
</template>

<script>
import Count from "./components/Count";
import Person from "./components/Person";

export default {
  name: "vuexText",
  components: { Count, Person },
};
</script>
