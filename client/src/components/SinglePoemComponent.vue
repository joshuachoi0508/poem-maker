<template>
  <div class="poems-container">

    <div class="poem"
      v-for="(poem, index) in poems"
      v-bind:item="poem"
      v-bind:index="index"
      v-bind:key="poem._id"
    >
      <div class="date-and-delete">
        <p>
          {{ poem.createdAt.getDate() }}/{{ poem.createdAt.getMonth() }}/{{ poem.createdAt.getFullYear()}}
        </p>
        <div class="edit-and-delete">
          <p
            class="edit-button"
            v-on:click="renderEditForm(poem._id, poem.text)"
          >Edit</p>
          <p
            class="delete-button"
            v-on:click="deletePoem(poem._id)"
          >
            X
          </p>
        </div>
      </div>

        <div 
          v-if="!(editPoemId === poem._id)"
          v-html="organizePoem(poem)"
        >
        </div>

        <div v-if="editPoemId === poem._id">
          <form 
            class="create-poem-form"
            @submit.prevent="handleSubmit('PUT', poem._id)"
          >
            <div class="user-inputs">
              <label class="user-input-label">
                Nouns
                <input type="text" class="user-input" v-model="editNouns[0]" placeholder="insert a noun">
                <input type="text" class="user-input" v-model="editNouns[1]" placeholder="insert a noun">
                <input type="text" class="user-input" v-model="editNouns[2]" placeholder="insert a noun">
              </label>

              <label class="user-input-label">
                Adjectives
                <input type="text" class="user-input" v-model="editAdjectives[0]" placeholder="insert a adjective">
                <input type="text" class="user-input" v-model="editAdjectives[1]" placeholder="insert a adjective">
                <input type="text" class="user-input" v-model="editAdjectives[2]" placeholder="insert a adjective">
              </label>

              <label class="user-input-label">
                Adverbs
                <input type="text" class="user-input" v-model="editAdverbs[0]" placeholder="insert a adverb">
                <input type="text" class="user-input" v-model="editAdverbs[1]" placeholder="insert a adverb">
                <input type="text" class="user-input" v-model="editAdverbs[2]" placeholder="insert a adverb">
              </label>

              <label class="user-input-label">
                Prepositions
                <input type="text" class="user-input" v-model="editPrepositions[0]" placeholder="insert a preposition">
                <input type="text" class="user-input" v-model="editPrepositions[1]" placeholder="insert a preposition">
                <input type="text" class="user-input" v-model="editPrepositions[2]" placeholder="insert a preposition">
              </label>

              <label class="user-input-label">
                Verbs
                <input type="text" class="user-input" v-model="editVerbs[0]" placeholder="insert a verb">
                <input type="text" class="user-input" v-model="editVerbs[1]" placeholder="insert a verb">
                <input type="text" class="user-input" v-model="editVerbs[2]" placeholder="insert a verb">
              </label>
            </div>

            <p v-if="editErrors.length">
              <ul class="error-list">
                <li class="error"
                  v-for="error in editErrors"
                  v-bind:item="error"
                  v-bind:key="error"
                >{{ error }}</li>
              </ul>
            </p>

            <button class="submit-button" type="submit">Submit</button>
          </form>
        </div>

    </div>

  </div>
</template>

<script>
import PoemService from '../PoemService'

export default {
  name: 'SinglePoemComponent',
  props: ['handleSubmit', 'editErrors', 'editNouns', 'editAdjectives', 'editAdverbs',
    'editPrepositions', 'editVerbs', 'editPoemId', 'poems', 'renderEditForm', 'organizePoem'],
  methods: {
    async deletePoem(id) {
      await PoemService.deletePoem(id);
      this.poems = await PoemService.getPoems();
    }
  }
}
</script>