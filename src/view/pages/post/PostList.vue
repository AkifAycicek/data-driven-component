<template>
  <div class="row g-4">
    <div class="col-auto">
      <h4 class="text-dark">Post List</h4>
    </div>
    <div class="col-auto">
      <button
        type="button"
        class="btn btn-primary"
        @click="$router.push({ name: 'PostAdd' })"
        v-text="'Add New'"
      />
    </div>
    <div class="overflow-auto col-12">
      <table class="table table-primary table-striped table-hover">
        <thead>
          <tr class="h5 text-center">
            <td
              v-for="field in state.fields"
              :key="`fh_${field.id}`"
              class="py-2 px-3"
              :title="field.description"
              v-text="field.name"
            />
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in state.posts" :key="post.id">
            <td
              v-for="field in state.fields"
              :key="`cf_${field.id}`"
              class="py-3 px-3"
              :title="field.description"
              v-text="post[`cf_${field.id}`]"
            />
            <td class="text-center">
              <button
                title="edit"
                class="btn btn-outline-light p-1 mx-1"
                @click="
                  $router.push({
                    name: 'PostEdit',
                    params: { postId: post.id },
                  })
                "
              >
                ✒
              </button>

              <button
                title="delete"
                class="btn btn-outline-light p-1 mx-1"
                @click="deletePost(post.id)"
              >
                ⛔
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <BsModal
    :model-value="state.showPostModal"
    modal-id="PostAddModal"
    button-text="Add"
    :modal-title="state.post.id ? 'Edit post' : 'Add new post'"
    @initInstance="state.postModal = $event"
    @close="$router.push({ name: 'PostList' })"
  >
    <template #modalBody>
      <div v-if="state.postLoading" class="text-center m-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <DataDrivenForm
        v-else
        v-model="state.post"
        :fields="customFields"
        :actions="state.formActions"
        @initForm="state.form = $event"
      />
    </template>
  </BsModal>
</template>
<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import axios from "axios";
import customFields from "@/custom_field_data";
import { useRoute, useRouter } from "vue-router";

const state = reactive({
  posts: [],
  post: {},
  postLoading: false,
  postSaving: false,
  postModal: null,
  showPostModal: computed(() => {
    return state.route.name !== "PostList";
  }),
  fields: customFields,
  form: null,
  formActions: [
    {
      disabled: false,
      text: "Save",
      onclick: savePost,
      className: "btn-success mx-1",
    },
    {
      disabled: false,
      text: "Reset",
      onclick: () => state.form.reset(),
      className: "btn-outline-dark mx-1",
    },
  ],
  router: useRouter(),
  route: useRoute(),
});

async function getPosts() {
  try {
    const { data } = await axios({
      url: "posts",
    });
    state.posts = data;
  } catch (error) {
    alert(error);
  }
}

onMounted(() => {
  getPosts();
});

watch(
  () => state.route.name,
  () => {
    getPost();
  },
  { immediate: true }
);

async function getPost() {
  try {
    state.post = {};
    const postId = state.route.params.postId;

    if (postId) {
      state.postLoading = true;
      const { data } = await axios({
        url: `posts/${postId}`,
      });

      state.post = data;
    }
  } catch (error) {
    console.info(error);
    state.router.push({ name: "PostAdd" });
  } finally {
    state.postLoading = false;
  }
}

async function savePost() {
  try {
    state.postLoading = true;
    let postId = null;

    if (state.route.name == "PostEdit") {
      postId = state.route.params.postId;
    }

    if (state.form.isValid()) {
      await axios({
        url: `posts/${state.route.name == "PostEdit" ? `${postId}` : ""}`,
        data: state.form.getAttributes(),
        method: state.route.name == "PostEdit" ? "PUT" : "POST",
      });
      await getPosts();
      await state.router.push({ name: "PostList" });
    }
  } catch (error) {
    alert(error);
  } finally {
    state.postLoading = false;
  }
}

async function deletePost(postId) {
  await axios({ url: `posts/${postId}`, method: "DELETE" });
  await getPosts();
}
</script>
