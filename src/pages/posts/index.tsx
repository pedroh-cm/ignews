import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import { Posts } from "../../templates/Posts";

export const getStaticProps: GetStaticProps = async () => {
  const prismicApi = getPrismicClient();

  const response = await prismicApi.query(
   [Prismic.predicates.at("document.type", "publication")],
   {
    fetch: ["publication.title", "publication.content"],
    pageSize: 100,
   }
  )

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}

interface PostsProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  }[]
}

export default function index({ posts }: PostsProps) {
  return <Posts posts={posts} />
}