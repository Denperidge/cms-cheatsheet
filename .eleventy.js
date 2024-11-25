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
}
