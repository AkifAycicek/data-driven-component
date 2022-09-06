<template>
  <div class="d-flex flex-wrap gap-4">
    <h4 class="text-dark d-inline">Post List</h4>
    <button class="btn btn-primary">Add</button>
    <table class="table table-primary table-striped table-hover">
      <thead>
        <tr class="h5 text-center">
          <td
            v-for="field in state.fields"
            :key="field.id"
            class="py-2 px-3"
            v-text="field.name"
          />
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in state.posts" :key="post.id">
          <td
            v-for="field in state.fields"
            :key="field.id"
            class="py-3 px-3"
            v-text="post[`cf_${field.id}`]"
          />
        </tr>
      </tbody>
    </table>
  </div>
  <DataDrivenForm />
</template>
<script setup>
import DataDrivenForm from "@/components/DataDrivenForm.vue";
import { reactive } from "vue";
import axios from "axios";
import customFields from "@/custom_field_data";

const state = reactive({
  posts: [],
  fields: customFields,
});

async function getPosts() {
  try {
    const { data } = await axios({
      url: "http://localhost:3000/posts",
    });
    state.posts = data;
    console.log(state);
  } catch (error) {
    alert(error);
  }
}

getPosts();
</script>
