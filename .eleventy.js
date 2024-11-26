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
    eleventyConfig.addPassthroughCopy("node_modules/@picocss/pico/css/pico.cyan.min.css")
    eleventyConfig.addPassthroughCopy("src/static/")

    const tagSet = new Set();
    cheatsheet.forEach(entry => {
        entry.tags.forEach(tag => {
            tagSet.add(tag);
        })
    })
    const tagArray = Array.from(tagSet);
    eleventyConfig.addGlobalData("allTags", tagArray);
    /*
    eleventyConfig.addPassthroughCopy("node_modules/highlight.js/styles/")
    eleventyConfig.addPassthroughCopy("node_modules/highlight.js/styles/")
    */
}
