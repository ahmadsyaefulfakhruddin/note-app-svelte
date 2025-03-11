<script lang="ts">
  import { slide } from "svelte/transition";
  import { notes, showEditTag, tags } from "../../stores/store";
  import type { IsError } from "../../types";
  import Button from "../ui/Button.svelte";

  let availableTags = $state([...$tags]);
  const isError = $state<IsError>({
    error: { tag: false, title: false },
    message: "",
  });

  function handleSumit(e: Event) {
    e.preventDefault();

    const emperyLabels = availableTags.filter((tag) => !tag.label.trim());

    if (emperyLabels.length > 0) {
      isError.error.tag = true;
      isError.message = "The label of tag don't empety";
      return;
    }

    const invalidLabels = availableTags.filter(
      (tag) => tag.label.trim().length > 15,
    );

    if (invalidLabels.length > 0) {
      isError.error.tag = true;
      isError.message = "The label of tag cannot be greater than 15";
      return;
    }

    const tagEditeds = availableTags.filter((availableTag) =>
      $tags.some(
        (tag) => tag.id === availableTag.id && availableTag.label !== tag.label,
      ),
    );

    const tagIsExist = tagEditeds.find((edited) =>
      $tags.some((tag) => tag.label === edited.label),
    );

    if (tagIsExist) {
      isError.error.tag = true;
      isError.message = "The label is already exist";
      return;
    }

    const deletedTags = $tags.filter(
      (tag) =>
        !availableTags.some((availableTag) => availableTag.id === tag.id),
    );

    $notes = $notes.map((note) => {
      return {
        ...note,
        tagIds: note.tagIds.filter(
          (tagId) => !deletedTags.some((tag) => tag.id === tagId),
        ),
      };
    });

    $tags = availableTags.map((tag) => {
      return {
        ...tag,
        label: tag.label.trim(),
      };
    });

    $showEditTag = false;
  }

  function handleDeleteTag(id: string) {
    availableTags = availableTags.filter((tag) => tag.id !== id);
  }
</script>

<div
  class="fixed top-0 py-7 h-full w-full flex justify-center items-center bg-slate-950/50 px-4 flex-col"
>
  <div
    class="grid grid-cols-1 items-start p-4 bg-white max-w-lg w-full rounded shadow max-h-[90vh] gap-4"
  >
    <div
      class="py-2 px-4 border-b border-secondary row-start-1 row-span-1 bg-inherit"
    >
      <h1 class="text-3xl font-bold">Edit Tags</h1>
      {#if isError.error.tag}
        <span transition:slide class="text-red-400 block"
          >{isError.message}</span
        >
      {/if}
    </div>
    <form onsubmit={handleSumit} class="grid grid-rows-6 gap-3 max-h-[95%]">
      <div
        class="max-h-full overflow-auto py-3 row-span-5 flex flex-col gap-2 w-full"
      >
        {#each availableTags as tag (tag.id)}
          <div
            transition:slide
            class="flex items-center border-2 border-primary rounded-md p-0"
          >
            <button
              type="button"
              class="text-2xl peer order-2 h-full px-4 text-white cursor-pointer border-primary border-y bg-primary"
              onclick={() => handleDeleteTag(tag.id)}>x</button
            >
            <input
              type="text"
              class="peer-hover:bg-primary w-full h-full peer-hover:text-white order-1 transition border-none rounded-none p-0"
              bind:value={tag.label}
            />
          </div>
        {/each}
      </div>
      <div class="flex w-full justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onclick={() => ($showEditTag = false)}>Close</Button
        >
        <Button type="submit">Save</Button>
      </div>
    </form>
  </div>
</div>
