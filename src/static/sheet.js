import stringComparison from "/node_modules/string-comparison/dist/index.mjs";
const cosine = stringComparison.cosine

const cache = [];
async function cacheEntries() {
    $(".entry").each((i, entry) => {
        entry = $(entry);
        cache.push({
            header: entry.children("header").text(),
            id: entry.attr("id")
        });
    })
}
const search = $("#search")

async function searchEntries() {
    const headers = cache.map(obj => obj.header)

    let matches = cosine
        .sortMatch(search.val(), headers)
        .sort(match => match.rating)
    
    console.log(matches)
    
    matches.forEach(match => {
        console.log()
        $("#sheet").append($("#" + cache[match.index].id))
    })
    return


    let sortedChildren = $("#sheet").children(".entryLi").sort(function(entryLiElemA,entryLiElemB) {
        const aIndex = matches.find(match => match.id == entryLiElemA.querySelector("article").id);
        const bIndex = matches.indexOf(entryLiElemB.querySelector("article").id);
        console.log(aIndex, entryLiElemA.querySelector("article").id)
        console.log(bIndex, entryLiElemA.querySelector("article").id)

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
    navigator.clipboard.writeText(codeblock.text())
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
        const buttons = $(`
        <section 
            class="buttons actions"
            data-code="${codeElement.attr("id")}"
        >
            <button aria-label="Copy code" title="Copy code" class="copy">
                <img aria-hidden="true" 
                     src="/static/copy.svg"
                     alt="Copy"></button>
            <a aria-label="Download code as file" title="Download code as file"
               role="button" class="download">
               <img aria-hidden="true"
                    src="/static/download.svg"
                    alt="Download" />
            </a>
        </section>`);
        buttons.find(".copy").on("click", copy)
        buttons.find(".download").on("click", download)
        
        buttons.insertAfter(codeElement.parent())
    });
})
