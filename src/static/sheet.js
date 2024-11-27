import stringComparison from "/node_modules/string-comparison/dist/index.mjs";
const cosine = stringComparison.cosine

const cache = [];
async function cacheEntries() {
    $(".entry").each((i, entry) => {
        entry = $(entry);
        cache.push(`${entry.children("header").text()}//${entry.attr("id")}`)
    })
}
const search = $("#search")

async function searchEntries() {
    let matches = cosine
        .sortMatch(search.val(), cache)
        .sort(match => match.rating)
        .map(match => match.member.substring(
            match.member.lastIndexOf("//") + 2));

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
}

search.on("focus", async function() {
    if (cache.length <= 0) {
        await cacheEntries()
    }
    search.on("keyup", searchEntries);
});

function copy() {
    console.log("meow")
}
function download() {

}

$(document).ready(function(){
    $("pre code").each(function(i, codeElement){
        codeElement = $(codeElement);
        const buttons = $('<section class="buttons"><button class="copy">Copy</button><button class="download">Download</button></section>');
        buttons.find(".copy").on("click", copy)
        buttons.find(".download").on("click", copy)
        buttons.insertAfter(codeElement.parent())
    });
})
