import pugPlugin from "@11ty/eleventy-plugin-pug";
import { readFileSync } from "fs"; 

const COLLECTION_NAME = "DenperidgeCheatsheet";

export const config = {
    dir: {
        input: "src",
        output: "dist"
    }
};

function _readJson(filename) {
    return JSON.parse(readFileSync(`_data/${filename}   `, {encoding: "utf-8"}))
}

function getCheatsheet() {
    _readJson("_data/")
}

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(pugPlugin);
}
