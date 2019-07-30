<template>
  <div id="editor">
    <h3>Convert Case</h3>
    <label for="convert-case">
      <textarea class="textarea-container" id="convert-case" :value="convertCase" placeholder="Type or paste your content here" ref="convert-case" @input="update"></textarea>
    </label>

    <v-layout wrap align-left>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('camelCase')">camelCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('constantCase')">constantCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('dotCase')">dotCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('headerCase')">headerCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('lowerCase')">lowerCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('lowerCaseFirst')">lowerCaseFirst</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('noCase')">noCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('paramCase')">paramCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('pascalCase')">pascalCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('pathCase')">pathCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('sentenceCase')">sentenceCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('snakeCase')">snakeCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('swapCase')">swapCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('titleCase')">titleCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('upperCase')">upperCase</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small color="primary" dark @click="convert('upperCaseFirst')">upperCaseFirst</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash';
import { no, dot, swap, path, upper, lower, camel, snake, title, param, header, pascal, constant, sentence, isUpper, isLower, ucFirst, lcFirst } from 'change-case';

export default {
  name: 'ConvertCase',
  data: function() {
    return {
      convertCase: 'Type or paste your content here',
    };
  },
  methods: {
    update: _.debounce(function(event) {
      this.convertCase = event.target.value;
      this.setConvertCase(this.convertCase);
    }, 100),
    getConvertCase() {
      async function storageSyncNotes() {
        try {
          return await chrome.storage.local.get(['convertCase']);
        } catch (err) {
          console.log('error', err);
        }
      }

      storageSyncNotes().then(data => {
        this.convertCase = data.convertCase;
      });
    },
    setConvertCase(value) {
      console.log('value', value);
      chrome.storage.local.set({ convertCase: value }, () => {
        return this.getConvertCase();
      });
    },
    convert(type) {
      let converted = this.convertCase;

      if (type === 'camelCase') converted = camel(this.convertCase);
      if (type === 'constantCase') converted = constant(this.convertCase);
      if (type === 'dotCase') converted = dot(this.convertCase);
      if (type === 'headerCase') converted = header(this.convertCase);
      if (type === 'lowerCase') converted = lower(this.convertCase);
      if (type === 'lowerCaseFirst') converted = lcFirst(this.convertCase);
      if (type === 'noCase') converted = no(this.convertCase);
      if (type === 'paramCase') converted = param(this.convertCase);
      if (type === 'pascalCase') converted = pascal(this.convertCase);
      if (type === 'pathCase') converted = path(this.convertCase);
      if (type === 'sentenceCase') converted = sentence(this.convertCase);
      if (type === 'snakeCase') converted = snake(this.convertCase);
      if (type === 'swapCase') converted = swap(this.convertCase);
      if (type === 'titleCase') converted = title(this.convertCase);
      if (type === 'upperCase') converted = upper(this.convertCase);
      if (type === 'upperCaseFirst') converted = ucFirst(this.convertCase);

      this.setConvertCase(converted);
    },
  },
  mounted() {
    this.getConvertCase();
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
