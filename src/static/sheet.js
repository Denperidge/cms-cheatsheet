import Fuse from "/node_modules/fuse.js/dist/fuse.min.mjs";

let fuse;
const search = $("#search");

function createOrAddToNumberInObj(obj, key, value) {
    if (Object.keys(obj).includes(key)) {
        obj[key] += value;
    } else {
        obj[key] = value;
    }
}

const cache = [];
async function cacheEntries() {

    $(".entry").each((i, entry) => {
        entry = $(entry);
        cache.push({
            header: entry.children("header").text(),
            id: entry.attr("id")
        });
    })
    fuse = new Fuse(cache, {
        keys: ["header"],
        includeScore: true
    })
}

async function searchEntries() {
    const matchesLowToHigh = fuse.search(search.val()).sort(function(matchA, matchB) {
        const valueA = matchA.score;
        const valueB = matchB.score;
        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        } else {
            return 0;
        }
    })

    console.log(matchesLowToHigh)

    matchesLowToHigh.forEach(match => {
        $("#sheet").prepend($("#" + match.item.id))
    });
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
