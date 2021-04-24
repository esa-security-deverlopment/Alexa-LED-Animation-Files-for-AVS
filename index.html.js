<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>SKS key server</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Mobile viewport optimized: j.mp/bplateviewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
    h1,
    h2,
    p {
      margin: 0; /* Let's zero those margins */
    }

    #container {
      border: 1px solid #555; /* Nice transition from white background */ 
      width: 600px; /* Should be narrow enough for small screens */
      margin: 0 auto; /* Centering */
      font-size: 1.1em; /* Font big enough not to need to squint */
      line-height: 1.3em;
    }
 
    #title { 
      background-color:#e2e5e2;
      padding: 10px;
    }
    
    #title h1, #title h2 {
      margin-top: 0.3em;
    }

    #info { 
      background-color:#e2e5e2;
      padding: 5px 10px;
    }
 
    #main {
      background : #FAFBEA;
      padding: 0 10px 10px 10px;
    }

    #main header {
      padding-top: 1em;
    }

    #main p {
      margin: 0.5em 0;
    }

    #keytext {
      width: 100%;
      height: 150px;
      border: 1px solid #555;
      background : #fff;
      max-width: 100%;
      display: block;
    }

    ul {
      width: 100%;
      list-style-type: none;
      padding-left: 0;
    }

    li {
      width: 99%;
    }

    li label {
      width: 57%;
      display: inline-block;
    }
    
    button {
      border-radius: 3px;
      -moz-border-radius: 3px;
      background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ddd));
      background: -moz-linear-gradient(top, #fff, #ddd);  
      border: 1px solid #bbb;
    }

    #info p {line-height: 1.1em; margin-bottom: 0.3em;}
    </style>
  </head>
  <body>
    <div id="container">
      <header id="title">
        <hgroup>
          <h1>SKS OpenPGP Key server</h1>
        </hgroup>
      </header>
      <div id="main" role="main">
        <header>
          <h2>Extract a key</h2>
        </header>
        <p>You can find a key by typing in some words that appear in the
          userid (name, email, etc.) of the key you're looking for, or
          by typing in the keyid in hex format ("0x&#8230;")</p>
        <form id="lookup" action="/pks/lookup" method="get">
          <fieldset checked="true"> <legend>Search for a public key</legend>
            <ul>
              <li> <label for="search">String</label> <input id="search"
                  name="search" placeholder="0xDEADBEEF" required="" autofocus=""
                  type="text"> </li>
              <li> <label for="fingerprint">Show PGP Fingerprints</label>
                <input id="fingerprint" name="fingerprint" type="checkbox">
              </li>
              <li> <label for="hash">Show SKS full-key hashes</label> <input
                  id="hash" name="hash" type="checkbox"> </li>
              <li> <label for="matching">Get regular index of matching
                  keys</label> <input id="matching" name="op" value="index"
                  type="radio"> </li>
              <li> <label for="verbose">Get verbose index of matching
                  keys</label> <input id="verbose" name="op" value="vindex"
                  checked="checked" type="radio"> </li>
              <li> <label for="asciiarmored">Retrieve ascii-armored
                  keys</label> <input id="asciiarmored" name="op" value="get"
                  type="radio"> </li>
              <li> <label for="fullkey">Retrieve keys by full-key hash</label>
                <input id="fullkey" name="op" value="hget" type="radio">
              </li>
            </ul>
            <button type="reset">Reset</button> <button type="submit">Search






              for a key</button> </fieldset>
        </form>
        <header>
          <h2>Submit a key</h2>
        </header>
        <p>You can submit a key by simply pasting in the ASCII-armored
          version of your key and clicking on submit.</p>
        <form id="add" action="/pks/add" method="post">
          <fieldset> <textarea id="keytext" name="keytext" rows="5" cols="30"></textarea>
            <button type="reset">Reset</button> <button checked="true"
              type="submit">Submit this key</button></fieldset>
        </form>
      </div>
      <!-- end of #main -->
      <footer id="info">
        <p><a href="https://bitbucket.org/skskeyserver/sks-keyserver/">SKS</a> is
          a new <a href="http://www.openpgp.org/">OpenPGP</a>
          keyserver. The main innovation of SKS is that it includes a
          highly-efficient reconciliation algorithm for keeping the
          keyservers synchronized.</p>
        <p style="text-align: center;"><a href="/pks/lookup?op=stats">SKS

            statistics</a></p>
      </footer>
    </div>
    <!--! end of #container -->
  </body>
</html>
