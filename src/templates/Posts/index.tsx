import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss";

interface PostsProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  }[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </Link>
          ))}
        </div>
      </main>
    </>
  )
}