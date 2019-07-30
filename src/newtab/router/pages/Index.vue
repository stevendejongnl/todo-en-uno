<template>
  <v-app>
    <header-bar></header-bar>
    <empty-row></empty-row>

    <v-content>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <notes></notes>
          </v-flex>
          <v-flex xs6>
            <convert-case></convert-case>
          </v-flex>
          <v-flex xs12>
            <translate></translate>
          </v-flex>
          <v-flex xs6>
            <sheets></sheets>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import headerBar from '../components/header';
import emptyRow from '../components/empty-row';
import notes from '../components/notes';
import convertCase from '../components/convert-case';
import translate from '../components/translate';
import sheets from '../components/sheets';

export default {
  components: {
    headerBar,
    emptyRow,
    notes,
    convertCase,
    translate,
    sheets,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
  color: red;
}
</style>
