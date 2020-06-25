<template>
    <Index></Index>
</template>

<script>
import Index from "./pages/Index"
export default {
  components:{
    Index
  },
  data(){
    return{
      
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,body,#app{
 height: 100%;
}
.Index{
  height: 100%;
display: flex;
 flex-direction: column;
}
</style>