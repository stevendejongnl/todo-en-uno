<template>
  <div>nie</div>
</template>

<script>
export default {
  name: 'Sheets',
  data() {
    return {};
  },
  beforeMount() {
    chrome.identity.getAuthToken(
      {
        interactive: true,
      },
      token => {
        console.log('getAuthToken', token);
      }
    );
    chrome.identity.getProfileUserInfo(data => {
      console.log('getProfileUserInfo', data);
    });
  },
};
</script>
