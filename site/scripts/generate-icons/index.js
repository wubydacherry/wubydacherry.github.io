const { join } = require("path");
const { ensureDir, writeFile, rm } = require("fs-extra");
const got = require("got").default;
const config = require("../../config");
const { createTemplate } = require("./template");

const outDir = join(__dirname, "../../src/components/Icons");

const start = async () => {
    await rm(outDir, {
        recursive: true,
        force: true,
    });
    await ensureDir(outDir);

    for (const icon of config.icons) {
        console.log(`Processing: ${icon}`);

        const url = `https://unpkg.com/ionicons/dist/svg/${icon}.svg`;
        const { body } = await got.get(url);

        const svg = body
            .match(/<svg.*?>([\S\s]+)<\/svg>/)[1]
            .replace(/<title>.*<\/title>/g, "");

        await writeFile(
            join(outDir, `${toFileCase(icon)}.g.vue`),
            createTemplate(svg)
        );

        console.log(`Processed: ${icon}`);
    }
};

start();

function toFileCase(txt) {
    return txt
        .replace(/^\w/, (m) => m[0].toUpperCase())
        .replace(/-(\w)/g, (m) => m[1].toUpperCase());
}
