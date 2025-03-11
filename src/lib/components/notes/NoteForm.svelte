<script lang="ts">
  import { slide } from "svelte/transition";
  import type { IsError, NoteData, Tag, TagData } from "../../types";
  import Button from "../ui/Button.svelte";
  import { getId } from "../../utils";
  import {
    notes,
    showCreateNote,
    showEditNote,
    tags,
  } from "../../stores/store";

  type NoteFormProps = {
    id?: string;
    currentTags?: Tag[] | undefined;
  } & Partial<NoteData>;

  const {
    currentTags = [],
    body = "",
    id = "",
    title = "",
  }: NoteFormProps = $props();

  const isError = $state<IsError>({
    error: { tag: false, title: false },
    message: "",
  });
  let availableTags = $state([...$tags]);

  let selectedTags = $state<Tag[]>(
    availableTags.filter((availableTag) =>
      currentTags.some((currentTag) => currentTag.id === availableTag.id),
    ),
  );

  let noteData = $state<NoteData>({ body, title });

  let tagData = $state<TagData>({ label: "" });
  let showCreateTag = $state(false);

  function handleCreateNewTag() {
    if (!tagData.label.trim()) {
      showCreateTag = !showCreateTag;
      return;
    }

    if (tagData.label.trim().length > 15) {
      isError.error.tag = true;
      isError.message = "The label of tag cannot be greater than 15";
      return;
    }

    const tagIsExist = availableTags.find((tag) => tag.label === tagData.label);

    if (tagIsExist) {
      isError.error.tag = true;
      isError.message = "The is already exist";
      return;
    }

    isError.error.tag = false;
    isError.message = "";
    const id = getId();

    availableTags.unshift({ id, label: tagData.label.trim() });
    tagData.label = "";
  }

  function handleDelteOneSelecteTag(id: string) {
    const newTags = selectedTags.filter((tag) => tag.id !== id);
    selectedTags = newTags;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!noteData.title.trim()) {
      isError.error.title = true;
      isError.message = "The title doesn't empety";
      return;
    }

    if (noteData.title.trim().length > 25) {
      isError.error.title = true;
      isError.message = "The title cannot be greater than 25";
      return;
    }

    const newTags = selectedTags.map((tag) => tag.id);
    $tags = [
      ...$tags,
      ...selectedTags.filter(
        (newTag) => !$tags.some((oldTag) => oldTag.id === newTag.id),
      ),
    ];

    handleShowNoteForm();
    if (id) {
      $notes = $notes.map((prev) =>
        prev.id === id ? { ...noteData, id, tagIds: newTags } : prev,
      );

      return;
    }
    const noteId = getId();

    $notes = [{ ...noteData, id: noteId, tagIds: newTags }, ...$notes];
  }

  function handleShowNoteForm() {
    if (id) {
      $showEditNote = false;
      return;
    }
    $showCreateNote = false;
  }
</script>

<form
  onsubmit={handleSubmit}
  class="grid grid-rows-8 grid-cols-1 items-center p-4 bg-white max-w-lg w-full rounded shadow max-h-[90vh]"
>
  <h1 class="text-2xl font-bold row-start-1 row-span-1 overflow-hidden">
    Create Note
  </h1>
  <div class="row-start-2 row-span-6 overflow-auto max-h-full">
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <label for="title" class="text-xl">Title</label>
        <input
          class="rounded-md"
          type="text"
          id="title"
          bind:value={noteData.title}
        />
      </div>

      {#if isError.error.title}
        <span transition:slide class="text-red-400">{isError.message}</span>
      {/if}

      <div class="flex flex-col gap-2">
        <span class={["text-xl", isError.error.tag ? "text-red-400" : ""]}
          >Tag</span
        >

        {#if selectedTags.length > 0}
          <div transition:slide class="flex flex-wrap gap-2">
            {#each selectedTags as tag}
              <div
                transition:slide
                class="flex items-center border border-primary rounded"
              >
                <button
                  onclick={() => handleDelteOneSelecteTag(tag.id)}
                  type="button"
                  class="peer order-2 h-full px-2 text-white cursor-pointer bg-primary"
                  >x</button
                >
                <span
                  class="peer-hover:bg-primary peer-hover:text-white order-1 py-0.5 px-2 transition"
                  >{tag.label}</span
                >
              </div>
            {/each}
          </div>
        {/if}

        {#if availableTags.length > 0}
          <div class="grid grid-cols-1 gap-1 max-h-32 overflow-auto">
            {#each availableTags as tag (tag.id)}
              <div transition:slide class="flex gap-1">
                <input
                  class="rounded-md"
                  type="checkbox"
                  bind:group={selectedTags}
                  value={tag}
                  name={tag.id}
                  id={tag.id}
                />
                <label for={tag.id}>{tag.label}</label>
              </div>
            {/each}
          </div>
        {:else}
          <span>You don't have tag</span>
        {/if}
      </div>

      {#if showCreateTag}
        <div class="flex gap-2" transition:slide>
          <input
            class="rounded-md grow"
            type="text"
            bind:value={tagData.label}
          />
          <Button onclick={handleCreateNewTag}>
            {tagData.label.length > 0 ? "Create" : "Cancle"}
          </Button>
        </div>
      {:else}
        <div transition:slide>
          <Button onclick={() => (showCreateTag = !showCreateTag)}>
            Create Tag
          </Button>
        </div>
      {/if}

      {#if isError.error.tag}
        <span transition:slide class="text-red-400">{isError.message}</span>
      {/if}

      <div class="flex flex-col gap-2">
        <label for="body" class="text-xl">body</label>
        <textarea
          name="body"
          id="body"
          class="rounded-md"
          rows="7"
          bind:value={noteData.body}
        ></textarea>
      </div>
    </div>
  </div>
  <div class="row-start-8 flex justify-end gap-3">
    <Button variant="outline" onclick={handleShowNoteForm}>Cancle</Button>
    <Button type="submit">Save</Button>
  </div>
</form>
