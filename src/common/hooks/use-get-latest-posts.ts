import { IPost } from "@/types/post";
import getLatestPostsAction from "@/server/actions/get-latest-posts.action";

export default function useGetLatestPosts() {
    const execGetLatestPosts = async () => {
        const response = await getLatestPostsAction()

        if (!(Object.hasOwn(response, 'posts'))) {
            return []
        }

        return await (response as { posts: IPost[] }).posts;
    }

    return { execGetLatestPosts }
}

