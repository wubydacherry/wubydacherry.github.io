<script setup lang="ts">
import { defineComponent, ref, computed } from "vue";
import { router, routes as _routes } from "../../plugins/router";
import { URLs } from "../../plugins/constants";
import { Themer } from "../../plugins/theme";
import ProgressBar from "./ProgressBar.vue";
import NavLink, { NavLinkItem } from "./NavLink.vue";
import SunOutlineIcon from "../Icons/SunnyOutline.g.vue";
import MoonOutlineIcon from "../Icons/MoonOutline.g.vue";
import MenuOutlineIcon from "../Icons/MenuOutline.g.vue";
import DownloadOutlineIcon from "../Icons/DownloadOutline.g.vue";
import CloseOutlineIcon from "../Icons/CloseOutline.g.vue";

const routes: NavLinkItem[] = [
    ..._routes
        .filter((x) => x.name != null)
        .map((x) => ({
            name: x.name!.toString(),
            path: x.path,
            ext: false,
        })),
    ...[
        ["Wiki", URLs.wiki],
        ["GitHub", URLs.github],
        ["Discord", URLs.discord],
        ["Patreon", URLs.patreon],
    ].map(([name, path]) => ({
        name: name,
        path: path,
        ext: true,
    })),
];

const highlighted: {
    text: string;
    icon: ReturnType<typeof defineComponent>;
    path: string;
}[] = [
    {
        text: "Get Yukino",
        icon: DownloadOutlineIcon,
        path: "/download",
    },
];

const isDark = ref(Themer.isDark);
Themer.listeners.push((value) => {
    isDark.value = value;
});

const toggleDark = () => Themer.swap();

const isOpened = ref(false);
const toggleNav = () => {
    isOpened.value = !isOpened.value;
};

const hrEnabled = computed(
    () => !["Home"].includes(router.currentRoute.value.name?.toString() as any)
);
</script>

<template>
    <div
        class="
            flex flex-row
            justify-between
            lg:justify-around
            items-center
            w-full
            px-6
            py-3
        "
    >
        <router-link
            to="/"
            class="
                font-bold
                text-3xl text-indigo-500
                dark:text-indigo-500
                hover:text-indigo-600
                dark:hover:text-indigo-600
                transition
                duration-200
            "
        >
            Yukino
        </router-link>

        <div class="hidden lg:flex flex-row gap-8 py-3">
            <div v-for="x in routes">
                <NavLink :item="x" />
            </div>
        </div>

        <div class="flex flex-row gap-8 py-3">
            <button
                class="
                    hidden
                    md:flex
                    justify-center
                    items-center
                    nav-link
                    text-lg
                "
                @click="toggleDark"
            >
                <MoonOutlineIcon v-if="isDark" />
                <SunOutlineIcon v-else />
            </button>

            <div class="hidden md:block" v-for="x in highlighted">
                <router-link
                    class="
                        flex
                        gap-2
                        bg-gradient-to-br
                        from-indigo-500
                        via-purple-500
                        to-purple-500
                        text-white
                        dark:text-white
                        hover:text-white
                        dark:hover:text-white
                        rounded-md
                        px-3
                        py-1.5
                        shadow
                        relative
                        after:transition after:duration-200
                        hover:after:bg-white/20
                        after:absolute after:inset-0 after:rounded-md
                    "
                    :to="x.path"
                >
                    <component :is="x.icon" />
                    {{ x.text }}
                </router-link>
            </div>

            <button
                class="
                    flex
                    lg:hidden
                    justify-center
                    items-center
                    nav-link
                    text-lg
                "
                @click="toggleNav"
            >
                <MenuOutlineIcon />
            </button>
        </div>
    </div>

    <transition name="nav">
        <div
            class="
                lg:hidden
                fixed
                h-screen
                w-screen
                inset-0
                bg-gray-100
                dark:bg-gray-800
                z-50
                oveflow-hidden
            "
            v-if="isOpened"
        >
            <div class="flex justify-end items-center w-full p-6 gap-6">
                <button
                    class="flex justify-center items-center nav-link text-lg"
                    @click="toggleDark"
                >
                    <MoonOutlineIcon v-if="isDark" />
                    <SunOutlineIcon v-else />
                </button>

                <button
                    class="
                        flex
                        lg:hidden
                        justify-center
                        items-center
                        nav-link
                        text-lg
                    "
                    @click="toggleNav"
                >
                    <CloseOutlineIcon />
                </button>
            </div>

            <div class="overflow-y-auto" style="height: calc(100vh - 4rem)">
                <div class="wx py-4">
                    <div class="text-2xl mb-2" v-for="x in routes">
                        <NavLink :item="x" :after-click="toggleNav" />
                    </div>
                </div>
            </div>
        </div>
    </transition>

    <hr v-if="hrEnabled" />

    <ProgressBar />
</template>

<style scoped>
.nav-enter-from {
    opacity: 0;
}

.nav-enter-active {
    transform: translateX(-4rem);
    transition: 0.4s ease;
}

.nav-enter-to {
    transform: translateX(0);
}

.nav-leave-active {
    transition: 0.4s ease;
}

.nav-leave-to {
    opacity: 0;
    transform: translateX(-4rem);
}
</style>
