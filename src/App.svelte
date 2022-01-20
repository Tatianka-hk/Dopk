<script>
  import DnsResult from "./DnsResult.svelte";
  import { isLoading, url, recordType, errors, result } from "./store";
  const urlSearchParams = new URLSearchParams(window.location.search);

  const params = Object.fromEntries(urlSearchParams.entries());
  $url = params.url ?? "";
  $recordType = params.recordType ?? "";
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
  <form action="/">
    <header>
      <div class="content">
        <input name="url" placeholder="Enter URL Name" value={$url} />
        <button id="button" disabled={$isLoading} type="submit">
          Resolve
        </button>
      </div>
    </header>
    <div class="content">
      <span>RR Type</span>
      <select id="rr_type" name="recordType">
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
      {#if $isLoading}
        <span class="loading"><h1>Loading</h1></span>
      {/if}

      {#if $url && $recordType}
        <DnsResult />
      {/if}
    </div>
  </form>
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
  .loading {
    position: fixed;
    top: 60px;
    left: 40px;
  }
</style>
