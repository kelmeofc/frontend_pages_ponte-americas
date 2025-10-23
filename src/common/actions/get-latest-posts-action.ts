'use server'

import { IPost } from "@/types/post"
import getLatestPosts from "../services/blog-posts/get-latest-posts"

export default async function getLatestPostsAction(): Promise<{ posts: IPost[] } | never[]> {
    const posts = await getLatestPosts()
    return posts
}
