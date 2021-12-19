<script setup lang="ts">
import { URLs } from "../plugins/constants";
</script>

<template>
    <footer>
        <div
            class="
                flex flex-col
                justify-center
                items-center
                w-full
                bg-gray-100
                dark:bg-gray-800
                text-gray-400
                px-10
                md:px-16
                py-8
                gap-3
            "
        >
            <p class="font-bold text-2xl text-center">Yukino</p>
            <p class="text-sm text-center">
                For any queries contact us at
                <a :href="`mailto:${URLs.mail}`">{{ URLs.mail }}</a
                >.
                <br />
                Licensed under GPL-3.0.
            </p>
        </div>
    </footer>
</template>
