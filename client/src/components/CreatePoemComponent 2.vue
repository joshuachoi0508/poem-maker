<template>
  <div class="create-poem">
    <form 
      class="create-poem-form"
      @submit.prevent="handleSubmit('POST')"
    >
      <div class="user-inputs">
        <label class="user-input-label">
          Nouns
          <input type="text" class="user-input" v-model="nouns[0]" placeholder="insert a noun">
          <input type="text" class="user-input" v-model="nouns[1]" placeholder="insert a noun">
          <input type="text" class="user-input" v-model="nouns[2]" placeholder="insert a noun">
        </label>

        <label class="user-input-label">
          Adjectives
          <input type="text" class="user-input" v-model="adjectives[0]" placeholder="insert a adjective">
          <input type="text" class="user-input" v-model="adjectives[1]" placeholder="insert a adjective">
          <input type="text" class="user-input" v-model="adjectives[2]" placeholder="insert a adjective">
        </label>

        <label class="user-input-label">
          Adverbs
          <input type="text" class="user-input" v-model="adverbs[0]" placeholder="insert a adverb">
          <input type="text" class="user-input" v-model="adverbs[1]" placeholder="insert a adverb">
          <input type="text" class="user-input" v-model="adverbs[2]" placeholder="insert a adverb">
        </label>

        <label class="user-input-label">
          Prepositions
          <input type="text" class="user-input" v-model="prepositions[0]" placeholder="insert a preposition">
          <input type="text" class="user-input" v-model="prepositions[1]" placeholder="insert a preposition">
          <input type="text" class="user-input" v-model="prepositions[2]" placeholder="insert a preposition">
        </label>

        <label class="user-input-label">
          Verbs
          <input type="text" class="user-input" v-model="verbs[0]" placeholder="insert a verb">
          <input type="text" class="user-input" v-model="verbs[1]" placeholder="insert a verb">
          <input type="text" class="user-input" v-model="verbs[2]" placeholder="insert a verb">
        </label>
      </div>

      <p v-if="errors.length">
        <ul class="error-list">
          <li class="error"
            v-for="error in errors"
            v-bind:item="error"
            v-bind:key="error"
          >{{ error }}</li>
        </ul>
      </p>

      <button class="submit-button" type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'CreatePoemComponent',
  props: ['handleSubmit', 'nouns', 'adjectives', 'adverbs', 'verbs', 'prepositions', 'errors']
}
</script>