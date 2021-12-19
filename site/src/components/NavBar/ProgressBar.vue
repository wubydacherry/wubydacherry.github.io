<script setup lang="ts">
import { ref, onDeactivated } from "vue";
import { RouterHooks } from "../../plugins/router";

class ProgressBar {
    progress = ref(0);
    ongoing = ref(false);

    #timer?: ReturnType<typeof setInterval>;

    start() {
        this.ongoing.value = true;
        this.progress.value = 0;
        this.#timer = setInterval(() => {
            if (this.progress.value < 80) {
                this.progress.value += 1;
            } else if (this.progress.value < 90) {
                this.progress.value += 0.5;
            } else if (this.progress.value < 99) {
                this.progress.value += 0.2;
            }
        }, 100);
    }

    end() {
        if (this.#timer !== undefined) {
            clearInterval(this.#timer);
        }
        this.#timer = undefined;

        this.progress.value = 100;
        setTimeout(() => {
            if (this.#timer === undefined) {
                this.ongoing.value = false;
            }
        }, 1000);
    }
}

const bar = new ProgressBar();

const _disposables: (() => void)[] = [
    RouterHooks.beforeChange.subscribe(() => {
        bar.start();
    }),
    RouterHooks.afterChange.subscribe(() => {
        bar.end();
    }),
];

onDeactivated(() => {
    _disposables.forEach((x) => x());
});
</script>

<template>
    <div class="sticky top-0">
        <div class="w-full h-0.5">
            <div
                class="
                    bg-gradient-to-r
                    from-indigo-500
                    via-purple-500
                    to-purple-500
                    h-full
                    rounded-r
                    transition
                    duration-300
                "
                :style="{
                    width: `${bar.progress.value}%`,
                    opacity: bar.ongoing.value ? '1' : '0',
                }"
            ></div>
        </div>
    </div>
</template>
