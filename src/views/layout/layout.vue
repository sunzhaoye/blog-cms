<template>
    <div id="layout">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="content">
            <main-content></main-content>
        </div>
    </div>
</template>
<script>
import { Sidebar, MainContent } from '@/views/layout'
export default {
    name: 'layout',
    components: {
        Sidebar,
        MainContent
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#layout {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    .sidebar {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .content {
        // width: 100%;
        overflow-y: auto;
        height: 100%;
        padding: 30px 30px 30px 30px;
        // box-sizing: border-box;
        height: 100%;
        margin-left: 450px;
        box-sizing: border-box;
        // position: absolute;
        // top: 0px;
        // left: 451px;
    }
}
</style>