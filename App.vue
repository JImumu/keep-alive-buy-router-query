<template>
  <div id="app">
    <keep-alive :include="$store.state.keepAlive.routes">
      <router-view/>
    </keep-alive>
  </div>
</template>
