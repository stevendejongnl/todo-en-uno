<template>
  <div id="editor">
    <h3>Translate</h3>

    <v-layout wrap>
      <v-flex xs6>
        <v-autocomplete :items="languageList" v-model="contextSelected"></v-autocomplete>
        <label for="translate">
          <textarea class="textarea-container" id="translate" :value="context" placeholder="Type or paste your content here" ref="translate" @input="update"></textarea>
        </label>
      </v-flex>
      <v-flex xs6>
        <v-autocomplete :items="languageList" v-model="translateSelected"></v-autocomplete>
        <label for="translate">
          <textarea class="textarea-container" id="translated" :value="translated" ref="translated" disabled></textarea>
        </label>
      </v-flex>
      <v-flex xs12>
        <v-btn small color="primary" dark @click="translateContext">Translate</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import languages from 'languages';
import translate from 'translate';

export default {
  name: 'Translate',
  data: function() {
    return {
      context: '',
      contextSelected: 'en',
      translateSelected: 'nl',
      translated: '',
      languageList: [],
      accepted: [],
      engine: 'yandex',
      key: 'trnsl.1.1.20190730T092033Z.c607238f588d4cf3.fb26fa834df22c9389b302d679ea2e6318015da6',
    };
  },
  methods: {
    update: _.debounce(function(event) {
      this.context = event.target.value;
    }, 100),
    setTranslation: function(value) {
      this.translated = value;
    },
    getLanguages: function() {
      let list = [];

      axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${this.key}&ui=en`).then(response => {
        for (let language of Object.keys(response.data.langs)) {
          list.push(language);
        }

        this.accepted = list;
      });
    },
    translateContext: function() {
      function translateString(data) {
        return translate(data.context, { from: data.contextSelected, to: data.translateSelected, engine: data.engine, key: data.key });
      }

      async function asyncTranslate(data) {
        let translation = await translateString(data);
        return translation;
      }

      let data = {
        context: this.context,
        contextSelected: this.contextSelected,
        translateSelected: this.translateSelected,
        engine: this.engine,
        key: this.key,
      };

      let getTranslation = asyncTranslate(data);

      getTranslation.then(
        function success(value) {
          this.setTranslation(value);
        }.bind(this),
        function failure(err) {
          console.log('error', err);
        }
      );
    },
  },
  watch: {
    accepted: function() {
      let list = [];

      for (let language of this.accepted) {
        let object = languages.getLanguageInfo(language);

        list.push({
          text: object.name,
          value: language,
        });
      }

      this.languageList = list;
    },
  },
  mounted() {
    this.getLanguages();
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  &-container {
    width: 100%;
    height: 10rem;
    padding: 0.5rem;
    border: 0.05rem solid grey;
  }
}
</style>
