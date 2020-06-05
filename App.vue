<template>
  <div id="app">
    <keep-alive :include="$store.state.keepAlive.router">
      <router-view/>
    </keep-alive>
  </div>
</template>
