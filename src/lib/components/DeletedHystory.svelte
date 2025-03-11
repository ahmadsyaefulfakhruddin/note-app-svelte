<script lang="ts">
  import { notes, trashNotes, showHystory } from '../stores/store'
  import Notes from './notes/Notes.svelte';
  import Button from './ui/Button.svelte';
  
  function handleSumit(e: Event) {
    e.preventDefault()
  }

  const listDeleteNotes = $derived($notes.filter(note => $trashNotes.includes(note.id)))
</script>

<form class="flex flex-col p-4 w-full">
  <header class="fixed py-3 px-4 w-screen">
    <div class="container flex justify-between">
      <h1 class="text-3xl font-bold">Hystory Deleted</h1>
      <nav class="flex justify-end row-start-8 gap-3">
        <Button type="submit" variant="secondary">Delete</Button>
        <Button type="button" variant="outline" onclick={() => $showHystory = false}>Close</Button>
        <Button type="submit">Restore</Button>
      </nav>
    </div>
  </header>
</form>