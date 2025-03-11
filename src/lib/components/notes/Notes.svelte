<script lang="ts">
  import type { Readable } from "svelte/store";
  import { showCreateNote, showHystory } from "../../stores/store";
  import ThumNote from "./ThumNote.svelte";
  import type { Note } from "../../types";

  type NotesProps = {
    notes: Readable<Note[]>;
  };

  function handleSetShowCreateNote() {
    $showCreateNote = true;
  }

  const { notes }: NotesProps = $props();
</script>

<section class="w-full flex justify-center pt-10 pb-20 px-2">
  {#if $notes.length > 0}
    <div
      class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl px-4 justify-center w-full justify-items-center gap-4"
    >
      {#each $notes as note (note.id)}
        <ThumNote thisNote={note} />
      {/each}
    </div>
  {:else if !$showHystory}
    <span
      >You doesn't have Note <button
        class="text-sky-500 hover:underline col-span-3 m-auto"
        onclick={handleSetShowCreateNote}
        type="button">click here</button
      > to crate note</span
    >
  {:else}
    <span
      >You doesn't have deleted note <button
        class="text-sky-500 hover:underline col-span-3 m-auto"
        onclick={() => ($showHystory = !$showHystory)}
        type="button">click here</button
      > back to home</span
    >
  {/if}
</section>
