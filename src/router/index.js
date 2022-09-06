import { createRouter, createWebHistory } from "vue-router";

// post-list
import PostList from "@/view/pages/post/PostList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)",
      redirect: "/post-list",
    },
    {
      path: "/post-list",
      component: PostList,
      name: "PostList",
    },
  ],
});

export default router;
