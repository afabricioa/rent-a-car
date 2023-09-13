<script setup>

    const prop = defineProps({
        title: String
    })
</script>

<template>
    <header class="bg-white shadow px-6 py-2 flex justify-between">
        <h1 class="text-3xl font-bold">
            {{ title }}
        </h1>
        <slot name="header"></slot>
    </header>
    <main>
        <div class="mx-auto max-w-7xl sm:py-6 lg:py-6 sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </main>
</template>
