export interface Post {
  id: number,
  title: string,
  content: string
}

export const posts: Post[]=[
  {
    id: 1,
    title: "Post 1",
    content: "ini adalah post pertama"
  },
  {
    id: 2,
    title: "Post 2",
    content: "ini adalah post kedua"
  }
]