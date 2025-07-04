import pugPlugin from "@11ty/eleventy-plugin-pug";
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";
import eleventySass from "@grimlink/eleventy-plugin-sass";
import sass from "sass";
import markdownit from "markdown-it";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js"
import eleventyFavicons from "eleventy-favicons";

const {default: cheatsheet} = await import("./src/_data/DenperidgeCheatsheet.json", {with: {type: "json"}})

const REGEX_MD_CODEBLOCK = /(?<fullValue>```(?<language>.*?)\n(?<code>(.|\n)*?)(|\n)```)/g
const md = markdownit({
    html: true
});



function renderCheatsheet(data) {
    const entries = data.map(entry => {
        // Replace codeblocks, including bacticks. Run non-backticked code through highlightjs. Put it back. 
        //console.log(hljs.highlightAuto(entry.solution).value)
        let solution = entry.solution;

        let description = undefined;
        
        const codeblocks = entry.solution.matchAll(REGEX_MD_CODEBLOCK)
        if (codeblocks) {
            Array.from(codeblocks).forEach((codeblock, i) => {
                let {code, language, fullValue} = codeblock.groups;

                if (language.length < 1) {
                    console.log(`WARNING: Problem parsing language for "${entry.problem}" (value: '${language}', id: ${entry.id})`);
                    return;
                }

                if (description === undefined) {
                    description = code;
                }

                let highlightedCode;
                try {
                    highlightedCode = Prism.highlight(code, Prism.languages[language], language);
                } catch {
                    loadLanguages(language);
                    highlightedCode = Prism.highlight(code, Prism.languages[language], language);
                }

                solution = solution.replace(fullValue, `<pre><code data-lang="${language}" id="${entry.id}-${i}">${highlightedCode}</pre></code>`, language)
            })

        }
        
        entry.description = description;
        entry.renderedSolution = md.render(solution);
        return entry;
    })
    return entries
}

export const config = {
    dir: {
        input: "src",
        output: "dist"
    }
};

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(pugPlugin, {
        globals: ["filters"]
    });
    eleventyConfig.addPlugin(eleventyAutoCacheBuster);

    eleventyConfig.addPlugin(eleventySass, {
        sass: sass,
        outputPath: "",  // optional subdirectory
        outputStyle: "compressed"
    });
    
    eleventyConfig.addPlugin(eleventyFavicons, {
        image: "src/static/logo.svg",
        favicons: {
            background: "#8352c5",
            theme_color: "#8352c5",
        }
    });

    // Packages used on client-side
    eleventyConfig.addPassthroughCopy("node_modules/jquery/dist/jquery.min.js")
    eleventyConfig.addPassthroughCopy("node_modules/fuse.js/dist/fuse.min.mjs")

    eleventyConfig.addPassthroughCopy("src/static/")

    const tagSet = new Set();
    cheatsheet.forEach(entry => {
        entry.tags.forEach(tag => {
            tagSet.add(tag);
        })
    })
    const tagArray = Array.from(tagSet).sort();
    eleventyConfig.addGlobalData("cheatsheet", renderCheatsheet(cheatsheet))
    eleventyConfig.addGlobalData("allTags", tagArray);
}
