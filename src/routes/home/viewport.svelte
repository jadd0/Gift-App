<script lang='ts'>
  export let width: Number = 10

  function scrollCheck(e: any) {
    console.log(e)
  }
</script>

<div on:scroll={scrollCheck}>
  <slot></slot>
</div>