import markdownit from "markdown-it";
import hljs from "highlight.js";

const md = markdownit();

export default {
    cheatsheet: (data) => {
        //console.log(data)
        const entries = data.DenperidgeCheatsheet.map(entry => {
            entry.renderedSolution = md.render(entry.solution);
            //console.log(hljs.highlightAuto(entry.solution).language)
            //console.log(entry.solution)

            return entry;
        })
        //console.log(entries)
        return entries
    }
    /*,
    allTags: (data) => {
        const tagSet = new Set();
        data.DenperidgeCheatsheet.forEach(entry => {
            entry.tags.forEach(tag => {
                //console.log(tag)
                tagSet.add(tag);
            })
        });

        return Array.from(tagSet);
    }
    */
}