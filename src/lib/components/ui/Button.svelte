<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import { slide } from 'svelte/transition';

  type ButtonVariant = 'primary' | 'outline' | 'secondary'
  
  type ButtonProps = {
    variant?: ButtonVariant,
    classes?: ClassValue,
    onclick?: () => void,
    children: () => any,
    type?: "submit" | "button" | "reset" | null | undefined
  }
  
  const {variant = "primary", type = "button", children, classes, onclick}: ButtonProps = $props()
</script>

  {#if variant === "primary"}
    <button type={type} onclick={onclick} class={["bg-primary font-semibold text-white px-4 h-10 border-2 border-primary rounded hover:opacity-75 cursor-pointer", classes]} >
      {@render children?.()}
    </button>
  {:else if variant === "secondary"}
    <button type={type} onclick={onclick} class={["bg-transparent text-secondary hover:bg-secondary font-semibold px-4 h-10 border-2 border-secondary rounded cursor-pointer hover:text-white", classes]} >
      {@render children?.()}
    </button>
  {:else}
    <button type={type} onclick={onclick} class={["bg-inherit text-primary hover:bg-primary font-semibold px-4 h-10 border-2 border-primary rounded cursor-pointer hover:text-white", classes]} >
      {@render children?.()}
    </button>
  {/if}

