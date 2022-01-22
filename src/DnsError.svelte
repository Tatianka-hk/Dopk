<script>
  import { errors } from "./store";
</script>

<main>
  <pre class="output" id="results">{JSON.stringify($errors, null, 3)}</pre>
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
