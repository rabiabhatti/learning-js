const linkRegex = /(rel="(\w*[-]?\s?)*"|href="[\/](.)+"|sizes="\d+[x]+\d*")/gi

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
// console.log(linksMatches)


const ariaLabelRegex = /<.*aria-label.*>/gi

const ariaLabelString = `<link rel="apple-touch-icon" sizes="57x57" href="/static/assets/apple-icon-57x57.png">
<link rel="shortcut icon" href="/static/assets/favicon.ico" type="image/x-icon" />
<a name="6603043"></a>
<div id="answer-6603043" class="answer accepted-answer" data-answerid="6603043"  itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
    <div class="post-layout">
        <div class="votecell post-layout--left">
            <div class="js-voting-container grid jc-center fd-column ai-stretch gs4 fc-black-200" data-post-id="6603043">
        <button class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" data-controller="s-tooltip" data-s-tooltip-placement="right" title="This answer is useful" aria-pressed="false" aria-label="Up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="m0 svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"/></svg></button>
        <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center" itemprop="upvoteCount" data-value="1309">1309</div>
        <button class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" data-controller="s-tooltip" data-s-tooltip-placement="right" title="This answer is not useful" aria-pressed="false" aria-label="Down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="m0 svg-icon iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"/></svg></button>
            <div class="js-accepted-answer-indicator grid--cell fc-green-500 py6 mtn8" data-s-tooltip-placement="right" title="Loading when this answer was accepted&#x2026;" tabindex="0" role="note" aria-label="Accepted"><div class="ta-center"><svg aria-hidden="true" class="svg-icon iconCheckmarkLg" width="36" height="36" viewBox="0 0 36 36"><path d="M6 14l8 8L30 6v8L14 30l-8-8v-8z"/></svg> </div></div>
<a class="js-post-issue grid--cell s-btn s-btn__unset c-pointer py6 mx-auto" href="/posts/6603043/timeline" data-shortcut="T" data-controller="s-tooltip" data-s-tooltip-placement="right" title="Show activity on this post." aria-label="Timeline"><svg aria-hidden="true" class="mln2 mr0 svg-icon iconHistory" width="19" height="18" viewBox="0 0 19 18"><path d="M3 9a8 8 0 113.73 6.77L8.2 14.3A6 6 0 105 9l3.01-.01-4 4-4-4h3L3 9zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5z"/></svg></a>

</div>`

const ariaLabelResult = ariaLabelString.match(ariaLabelRegex)
console.log(ariaLabelResult)
