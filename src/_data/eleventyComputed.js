import markdownit from "markdown-it";
import hljs from "highlight.js";

const md = markdownit({
    html: true
});

const REGEX_MD_CODEBLOCK = /```(?<language>.*?)\n(?<code>(.|\n)*?)(\n)```/g


function createOrAddToArrayInObj(obj, key, value) {
    if (Object.keys(obj).includes(key)) {
        obj[key].push(value);
    } else {
        obj[key] = [value];
    }
}

export default {
    relations: (data) => {
        const rels = {};
        data.DenperidgeCheatsheet_DenperidgeCheatsheet.forEach(relation => {
           createOrAddToArrayInObj(rels, relation.DenperidgeCheatsheet_id, relation.related_DenperidgeCheatsheet_id);
           createOrAddToArrayInObj(rels, relation.related_DenperidgeCheatsheet_id, relation.DenperidgeCheatsheet_id);
        });
        return rels;
    },

    cheatsheet: (data) => {
        const entries = data.DenperidgeCheatsheet.map(entry => {
            // Replace codeblocks, including bacticks. Run non-backticked code through highlightjs. Put it back. 
            //console.log(hljs.highlightAuto(entry.solution).value)
            let solution = entry.solution;

            const highlight = entry.solution.matchAll(REGEX_MD_CODEBLOCK)
            if (highlight) {
                Array.from(highlight).forEach((high) => {
                    const {code, language} = high.groups;
                    console.log(language, language.length)
                    if (language.length < 1) {
                        console.log(`WARNING: Problem parsing language for ${entry.problem} (${entry.id})`);
                        return;
                    }

                    solution = solution.replace(high.input, hljs.highlight(high.groups.code, { language: high.groups.language}))
                })

            }
            
            entry.renderedSolution = md.render(solution);
            return entry;
        })
        return entries
    }
}   