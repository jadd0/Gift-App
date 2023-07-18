<script lang="ts">
  import { onMount } from 'svelte';
  export let data
  import { auth } from '../../stores'
  import { get } from 'svelte/store'

  const Auth = get(auth)

  let user = false

  onMount(async () => {
    const cookie = Auth.Parse.parseCookie(document.cookie);

    if (cookie.key == undefined) {
      return
    }
    const auth = await Auth.checkKey(cookie.key)
    if (!auth) {
      return 
    }
    user = auth
  })
  


  // let user = ''
</script>

{#if user}
	<slot {user} />
{:else}
	<slot user="false" />
{/if}
