'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Calendar, Search, Github, Twitter, Linkedin, Mail } from 'lucide-react'

// Mock data for blog posts
const allBlogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    createdAt: "2023-10-15",
    readingTime: "5 min",
    tags: ["Next.js", "React", "Web Development"],
    description: "Learn how to build modern web applications with Next.js, the React framework for production.",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    createdAt: "2023-10-10",
    readingTime: "7 min",
    tags: ["CSS", "Tailwind", "Web Design"],
    description: "Discover the power of utility-first CSS with Tailwind and how it can speed up your development process.",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "The Future of AI in Web Development",
    createdAt: "2023-10-05",
    readingTime: "10 min",
    tags: ["AI", "Web Development", "Future Tech"],
    description: "Explore how artificial intelligence is shaping the future of web development and what it means for developers.",
    imageUrl: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]

// Personal info for the aside
const personalInfo = {
  name: "John Doe",
  avatar: "https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  jobTitle: "Full Stack Developer",
  description: "Passionate about creating elegant solutions to complex problems. Always learning, always coding.",
  social: [
    { name: "GitHub", icon: Github, url: "https://github.com/johndoe" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/johndoe" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/johndoe" },
  ],
}

export function HomePageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredPosts, setFilteredPosts] = useState(allBlogPosts)
  const [email, setEmail] = useState('')

  // Get all unique tags
  const allTags = Array.from(new Set(allBlogPosts.flatMap(post => post.tags)))

  useEffect(() => {
    const filtered = allBlogPosts.filter(post =>
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag)))
    )
    setFilteredPosts(filtered)
  }, [searchTerm, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log(`Subscribing email: ${email}`)
    setEmail('')
    // You might want to show a success message to the user here
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">My Blog</span>
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>

          <div className="mb-6 flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <div key={post.id}>
                <Card className="transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <Link href={`/blog/${post.id}`} className="block w-full md:w-1/3">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-[200px]"
                        />
                      </Link>
                      <div className="w-full md:w-2/3 space-y-4">
                        <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.createdAt}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readingTime}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground">{post.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < filteredPosts.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <p className="text-center text-muted-foreground">No posts found matching your search or filter criteria.</p>
            )}
          </div>
        </main>

        <aside className="w-full lg:w-1/4 lg:sticky lg:top-8 lg:self-start">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
                  <AvatarFallback>{personalInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
                <p className="text-primary">{personalInfo.jobTitle}</p>
              </div>
              <p className="text-muted-foreground">{personalInfo.description}</p>
              <div className="flex justify-center space-x-4">
                {personalInfo.social.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <platform.icon size={24} />
                    <span className="sr-only">{platform.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <footer className="bg-background border-t mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image src="https://images.pexels.com/photos/3622750/pexels-photo-3622750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Logo" width={40} height={40} />
                <span className="text-xl font-bold">My Blog</span>
              </Link>
              <p className="text-muted-foreground mb-4">
                Exploring the world of technology, one post at a time. Join me on this journey of continuous learning and discovery.
              </p>
              <div className="flex space-x-4">
                {personalInfo.social.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <platform.icon size={20} />
                    <span className="sr-only">{platform.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                <Link href="/archive" className="text-muted-foreground hover:text-primary transition-colors">Archive</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">Stay updated with our latest posts and news.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}