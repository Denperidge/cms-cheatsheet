import markdownit from "markdown-it";
import hljs from "highlight.js";

const md = markdownit();

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
            entry.renderedSolution = md.render(entry.solution);

            return entry;
        })
        return entries
    }
}   