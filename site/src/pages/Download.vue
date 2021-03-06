<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../components/Header.vue";
import { IRelease, getRelease } from "../plugins/releases";
import {
    ICommitType,
    Commit,
    Changelogs,
} from "../plugins/releases/changelogs";

const route = useRoute();
const router = useRouter();

const release = ref<IRelease | null>(null);
const error = ref<string | undefined>();

const commits = computed(() =>
    release.value?.changelogs
        ? (Object.entries(release.value.changelogs.commits).filter(
              ([k, x]) => x.length
          ) as [ICommitType, Commit[]][])
        : null
);
const commitStyles = Changelogs.styles;

onMounted(async () => {
    const version = route.params.version;
    if (typeof version !== "string") {
        error.value = "Unknown version";
        return;
    }

    try {
        release.value = await getRelease(route.params.version as string);
        await router.replace(`/download/${release.value.version}/`);
    } catch (err) {
        error.value = `Something went wrong: ${err}`;
    }
});
</script>

<template>
    <div class="wx wy">
        <Header title="Download" />
        <p
            class="text-center text-sm text-gray-700 dark:text-gray-400"
            v-if="release"
        >
            {{ release.version }}
        </p>

        <p class="mt-4 text-center text-sm text-red-500" v-if="error">
            {{ error }}
        </p>
        <p class="mt-4 text-center text-sm text-gray-500" v-else-if="!release">
            Loading...
        </p>
        <div class="mt-10" v-else>
            <div
                class="
                    bg-gray-100
                    dark:bg-gray-800
                    px-4
                    py-3
                    rounded
                    flex flex-col
                    gap-4
                "
                v-if="
                    release.changelogs &&
                    Object.values(release.changelogs.commits).some(
                        (x) => x.length != 0
                    )
                "
            >
                <div class="flex-grow" v-for="[k, x] in commits">
                    <div v-if="x.length">
                        <p
                            :class="[
                                'text-white font-bold mb-2 rounded inline-block px-1.5 py-0.5 text-sm',
                                commitStyles[k].color,
                            ]"
                        >
                            {{ commitStyles[k].title }}
                        </p>

                        <ul class="list-disc ml-7">
                            <li class="mb-1" v-for="y in x">
                                <p>
                                    <span class="underline mr-1" v-if="y.cat"
                                        >{{ y.cat }}:</span
                                    >

                                    <span v-html="y.msg"></span>

                                    (<a :href="y.url">{{ y.sha }}</a
                                    >)
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                    class="
                        bg-gradient-to-br
                        from-indigo-500
                        via-purple-500
                        to-purple-500
                        text-white
                        px-6
                        py-4
                        rounded-md
                        text-center
                    "
                    v-for="x in release.platforms"
                >
                    <div class="flex justify-center items-center gap-5">
                        <p class="flex">
                            <component :is="x.icon" class="__platform_icon__" />
                        </p>
                        <p class="text-2xl font-bold">{{ x.name }}</p>
                    </div>

                    <div
                        class="
                            mt-4
                            flex flex-col
                            md:flex-row
                            justify-center
                            items-center
                            gap-3
                        "
                    >
                        <a
                            class="
                                transition
                                duration-200
                                hover:-translate-y-0.5
                                bg-white
                                px-3
                                py-1
                                rounded
                                text-indigo-500
                                dark:text-indigo-500
                                hover:text-indigo-500
                                dark:hover:text-indigo-500
                                flex
                                justify-center
                                items-center
                                gap-3
                            "
                            :href="y.url"
                            v-for="y in x.files"
                        >
                            <div class="text-xl flex">
                                <component :is="y.icon" />
                            </div>
                            <div>
                                <p class="text-sm">
                                    {{ y.name }}
                                    <span class="text-xs"
                                        >({{ y.format }})</span
                                    >
                                </p>
                                <p class="text-xs">
                                    {{ (y.size / 1024 / 1024).toFixed(1) }} MB
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --platform-icon-size: 2rem;
}

.__platform_icon__ > svg {
    height: var(--platform-icon-size) !important;
    width: var(--platform-icon-size) !important;
}
</style>
