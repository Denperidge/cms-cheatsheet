let cache = {};
function cacheEntries() {
    $(".entry").each((i, entry) => {
        entry = $(entry);
        console.log(entry.text())
    })
}

function searchEntries() {

}

const search = $("#search")
search.on("focus", function() {
    cacheEntries();
    search.on("keydown", searchEntries);
});
