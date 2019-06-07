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
          <p>{{ `${poem.createdAt.getDate()}/${poem.createdAt.getMonth()}/${poem.createdAt.getFullYear()}` }}</p>
          <p
            class="delete-button"
            v-on:click="deletePoem(poem._id)"
          >X</p>
        </div>
        <div v-html="organizePoem(poem)"></div>
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
      const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ".split('')

      for(let i = 0; i < this.nouns.length; i++) {
        const noun = this.nouns[i];
        if (noun === undefined) return false;

        for(let j = 0; j < noun.length; j++) {
          if (!alphabet.includes(noun[j])) {
            this.errors.push('Only insert English characters');
            return false;
          }
        }
      }

      for(let i = 0; i < this.adjectives.length; i++) {
        const adjective = this.adjectives[i];
        if (adjective === undefined) return false;

        for(let j = 0; j < adjective.length; j++) {
          if (!alphabet.includes(adjective[j])) {
            this.errors.push('Only insert English characters');
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "reset.scss";
h1.title{
  font-weight: 900;
  font-size: 45px;
  margin-bottom: 15px;
}
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
  margin: 20px;
}
div.poems-container {
  display: flex;
  flex-direction: column-reverse;
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
  padding: 30px;
}
div.date-and-delete{
  display: flex;
  justify-content: space-between;
}
p.delete-button{
  cursor: pointer;
  transition: all .3s;
}
p.delete-button:hover{
  color: grey;
  transition: all .3s;
}
div.user-inputs{
  display: flex;
  font-weight: 900;
}
label.user-input-label{
  margin-top: 15px;
  margin-bottom: 15px;
}
input.user-input {
  margin: 7px;
  width: 77%;
  height: 30px;
  border: none;
  border: 1px solid rgba(211,211,211, .3);
  border-radius: 4px;
  box-shadow: -3px 0px 16.5px 1.1px rgba(0, 0, 0, 0.05);
  padding-left: 5px;
  font-family: inherit;
}
button.submit-button {
  width: 145px;
    height: 43px;
    border-radius: 5px;
    background-color: #41b46a;
    color: white;
    font-size: 14.5px;
    font-weight: 900;
    text-align: center;
    opacity: .5;
    cursor: pointer;
    transition: all .3s;
}
button.submit-button:hover{
  opacity: 1;
  transition: all .3s;
}
ul.error-list {
  margin-bottom: 15px;
}
li.error {
  color: red;
}
</style>
