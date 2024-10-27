'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, ArrowLeft, Send, Twitter, Linkedin } from 'lucide-react'

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "The Future of Web Development: Trends to Watch in 2024",
  author: {
    name: "John Doe",
    avatar: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  createdAt: "2023-10-27",
  readingTime: "10 min",
  tags: ["Web Development", "Future Tech", "Trends"],
  content: `
    <p>As we approach 2024, the landscape of web development continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging, reshaping how we build and interact with web applications. In this post, we'll explore some of the most exciting trends that are set to define the future of web development.</p>

    <h2>1. The Rise of AI-Powered Development</h2>
    <p>Artificial Intelligence is no longer just a buzzword; it's becoming an integral part of web development. From AI-assisted coding to intelligent testing and debugging, developers are leveraging machine learning algorithms to streamline their workflows and boost productivity.</p>

    <h2>2. Web Assembly: Breaking Performance Barriers</h2>
    <p>Web Assembly (Wasm) is gaining traction as a powerful tool for bringing high-performance applications to the web. It allows developers to run code written in languages like C++ and Rust directly in the browser, opening up new possibilities for complex web applications.</p>

    <h2>3. Progressive Web Apps: The Best of Both Worlds</h2>
    <p>Progressive Web Apps (PWAs) continue to bridge the gap between web and native applications. With improved offline capabilities, push notifications, and app-like interfaces, PWAs are becoming the go-to solution for businesses looking to provide a seamless cross-platform experience.</p>

    <h2>4. The Serverless Revolution</h2>
    <p>Serverless architecture is changing how we think about backend development. By abstracting away server management, developers can focus on writing code and building features, leading to faster development cycles and more scalable applications.</p>

    <h2>5. Enhanced Accessibility and Inclusive Design</h2>
    <p>As the web becomes increasingly central to our daily lives, there's a growing emphasis on making it accessible to everyone. Developers are adopting inclusive design practices and leveraging new technologies to create web experiences that cater to users with diverse needs and abilities.</p>

    <h2>Conclusion</h2>
    <p>The future of web development is exciting and full of possibilities. By staying informed about these trends and embracing new technologies, developers can create more powerful, efficient, and inclusive web experiences. As we move into 2024 and beyond, the web will continue to evolve, and those who adapt will be well-positioned to shape its future.</p>
  `,
  imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  comments: [
    {
      id: 1,
      author: "Jane Smith",
      avatar: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "Great article! I'm particularly excited about the potential of Web Assembly.",
      createdAt: "2023-10-28",
    },
    {
      id: 2,
      author: "Bob Johnson",
      avatar: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "The emphasis on accessibility is crucial. It's about time we make the web truly inclusive.",
      createdAt: "2023-10-29",
    },
  ],
}

// Mock data for recent posts
const recentPosts = [
  {
    id: 2,
    title: "10 Essential VS Code Extensions for Web Developers",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-10-20",
  },
  {
    id: 3,
    title: "Understanding the Basics of GraphQL",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-10-15",
  },
  {
    id: 4,
    title: "The Impact of 5G on Web Applications",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-10-10",
  },
  {
    id: 5,
    title: "Mastering CSS Grid Layout",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2023-10-05",
  },
]

export function BlogPostComponent() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting comment:', comment)
    // Here you would typically send the comment to your backend
    setComment('')
    // You might want to show a success message to the user here
  }

  const shareOnX = () => {
    const text = encodeURIComponent(`Check out this article: ${blogPost.title}`)
    const url = encodeURIComponent(`https://yourblog.com/blog/${blogPost.id}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(`https://yourblog.com/blog/${blogPost.id}`)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="fixed left-0 top-0 bottom-0 w-1 bg-muted"
        style={{
          backgroundImage: `linear-gradient(to top, var(--primary) ${scrollProgress}%, transparent ${scrollProgress}%)`
        }}
      />

      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
              <AvatarFallback>{blogPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{blogPost.author.name}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{blogPost.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {blogPost.createdAt}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {blogPost.readingTime}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={shareOnX}>
                <Twitter className="w-4 h-4 mr-2" />
                Share on X
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
                <Linkedin className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </Button>
            </div>
          </div>
          <Image
            src={blogPost.imageUrl}
            alt={blogPost.title}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full mb-8"
          />
          <div className="flex flex-wrap gap-2 mb-8">
            {blogPost.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </article>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          {blogPost.comments.map((comment) => (
            <div key={comment.id} className="mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="mt-8">
            <Textarea
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
            />
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </form>
        </section>

        <section className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.createdAt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-background border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}