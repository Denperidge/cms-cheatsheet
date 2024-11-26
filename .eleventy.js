import pugPlugin from "@11ty/eleventy-plugin-pug";

export const config = {
    dir: {
        input: "src",
        output: "dist"
    }
};

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(pugPlugin);
    eleventyConfig.addPassthroughCopy("node_modules/@picocss/pico/css/pico.cyan.min.css")

    // CAn't use computed data for pagination. This is a patchwork solution, but could be better
    eleventyConfig.addGlobalData("allTags", () => {
        return function(cheatsheetDataObj) {
            const tagSet = new Set();
            cheatsheetDataObj.forEach(entry => {
                console.log(entry)
                entry.tags.forEach(tag => {
                    tagSet.add(tag);
                })
            })
            console.log(tagSet)
            return Array.from(tagSet);
        };
    });
    /*
    eleventyConfig.addPassthroughCopy("node_modules/highlight.js/styles/")
    eleventyConfig.addPassthroughCopy("node_modules/highlight.js/styles/")
    */
}
