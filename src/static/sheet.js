import { closest, distance} from "/node_modules/fastest-levenshtein/esm/mod.js";

import stringComparison from "/node_modules/string-comparison/dist/index.mjs";
let cosine = stringComparison.cosine
console.log(cosine)

let cache = [];
async function cacheEntries() {
    $(".entry").each((i, entry) => {
        entry = $(entry);
        //cache.push(`${entry.text()}//${entry.attr("id")}`)
        cache.push(`${entry.children("header").text()}//${entry.attr("id")}`)
    })
    console.log(cache)
}
const search = $("#search")

async function searchEntries() {
    
    /*
    cache.forEach((cacheEntry) => {
        console.log(cacheEntry, distance(search.val(), cacheEntry))
    })*/
    //const res = closest(search.val(), cache)
    
    console.log(search.val())
    let matches = cosine.sortMatch(search.val(), cache);
    matches = matches.sort(match => match.rating).map(match => match.member.substring(match.member.lastIndexOf("//") + 2))
    let sortedChildren = $("#sheet").children(".entryLi").sort(function(a,b) {
        const aIndex = matches.indexOf(a.querySelector("article").id);
        const bIndex = matches.indexOf(b.querySelector("article").id);
        if (aIndex < bIndex) {
            return -1;
        } else if (aIndex > bIndex) {
            return 1;
        } else {
            return 0;
        }
    })
    $("#sheet").append(sortedChildren)
    console.log(sortedChildren)
}

search.on("focus", async function() {
    if (cache.length <= 0) {
        await cacheEntries()
    }
    search.on("keyup", searchEntries);
});
