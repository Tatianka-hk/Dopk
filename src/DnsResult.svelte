<script>
  import { errors, isLoading, url, recordType, result } from "./store";
  const apiURL = "/api/dns";
  window.onload = async () => {
    $isLoading = true;
    try {
      const responce = await fetch(
        `${apiURL}?url=${$url}&recordType=${$recordType}`
      );
      const answer = await responce.json();
      $result.question = {
        name: $url,
        type: $recordType,
      };
      $result.answer = answer;
    } catch (e) {
      $errors = [e.message];
    } finally {
      $isLoading = false;
    }
  };
</script>

<main>
  {#if $errors.length}
    <h2>{$errors[0]}</h2>
  {:else}
    <pre class="output" id="results">{JSON.stringify($result, null, 3)}</pre>
  {/if}
</main>

<style>
  main {
    text-align: left;
  }
  pre.output {
    background-color: #f5f5f5;
    color: #000;
    font: 400 14px/20px Roboto Mono, monospace;
    padding: 1em;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
</style>
