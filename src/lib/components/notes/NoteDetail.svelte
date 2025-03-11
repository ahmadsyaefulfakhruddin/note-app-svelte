<script lang="ts">
  import { slide } from "svelte/transition";
  import Button from "../ui/Button.svelte";
  import TagLabel from "../tags/TagLabel.svelte";
  import {
    infoTrashNote,
    tags,
    note,
    trashNotes,
    showEditNote,
    delelteTimeOut,
    notes,
  } from "../../stores/store";
  import type { Note } from "../../types";
  import NoteForm from "./NoteForm.svelte";

  type NoteDetail = {
    currentNote: Note;
    variant?: "default" | "hystory";
  };

  const { currentNote, variant = "default" }: NoteDetail = $props();

  function deleteNote() {
    $infoTrashNote = true;
    $trashNotes = [currentNote.id, ...$trashNotes];
    $note = null;

    $delelteTimeOut = setTimeout(() => {
      $infoTrashNote = false;
    }, 5000);
  }

  function deleteHystory() {
    $notes = $notes.filter((note) => note.id !== currentNote.id);
    $trashNotes = $trashNotes.filter((trashId) => trashId !== currentNote.id);
    $note = null;
  }

  function restoreNote() {
    $trashNotes = $trashNotes.filter((trashId) => trashId !== currentNote.id);
    $note = null;
  }

  const thisNote = $derived($notes.find((note) => note.id === currentNote.id)!);

  const currentTags = $derived(
    thisNote.tagIds.map((tagId) => {
      return $tags.find((tag) => tag.id === tagId)!;
    }),
  );
</script>

<div
  class="fixed top-0 py-7 h-full w-full flex justify-center items-center bg-slate-950/50 px-4 flex-col"
>
  {#if !$showEditNote}
    <div
      transition:slide
      class="flex flex-col p-4 bg-white max-w-lg w-full rounded shadow max-h-[90vh] gap-2"
    >
      <h1 class="text-3xl font-bold row-start-1 row-span-1 overflow-hidden">
        {thisNote.title}
      </h1>
      <div class="max-h-[90%] grid grid-rows-10 gap-2">
        <div class="row-start-1 row-span-9 max-h-full overflow-auto">
          <div class="flex flex-col gap-2">
            {#if currentTags}
              <TagLabel tags={currentTags} class="flex-wrap" />
            {/if}
            <p>{thisNote.body}</p>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          {#if variant === "default"}
            <Button variant="secondary" onclick={deleteNote}>Delete</Button>
            <Button variant="outline" onclick={() => ($note = null)}
              >Close</Button
            >
            <Button type="button" onclick={() => ($showEditNote = true)}
              >Edit</Button
            >
          {:else}
            <Button type="button" variant="secondary" onclick={restoreNote}
              >Restore</Button
            >
            <Button variant="outline" onclick={() => ($note = null)}
              >Close</Button
            >
            <Button onclick={deleteHystory}>Delete</Button>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div transition:slide class="w-full flex justify-center">
      <NoteForm
        body={thisNote.body}
        id={thisNote.id}
        title={thisNote.title}
        {currentTags}
      />
    </div>
  {/if}
</div>
