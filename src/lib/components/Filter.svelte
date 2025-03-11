<script lang="ts">
  import { slide } from "svelte/transition";
  import Button from "./ui/Button.svelte";
  import { filtered, tags, showHystory } from "../stores/store";

  let showFilter = $state(false);
</script>

<section class="w-screen relative mt-10 flex justify-center">
  <div
    class={[
      "w-screen border",
      !$showHystory ? "border-primary" : "border-secondary",
    ]}
  >
    <Button
      variant={!$showHystory ? "outline" : "secondary"}
      classes="rounded-full absolute right-14 -translate-y-1/2 bg-white"
      onclick={() => (showFilter = !showFilter)}>Filter</Button
    >
    {#if showFilter}
      <div
        transition:slide
        class="container flex flex-wrap m-auto gap-3 p-4 items-center"
      >
        {#if $tags.length > 0}
          {#each $tags as tag (tag.id)}
            <label for={tag.id} class="flex gap-1 py-2">
              <input
                type="checkbox"
                name={tag.id}
                id={tag.id}
                bind:group={$filtered}
                value={tag}
              />
              <span>{tag.label}</span>
            </label>
          {/each}
        {:else}
          <span>You doesn't have tag</span>
        {/if}
      </div>
    {/if}
  </div>
</section>
