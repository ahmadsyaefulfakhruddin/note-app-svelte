<script lang="ts">
  import { showCreateNote, showEditTag, showHystory } from "../stores/store";
  import Button from "./ui/Button.svelte";
</script>

<header class="z-10 top-0 left-0 right-0 flex justify-center bg-white shadow">
  <div class="container flex justify-between px-4 flex-wrap">
    <h1
      class={[
        "py-4 text-3xl font-extrabold",
        !$showHystory ? "text-primary" : "text-secondary",
      ]}
    >
      {!$showHystory ? "Note App" : "Hystory Note App"}
    </h1>
    <div class="flex gap-4 items-center flex-wrap py-2">
      <Button onclick={() => ($showHystory = !$showHystory)} variant="secondary"
        >{!$showHystory ? "Hystory" : "back"}</Button
      >
      {#if !$showHystory}
        <Button onclick={() => ($showEditTag = true)} variant="outline"
          >Edit Tag</Button
        >
        <Button onclick={() => ($showCreateNote = true)}>Create Note</Button>
      {/if}
    </div>
  </div>
</header>
