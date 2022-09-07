import { createRouter, createWebHistory, RouterView } from "vue-router";

// post-list
import PostList from "@/view/pages/post/PostList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
    {
      path: "/",
      redirect: "post-list",
      component: RouterView,
    },
    {
      path: "/post-list",
      component: PostList,
      name: "PostList",
      children: [
        {
          path: ":postId/edit",
          component: PostList,
          name: "PostEdit",
        },
        {
          path: "add",
          component: PostList,
          name: "PostAdd",
        },
      ],
    },
  ],
});

export default router;
