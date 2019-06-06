<template>
  <div class="container">
    <h1>Latest Poems</h1>
    <div class="create-poem">
      <label for="create-poem">Say Something...</label>
      <input type="text" id="create-poems" v-model="text" placeholder="Create a poem">
      <button v-on:click="createPoem">Post</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="poems-container">
      <div class="poem"
        v-for="(poem, index) in poems"
        v-bind:item="poem"
        v-bind:index="index"
        v-bind:key="poem._id"
        v-on:click="deletePoem(poem._id)"
      >
        {{ `${poem.createdAt.getDate()}/
        ${poem.createdAt.getMonth()}/
        ${poem.createdAt.getFullYear()}` }}
        <p class="text">{{ poem.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PoemService from '../PoemService'

export default {
  name: 'PoemComponent',
  data() {
    return {
      poems: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.poems = await PoemService.getPoems();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPoem() {
      await PoemService.insertPoem(this.text);
      this.poems = await PoemService.getPoems();
    },
    async deletePoem(id) {
      await PoemService.deletePoem(id);
      this.poems = await PoemService.getPoems();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.poem{
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
}
div.created-at{
  position: absolute;
  top:0;
  left:0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color:white;
  font-size: 13px;
}
p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
