import markdownit from "markdown-it";
const md = markdownit();

export default {
    cheatsheet: (data) => {
        //console.log(data)
        const entries = data.DenperidgeCheatsheet.map(entry => {
            entry.solution = md.render(entry.solution);
            return entry;
        })
        //console.log(entries)
        return entries
    }
}