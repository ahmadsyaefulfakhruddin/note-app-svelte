<script lang="ts">
  import type { Tag } from "../../types";
  import { showHystory } from "../../stores/store";
  import type { ClassValue } from "svelte/elements";

  type TagLabelProps = {
    tags: Tag[] | undefined;
    class?: ClassValue;
  };

  const { tags = [], class: classes }: TagLabelProps = $props();
</script>

{#if tags.length > 0}
  <div class={["flex gap-1", classes]}>
    {#each tags as tag (tag.id)}
      <span
        class={[
          "py-1 px-2 rounded text-white text-sm font-extralight",
          !$showHystory ? "bg-primary" : "bg-secondary",
        ]}>{tag.label}</span
      >
    {/each}
  </div>
{/if}
