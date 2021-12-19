<script setup lang="ts">
import { defineComponent } from "vue";
import DownloadOutlineIcon from "../components/Icons/DownloadOutline.g.vue";
import CubeIcon from "../components/Icons/Cube.g.vue";
import DiscIcon from "../components/Icons/Disc.g.vue";
import HeartIcon from "../components/Icons/Heart.g.vue";
import ListIcon from "../components/Icons/List.g.vue";
import BrushIcon from "../components/Icons/Brush.g.vue";

const features: {
    icon: ReturnType<typeof defineComponent>;
    text: string;
    desc: string;
}[] = [
    {
        icon: CubeIcon,
        text: "Extensions based",
        desc: "Handful of extensions to pick and use from.",
    },
    {
        icon: DiscIcon,
        text: "Ad-free",
        desc: "Never see those annoying ads ever again.",
    },
    {
        icon: HeartIcon,
        text: "Open Source",
        desc: "Source code available publicly, licensed under GPL-3.0.",
    },
    {
        icon: ListIcon,
        text: "Sync",
        desc: "Track your progress in MyAnimeList and AniList while you enjoy the show.",
    },
    {
        icon: BrushIcon,
        text: "User Interface",
        desc: "Simple and consistent user experience across the app with multiple themes.",
    },
];
</script>

<template>
    <div>
        <div class="relative h-[52rem] md:h-[40rem] lg:h-[50rem]">
            <div
                class="
                    absolute
                    top-0
                    h-[20rem]
                    lg:h-[25rem]
                    bg-gradient-to-br
                    from-indigo-500
                    via-purple-500
                    to-purple-500
                    flex flex-col
                    justify-center
                    items-center
                    w-full
                "
            >
                <div
                    class="text-center pb-[3rem] md:pb-[4rem] lg:pb-[8rem] mx-8"
                >
                    <p class="text-2xl md:text-3xl font-bold text-white">
                        An extension based <b>Anime</b> & <b>Manga</b> client.
                    </p>

                    <div class="mt-7">
                        <router-link
                            class="
                                backdrop-filter backdrop-blur-lg
                                bg-white
                                hover:bg-gray-100 hover:shadow
                                rounded-full
                                hover:-translate-y-0.5
                                transition
                                duration-200
                                text-indigo-500
                                dark:text-indigo-500
                                px-4
                                py-2
                                inline-block
                            "
                            to="/download"
                        >
                            <div class="flex gap-2">
                                <DownloadOutlineIcon />
                                Get Yukino
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <div
                class="
                    absolute
                    bottom-0
                    flex
                    justify-center
                    items-center
                    w-full
                "
            >
                <img
                    class="block md:hidden h-[36rem]"
                    src="../assets/screenshots/android_home_hero.png"
                    alt="Yukino App"
                />
                <img
                    class="rounded-md hidden md:block h-[25rem] lg:h-[33rem]"
                    src="../assets/screenshots/windows_home_hero.png"
                    alt="Yukino App"
                />
            </div>
        </div>

        <div class="wx wy">
            <hr />

            <p class="text-3xl font-bold text-center my-10">Features</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                <div class="text-center" v-for="x in features">
                    <component
                        :is="x.icon"
                        class="__hero_icon__ text-indigo-500"
                    />
                    <p class="mt-3 font-bold text-lg">{{ x.text }}</p>
                    <p class="mt-3 text-gray-500">{{ x.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --hero-icon-size: 3rem;
}

.__hero_icon__ > svg {
    width: var(--hero-icon-size) !important;
    height: var(--hero-icon-size) !important;
}
</style>
