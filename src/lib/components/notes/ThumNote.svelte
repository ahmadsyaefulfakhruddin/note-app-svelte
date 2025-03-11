<script lang="ts">
  import { note, notes, tags } from "../../stores/store";
  import type { Note } from "../../types";
  import TagLabel from "../tags/TagLabel.svelte";

  const { thisNote }: { thisNote: Note } = $props();

  function handleSetNote() {
    $note = $notes.find((note) => note.id === thisNote.id) || null;
  }

  const currentTags = $derived(
    $tags.filter((tag) => thisNote.tagIds.includes(tag.id)),
  );
</script>

<button
  type="button"
  onclick={handleSetNote}
  class="flex flex-col gap-2 justify-center items-center py-7 w-full max-w-sm rounded-lg shadow border border-slate-300 hover:scale-105 shadow-sky-50-md transition ease-in-out cursor-pointer"
>
  <h2 class="text-2xl font-bold">{thisNote.title}</h2>
  <div class="max-w-[90%] overflow-auto">
    <TagLabel tags={currentTags} />
  </div>
  <p>
    {thisNote.body.length > 40
      ? `${thisNote.body.slice(0, 40)}...`
      : thisNote.body}
  </p>
</button>
