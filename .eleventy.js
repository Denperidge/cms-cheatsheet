import pugPlugin from "@11ty/eleventy-plugin-pug";
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";

const {default: cheatsheet} = await import("./src/_data/DenperidgeCheatsheet.json", {assert: {type: "json"}})

export const config = {
    dir: {
        input: "src",
        output: "dist"
    }
};

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(pugPlugin);
    eleventyConfig.addPlugin(eleventyAutoCacheBuster);

    // Packages used on client-side
    eleventyConfig.addPassthroughCopy("node_modules/@picocss/pico/css/pico.cyan.min.css")
    eleventyConfig.addPassthroughCopy("node_modules/jquery/dist/jquery.min.js")
    eleventyConfig.addPassthroughCopy("node_modules/prismjs/themes/prism-coy.min.css")
    eleventyConfig.addPassthroughCopy("node_modules/string-comparison/dist/index.mjs")

    eleventyConfig.addPassthroughCopy("src/static/")

    const tagSet = new Set();
    cheatsheet.forEach(entry => {
        entry.tags.forEach(tag => {
            tagSet.add(tag);
        })
    })
    const tagArray = Array.from(tagSet);
    eleventyConfig.addGlobalData("allTags", tagArray);
}
