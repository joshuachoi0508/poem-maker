<template>
  <div class="container">
    <h1 class="title">Poem Board</h1>
      <CreatePoemComponent 
        v-bind:handleSubmit="handleSubmit"
        v-bind:errors="errors"
        v-bind:nouns="nouns"
        v-bind:adjectives="adjectives"
        v-bind:adverbs="adverbs"
        v-bind:prepositions="prepositions"
        v-bind:verbs="verbs"
      />

      <SinglePoemComponent 
        v-bind:handleSubmit="handleSubmit"
        v-bind:editErrors="editErrors"
        v-bind:editNouns="editNouns"
        v-bind:editAdjectives="editAdjectives"
        v-bind:editAdverbs="editAdverbs"
        v-bind:editPrepositions="editPrepositions"
        v-bind:editVerbs="editVerbs"
        v-bind:editPoemId="editPoemId"
        v-bind:poems="poems"
        v-bind:renderEditForm="renderEditForm"
        v-bind:organizePoem="organizePoem"
      />
      
  </div>
</template>

<script>
import PoemService from '../PoemService'
import CreatePoemComponent from './CreatePoemComponent';
import SinglePoemComponent from './SinglePoemComponent';

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
      editErrors: [],
      text: '',
      nouns: [],
      adjectives: [],
      adverbs: [],
      prepositions: [],
      verbs: []
    }
  },
  components: {
    CreatePoemComponent,
    SinglePoemComponent
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
    async editPoem(id) {
      await PoemService.editPoem(id, this.text);
      this.poems = await PoemService.getPoems();
    },
    handleSubmit(type, id) {
      this.errors = [];
      this.editErrors = [];

      if (type === "POST" && this.checkLength("POST") && this.checkChars("POST")) {
        const firstFirstWord = this.prepositions[1][0].toUpperCase() + this.prepositions[1].slice(1).toLowerCase();
        const secondFirstWord = this.prepositions[2][0].toUpperCase() + this.prepositions[2].slice(1).toLowerCase();
        const thirdFirstWord = this.prepositions[0][0].toUpperCase() + this.prepositions[0].slice(1).toLowerCase();
        const title = this.nouns[2][0].toUpperCase() + this.nouns[2].slice(1);

        this.text = `${title}.`
        + `${firstFirstWord} ${this.adjectives[0].toLowerCase()} ${this.nouns[2].toLowerCase()} ${this.adverbs[2].toLowerCase()} ${this.verbs[1].toLowerCase()}.`
        + `${secondFirstWord} ${this.adjectives[2].toLowerCase()} ${this.nouns[0].toLowerCase()} ${this.adverbs[1].toLowerCase()} ${this.verbs[2].toLowerCase()}.`
        + `${thirdFirstWord} ${this.adjectives[1].toLowerCase()} ${this.nouns[1].toLowerCase()} ${this.adverbs[0].toLowerCase()} ${this.verbs[0].toLowerCase()}.`;

        this.nouns = [];
        this.adjectives = [];
        this.adverbs = [];
        this.prepositions = [];
        this.verbs = [];

        this.createPoem();
      }

      if (type === 'PUT' && this.checkLength("PUT") && this.checkChars("PUT")) {
        const firstFirstWord = this.editPrepositions[0][0].toUpperCase() + this.editPrepositions[0].slice(1).toLowerCase();
        const secondFirstWord = this.editPrepositions[1][0].toUpperCase() + this.editPrepositions[1].slice(1).toLowerCase();
        const thirdFirstWord = this.editPrepositions[2][0].toUpperCase() + this.editPrepositions[2].slice(1).toLowerCase();
        const title = this.editNouns[0][0].toUpperCase() + this.editNouns[0].slice(1);

        this.text = `${title}.`
        + `${firstFirstWord} ${this.editAdjectives[0].toLowerCase()} ${this.editNouns[0].toLowerCase()} ${this.editAdverbs[0].toLowerCase()} ${this.editVerbs[0].toLowerCase()}.`
        + `${secondFirstWord} ${this.editAdjectives[1].toLowerCase()} ${this.editNouns[1].toLowerCase()} ${this.editAdverbs[1].toLowerCase()} ${this.editVerbs[1].toLowerCase()}.`
        + `${thirdFirstWord} ${this.editAdjectives[2].toLowerCase()} ${this.editNouns[2].toLowerCase()} ${this.editAdverbs[2].toLowerCase()} ${this.editVerbs[2].toLowerCase()}.`;
  
        this.editNouns = [];
        this.editAdjectives = [];
        this.editAdverbs = [];
        this.editPrepositions = [];
        this.editVerbs = [];
        this.editPoemId = "";
        this.editPoem(id);
      }
    },
    checkLength(type) {
      if (type === "POST" && !(this.nouns.length === 3 && this.adjectives.length === 3 &&
      this.adverbs.length === 3 && this.prepositions.length === 3 &&
      this.verbs.length === 3)) {
        this.errors.push('Insert all fields');
        return false;
      }

      if (type === "PUT") {
        for(let i = 0; i < this.editNouns.length; i++) {
          const noun = this.editNouns[i];
          if (noun === "") {
            this.editErrors.push('Insert all fields');
            return false;
          }

        }

        for(let i = 0; i < this.editAdjectives.length; i++) {
          const adjective = this.editAdjectives[i];
          if (adjective === "") {
            this.editErrors.push('Insert all fields')
            return false;
          }
        }

        for(let i = 0; i < this.editAdverbs.length; i++) {
          const adverb = this.editAdverbs[i];
          if (adverb === "") {
            this.editErrors.push('Insert all fields')
            return false;
          }
        }

        for(let i = 0; i < this.editPrepositions.length; i++) {
          const preposition = this.editPrepositions[i];
          if (preposition === "") {
            this.editErrors.push('Insert all fields')
           return false;
          }
        }

        for(let i = 0; i < this.editVerbs.length; i++) {
          const Verb = this.editVerbs[i];
          if (Verb === "") {
            this.editErrors.push('Insert all fields')
            return false;
          }
        }
      }
      return true;
    },
    checkChars(type) {
      const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

      if (type === "POST") {
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
      }

      if (type === "PUT") {
        for(let i = 0; i < this.editNouns.length; i++) {
          const noun = this.editNouns[i];
          if (noun === undefined) return false;
  
          for(let j = 0; j < noun.length; j++) {
            if (!alphabet.includes(noun[j])) {
              this.editErrors.push('Only insert English characters without any space');
              return false;
            }
          }
        }
  
        for(let i = 0; i < this.editAdjectives.length; i++) {
          const adjective = this.editAdjectives[i];
          if (adjective === undefined) return false;
  
          for(let j = 0; j < adjective.length; j++) {
            if (!alphabet.includes(adjective[j])) {
              this.editErrors.push('Insert only English characters');
              return false;
            }
          }
        }
  
        for(let i = 0; i < this.editAdverbs.length; i++) {
          const adverb = this.editAdverbs[i];
          if (adverb === undefined) return false;
  
          for(let j = 0; j < adverb.length; j++) {
            if (!alphabet.includes(adverb[j])) {
              this.editErrors.push('Only insert English characters');
              return false;
            }
          }
        }
  
        for(let i = 0; i < this.prepositions.length; i++) {
          const preposition = this.prepositions[i];
          if (preposition === undefined) return false;
  
          for(let j = 0; j < preposition.length; j++) {
            if (!alphabet.includes(preposition[j])) {
              this.editErrors.push('Only insert English characters');
              return false;
            }
          }
        }
  
        for(let i = 0; i < this.verbs.length; i++) {
          const verb = this.verbs[i];
          if (verb === undefined) return false;
  
          for(let j = 0; j < verb.length; j++) {
            if (!alphabet.includes(verb[j])) {
              this.editErrors.push('Only insert English characters');
              return false;
            }
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
      this.editVerbs.push(words[4], words[9], words[14]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "reset.scss";
@import "main.css";
</style>
