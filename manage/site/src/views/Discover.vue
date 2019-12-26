<template>
<div class="discover">
     <nav >
        <router-link active-class="yellow" exact to="/discover">主食</router-link> |
        <router-link active-class="yellow" to="/discover/food">副食</router-link> |
        <router-link active-class="yellow" to="/discover/snacks">零食</router-link>
    </nav>
    <router-view></router-view>
</div>
   
</template>


<script>
export default {
    name:"discover"
}
</script>

<style scoped>

    .yellow{
        color:yellow
    }


</style>