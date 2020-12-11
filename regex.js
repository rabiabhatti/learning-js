const linkRegex = /(rel="([a-zA-Z0-9]*[-]?\s?)*"|href="[\/](.)+"|sizes="[0-9]+[x]+[0-9]*")/gi

const links = `<link rel="shortcut icon" href="/static/assets/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" sizes="57x57" href="/static/assets/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/static/assets/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/static/assets/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/static/assets/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/static/assets/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/static/assets/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/static/assets/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/static/assets/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/static/assets/apple-icon-180x180.png">
<link rel="icon" type="image/png" href="/static/assets/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="/static/assets/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/static/assets/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/static/assets/android-icon-192x192.png" sizes="192x192">
<link rel="manifest" href="/static/assets/manifest.webmanifest">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="keywords" content="javascript,regex,regular expression,debugger,explainer,helper,tester,match,pcre,php,golang,python,editor">
<meta name="description" content="Online regex tester, debugger with highlighting for PHP, PCRE, Python, Golang and JavaScript.">
<meta name="author" content="Firas Dib">`

const linksMatches = links.match(linkRegex)
console.log(linksMatches)