import markdownit from "markdown-it";
import hljs from "highlight.js";

const md = markdownit();

export default {
    cheatsheet: (data) => {
        //console.log(data)
        const entries = data.DenperidgeCheatsheet.map(entry => {
            entry.solution = md.render(entry.solution);
            console.log(hljs.highlightAuto(entry.solution).language)
            return entry;
        })
        //console.log(entries)
        return entries
    }
}