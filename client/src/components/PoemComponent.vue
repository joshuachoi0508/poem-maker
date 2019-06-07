<template>
  <div class="container">
    <h1 class="title">Poem Board</h1>
    <div class="create-poem">
      <form 
        class="create-poem-form"
        @submit.prevent="handleSubmit"
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
              @submit.prevent="handleSubmit"
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
      editPoemId: "",
      editNouns: [],
      editAdjectives: [],
      editAdverbs: [],
      editPrepositions: [],
      editVerbs: [],
      error: '',
      errors: [],
      text: '',
      nouns: [],
      adjectives: [],
      adverbs: [],
      prepositions: [],
      verbs: []
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
    },
    handleSubmit(e){
      e.preventDefault;
      this.errors = [];

      if (this.checkLength() && this.checkChars()) {
        const firstFirstWord = this.prepositions[1][0].toUpperCase() + this.prepositions[1].slice(1).toLowerCase();
        const secondFirstWord = this.prepositions[2][0].toUpperCase() + this.prepositions[2].slice(1).toLowerCase();
        const thirdFirstWord = this.prepositions[0][0].toUpperCase() + this.prepositions[0].slice(1).toLowerCase();
        const title = this.nouns[2][0].toUpperCase() + this.nouns[2].slice(1);

        this.text = `${title}.`
        + `${firstFirstWord} ${this.adjectives[0].toLowerCase()} ${this.nouns[2].toLowerCase()} ${this.adverbs[2].toLowerCase()} ${this.verbs[1]}.`
        + `${secondFirstWord} ${this.adjectives[2].toLowerCase()} ${this.nouns[0].toLowerCase()} ${this.adverbs[1].toLowerCase()} ${this.verbs[2].toLowerCase()}.`
        + `${thirdFirstWord} ${this.adjectives[1].toLowerCase()} ${this.nouns[1].toLowerCase()} ${this.adverbs[0].toLowerCase()} ${this.verbs[0].toLowerCase()}.`;

        this.nouns = [];
        this.adjectives = [];
        this.adverbs = [];
        this.prepositions = [];
        this.verbs = [];

        this.createPoem();
      }
    },
    checkLength() {
      if (!(this.nouns.length === 3 && this.adjectives.length === 3 &&
      this.adverbs.length === 3 && this.prepositions.length === 3 &&
      this.verbs.length === 3
      )) {
        this.errors.push('Insert all fields');
        return false;
      }

      return true;
    },
    checkChars() {
      const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

      for(let i = 0; i < this.nouns.length; i++) {
        const noun = this.nouns[i];
        if (noun === undefined) return false;

        for(let j = 0; j < noun.length; j++) {
          if (!alphabet.includes(noun[j])) {
            this.errors.push('Only insert English characters without any space');
            return false;
          }
        }
      }

      for(let i = 0; i < this.adjectives.length; i++) {
        const adjective = this.adjectives[i];
        if (adjective === undefined) return false;

        for(let j = 0; j < adjective.length; j++) {
          if (!alphabet.includes(adjective[j])) {
            this.errors.push('Insert only English characters');
            return false;
          }
        }
      }

      for(let i = 0; i < this.adverbs.length; i++) {
        const adverb = this.adverbs[i];
        if (adverb === undefined) return false;

        for(let j = 0; j < adverb.length; j++) {
          if (!alphabet.includes(adverb[j])) {
            this.errors.push('Only insert English characters');
            return false;
          }
        }
      }

      for(let i = 0; i < this.prepositions.length; i++) {
        const preposition = this.prepositions[i];
        if (preposition === undefined) return false;

        for(let j = 0; j < preposition.length; j++) {
          if (!alphabet.includes(preposition[j])) {
            this.errors.push('Only insert English characters');
            return false;
          }
        }
      }

      for(let i = 0; i < this.verbs.length; i++) {
        const verb = this.verbs[i];
        if (verb === undefined) return false;

        for(let j = 0; j < verb.length; j++) {
          if (!alphabet.includes(verb[j])) {
            this.errors.push('Only insert English characters');
            return false;
          }
        }
      }

      return true;
    },
    organizePoem(poem){
      const poemArray = poem.text.split('.');

      return `
      <p data-v-25a0ba54 class="text">
        ${poemArray[0]}
        </br>
        </br>
        ${poemArray[1]}
        </br>
        ${poemArray[2]}
        </br>
        ${poemArray[3]}
      </p>
      `;
    },
    renderEditForm(id, text) {
      if (this.editPoemId === id) {
        this.editPoemId = "";
        this.editNouns = [];
        this.editAdjectives = [];
        this.editAdverbs = [];
        this.editPrepositions = [];
        this.editVerbs = [];
      } else {
        this.editPoemId = id;
        this.updateEditWords(text);
      }
    },
    updateEditWords(text){
      const sentences = text.split(".");
      const words = sentences.slice(1).join(" ").split(" ");

      this.editNouns = [];
      this.editAdjectives = [];
      this.editAdverbs = [];
      this.editPrepositions = [];
      this.editVerbs = [];

      this.editNouns.push(words[2], words[7], words[12]);
      this.editAdjectives.push(words[1], words[6], words[11]);
      this.editAdverbs.push(words[3], words[8], words[13]);
      this.editPrepositions.push(words[0], words[5], words[10]);
      this.editVerbs.push(words[4], words[10], words[14]);
    }

    // "Against bright foot seductively 
    // Swim In large ear plug slowly catch After limited phone quietly lie "

    //"Behind loud club highly 
    //dance Throughout silent store lowly draw Before quiet cave completely die "
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "reset.scss";
@import "main.css";
</style>
