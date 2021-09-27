// data, props, func, lifecircle, reactive, html Node
<template>
  <div>Test02</div>
  <div>name: {{name}}</div>
  <div @click="changeName">changeName</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
export default defineComponent({
  name: "Test02",
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // }
  },
  emits: ["update:visible"],
  //   accept props and context
  setup(props, { emit }) {
    const state = reactive({
      //   dialogVisible: useVModel(props, 'visible', emit),
      //   previewUrl: `${BASE_URL}preview/${location.hash}`
    });

    // lifecircle
    onMounted(() => {
      console.log("mounted");
    });
    // reactive data
    const name = ref("");
    const changeName = () => {
      name.value = Math.random() * 100;
    };

    // 所有返回的东西都会暴露给组件
    return {
      ...toRefs(state),
      name,
      changeName
    };
  },
});
</script>
