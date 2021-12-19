module.exports.createTemplate = (icon) => `
<script setup lang="ts">
const definedProps = defineProps<{
    color?: string;
    style?: Record<string, string>;
    size?: string;
    classes?: string[];
}>();

const props: Required<typeof definedProps> = {
    style: { ...definedProps.style },
    color: definedProps.color ?? "currentColor",
    size: definedProps.size ?? "22px",
    classes: [...(definedProps.classes ?? [])],
};
</script>

<template>
    <div class="inline-flex">
        <svg
            :class="props.classes"
            :style="{
                height: props.size,
                width: props.size,
                color: props.color,
                fill: props.color,
                ...definedProps.style,
            }"
            viewBox="0 0 512 512"
        >
            ${icon}
        </svg>
    </div>
</template>
`;
