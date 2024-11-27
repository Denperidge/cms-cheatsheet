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


function _getCodeblockFromButtonsEvent(e) {
    return $("#" +  
        $(e.target).parent().data("code")
    ) ;
}
function copy(e) {
    const codeblock = _getCodeblockFromButtonsEvent(e)
}
function download(e) {
    const buttonA = $(e.target);
    const codeblock = _getCodeblockFromButtonsEvent(e);
    if (!buttonA.attr("download")) {
        console.log("generating")
        const lang = codeblock.data("lang");
        let mimeType;
        switch(lang) {
            case "javascript":
            case "js":
                mimeType = "text/javascript"
                break;
            case "html":
                mimeType = "text/html";
                break;
            case "css":
                mimeType = "text/css";
                break;
            case "json":
                mimeType = "application/json";
                break;

            default:
                mimeType = "text/plain";
                break;
        }

        const contents = new Blob([codeblock.text()], {type: mimeType});
        buttonA.attr("href", URL.createObjectURL(contents))
        buttonA.attr("download", "download." + lang)
    }
        
}

$(document).ready(function(){
    $("pre code").each(async function(i, codeElement){
        codeElement = $(codeElement);
        const buttons = $(`<section class="buttons" data-code="${codeElement.attr("id")}"><button class="copy">Copy</button><a role="button" class="download">Download</a></section>`);
        buttons.find(".copy").on("click", copy)
        buttons.find(".download").on("click", download)
        
        buttons.insertAfter(codeElement.parent())
    });
})
