<script>
  import { writable } from "svelte/store";
  const errors = writable([]);
  let url;

  let recordType;
  const apiURL = "/api/dns";
  let result = "result:";
  let isLoading = false;
  const submit = async () => {
    isLoading = true;
    try {
      const responce = await fetch(
        `${apiURL}?url=${url}&recordType=${recordType}`
      );
      const answer = await responce.json();
      result.question = {
        name: url,
        type: recordType,
      };
      result.answer = answer;
      console.log(result);
      console.log(JSON.stringify(result, null, 3));
    } catch (e) {
      $errors = [e.status];
      console.log(e.status);
    } finally {
      isLoading = false;
    }
  };
</script>

<main>
  {#if isLoading}
    <h1>Loading</h1>
  {:else}
    <form>
      <header>
        <div class="content">
          <input
            name="DNS Name"
            placeholder="Enter URL Name"
            bind:value={url}
          />
          <button
            id="button"
            disabled={isLoading}
            type="submit"
            on:click|preventDefault={submit}
          >
            Resolve
          </button>
        </div>
      </header>

      <div class="content">
        <span>RR Type</span>
        <select id="rr_type" bind:value={recordType}>
          <option value="A">A</option>
          <option value="AAAA">AAAA</option>
          <option value="CNAME">CNAME</option>
          <option value="MX">MX</option>
          <option value="NS">NS</option>
          <option value="PTR">PTR</option>
          <option value="SOA">SOA</option>
          <option value="TXT">TXT</option>
        </select>

        <br />
        <h2>Result for</h2>
      </div>
      {#if $errors.length}
        <h2>{$errors[0]}</h2>
      {:else}
        <pre class="output" id="results">{JSON.stringify(result, null, 3)}
	</pre>
      {/if}
    </form>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    margin: 0;
    min-height: 100vh;
    padding: 0;
  }

  header {
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 1ex;

    background: #f5f5f5;
    padding: 16px;
    width: calc(100% - 32px);
  }

  form {
    display: block;
    margin-top: 0em;
  }

  .content {
    max-width: 1100px;
    margin: auto;
    padding: 0 16px;
    text-align: center;
  }

  div {
    display: block;
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
