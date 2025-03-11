<script lang="ts">
  import { fly } from "svelte/transition";
  import Button from "./lib/components/ui/Button.svelte";
  import CreateNote from "./lib/components/notes/CreateNote.svelte";
  import Header from "./lib/components/Header.svelte";
  import NoteDetail from "./lib/components/notes/NoteDetail.svelte";
  import Notes from "./lib/components/notes/Notes.svelte";

  import {
    infoTrashNote,
    note,
    showCreateNote,
    trashNotes,
    delelteTimeOut,
    showEditTag,
    showHystory,
    listNotes,
    listTrashNotes,
  } from "./lib/stores/store";
  import EditTag from "./lib/components/tags/EditTag.svelte";
  import Filter from "./lib/components/Filter.svelte";
  import DeletedHystory from "./lib/components/DeletedHystory.svelte";

  function cancleDeletaNote() {
    $infoTrashNote = false;
    if ($delelteTimeOut) {
      clearTimeout($delelteTimeOut);
      $delelteTimeOut = 0;
    }
    trashNotes.update((prev) => prev.filter((p) => p !== prev[0]));
  }
</script>

<main class={"h-full"}>
  <Header />

  <Filter />
  {#if !$showHystory}
    <Notes notes={listNotes} />
    {#if $note}
      <NoteDetail currentNote={$note} />
    {/if}
  {:else}
    <Notes notes={listTrashNotes} />
    {#if $note}
      <NoteDetail currentNote={$note} variant={"hystory"} />
    {/if}
  {/if}

  {#if $showCreateNote}
    <CreateNote />
  {/if}

  {#if $showEditTag}
    <EditTag />
  {/if}

  {#if $infoTrashNote}
    <div
      transition:fly={{ x: 10 }}
      class="fixed bottom-0 right-0 m-4 rounded-md border shadow-lg border-secondary p-4 bg-white"
    >
      <span>Note is deleted</span>
      <Button classes="scale-75" onclick={cancleDeletaNote}>Cancle</Button>
    </div>
  {/if}
</main>
