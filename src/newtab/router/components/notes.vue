<template>
  <div id="editor">
    <h3>Notes</h3>
    <label for="note">
      <textarea class="textarea-container" id="note" :value="notes" ref="notes" v-show="edit" @input="update" @focus="edit = true" @blur="edit = false"></textarea>
    </label>
    <div class="markdown-container" v-show="!edit" @click="selectTextarea" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import 'chrome-extension-async';
import _ from 'lodash';
import marked from 'marked';

export default {
  name: 'Notes',
  data: function() {
    return {
      notes: '# Type your note',
      edit: false,
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.notes);
    },
  },
  methods: {
    update: _.debounce(function(event) {
      this.notes = event.target.value;
      this.setNotes(this.notes);
    }, 100),
    selectTextarea: _.debounce(function() {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.notes.select();
      });
    }, 100),
    getNotes() {
      async function storageSyncNotes() {
        try {
          return await chrome.storage.sync.get(['notes']);
        } catch (err) {
          console.log('error', err);
        }
      }

      storageSyncNotes().then(data => {
        this.notes = data.notes;
      });
    },
    setNotes(value) {
      chrome.storage.sync.set({ notes: value }, () => {
        this.getNotes();
      });
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<style lang="scss" scoped>
.textarea,
.markdown {
  &-container {
    width: 100%;
    height: 18rem;
    padding: 0.5rem;
    border: 0.05rem solid grey;
    cursor: text;
    overflow: scroll;
  }
}
</style>
