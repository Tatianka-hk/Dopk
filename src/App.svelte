<script>
	let url;
	let recordType;
	const apiURL = '/api/dns'
	const submit = async () => {
		//spinner
		try{
			const responce = await fetch(`${apiURL}?url=${url}&recordType=${recordType}`);
			const result = await responce.json();
			console.log(result);
		}
		catch(e){
			//handle errors
			console.log(e.message);
		}
		finally{
			//spinner off
		}
	}
</script>

<main>
	<form>
		<header>
			<div class="content">
				<input
					name="DNS Name"
					placeholder="Enter URL Name"
					style="display: inline-block;"
					bind:value={url}
				/>
				<button
					id="button"
					style="display: inline-block;"
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
				<option value="ALL">ALL</option>
				<option value="CA">CA</option>
				<option value="CDS">CDS</option>
				<option value="CERT">CERT</option>
				<option value="CNAME">CNAME</option>
				<option value="DNAME">DNAME</option>
				<option value="DNSKEY">DNSKEY</option>
				<option value="DS">DS</option>
				<option value="HINFO">HINFO</option>
				<option value="HTTPS">HTTPS</option>
				<option value="INTEGRITY">INTEGRITY</option>
				<option value="KEY">KEY</option>
				<option value="MX">MX</option>
				<option value="NAPTR">NAPTR</option>
				<option value="NS">NS</option>
				<option value="NSEC">NSEC</option>
				<option value="NSEC3">NSEC3</option>
				<option value="NSEC3PARAM">NSEC3PARAM</option>
				<option value="PTR">PTR</option>
				<option value="RP">RP</option>
				<option value="RRSIG">RRSIG</option>
				<option value="SIG">SIG</option>
				<option value="SOA">SOA</option>
				<option value="SPF">SPF</option>
				<option value="SRV">SRV</option>
				<option value="SSHFP">SSHFP</option>
				<option value="SVCB">SVCB</option>
				<option value="TLSA">TLSA</option>
				<option value="TXT">TXT</option>
				<option value="WKS">WKS</option>
			</select>

			<br />
			<h2>Result for</h2>
		</div>

		<pre class="output" id="results">{"ts"}
	</pre>
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
	pre.output {
		background-color: #f5f5f5;
		color: black;
		font: 400 14px/20px "Roboto Mono", monospace;
		padding: 1em;
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}
</style>
