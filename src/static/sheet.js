import { closest, distance} from "/node_modules/fastest-levenshtein/esm/mod.js";
let cache = [];
function cacheEntries() {
    $(".entry").each((i, entry) => {
        entry = $(entry);
        //cache.push(`${entry.text()}//${entry.attr("id")}`)
        cache.push(`${entry.children("header").text()}`)
    })
    console.log(cache)
}
const search = $("#search")

function searchEntries() {
    
    console.log(search.val());
    console.log("---")
    cache.forEach((cacheEntry) => {
        console.log(cacheEntry, distance(search.val(), cacheEntry))
    })
    //const res = closest(search.val(), cache)
    console.log(res)
}

search.on("focus", function() {
    if (cache.length <= 0) {
        cacheEntries()
    }
    search.on("keydown", searchEntries);
});
