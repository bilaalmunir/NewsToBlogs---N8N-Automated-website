"use client"

import { getBlogs } from "./data"
import { useEffect, useState } from "react"
import { Calendar, Menu, X } from "lucide-react"
import Image from "next/image"
import { Newsreader } from "next/font/google"

const newsreader = Newsreader({ subsets: ["latin"] })

interface Section {
  sub_heading: string
  paragraph: string
}

interface BlogContent {
  title: string
  image_url: string
  main_paragraph: string
  sections: Section[]
}

interface Blog {
  id: number
  blog: string
  approved_by: string
  createdAt: string
}

interface NewspaperEdition {
  date: string
  displayDate: string
  headerInfo: {
    edition: string
    title: string
    volume: string
    date: string
    price: string
  }
  headlineInfo: {
    mainTitle: string
    subTitle: string
    description: string
  }
  articleContent: {
    leftColumn: string[]
    imageUrl: string
    imageCaption: string
    rightColumn: string[]
  }
  globalNewsContent: {
    title: string
    introduction: string
    sections: Array<{
      title: string
      content: string
    }>
  }
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs()
        setBlogs(data)
        setTimeout(() => setIsLoaded(true), 100)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Transform blog data into newspaper editions
  const newspaperEditions: NewspaperEdition[] = blogs
    .map((blog) => {
      let parsed: BlogContent | null = null
      try {
        const jsonStart = blog.blog.indexOf("{")
        parsed = JSON.parse(blog.blog.slice(jsonStart))
      } catch (error) {
        console.warn("Could not parse blog:", blog.id, error)
        return null
      }

      if (!parsed) return null

      const imageUrl = parsed.image_url?.replace(/[<>]/g, "") || "/placeholder.svg"

      // Split main paragraph into sentences for left/right columns
      const sentences = parsed.main_paragraph.split(". ")
      const midPoint = Math.ceil(sentences.length / 2)
      const leftColumn = sentences.slice(0, midPoint).join(". ") + (sentences.length > midPoint ? "." : "")
      const rightColumn = sentences.slice(midPoint).join(". ") + (sentences.length > midPoint ? "." : "")

      return {
        date: blog.createdAt,
        displayDate: formatDisplayDate(blog.createdAt),
        headerInfo: {
          edition: "REVOLUTIONARY AI  EDITION",
          title: "The AUTOMATED News",
          volume: `VOL. ${blog.id}240`,
          date: formatDate(blog.createdAt).toUpperCase(),
          price: "PRICE: ONE LLM",
        },
        headlineInfo: {
          mainTitle: parsed.title,
          subTitle: "BREAKING DEVELOPMENTS WORLDWIDE",
          description: ` Approved by ${blog.approved_by.toUpperCase()}`,
        },
        articleContent: {
          leftColumn: [leftColumn],
          imageUrl: imageUrl,
          imageCaption: "Exclusive Photograph - The National News",
          rightColumn: [rightColumn],
        },
        globalNewsContent: {
          title: "DETAILED COVERAGE",
          introduction:
            "Our correspondents provide in-depth analysis of the developing situation with comprehensive reporting from multiple perspectives.",
          sections: parsed.sections.map((section) => ({
            title: section.sub_heading,
            content: section.paragraph,
          })),
        },
      }
    })
    .filter(Boolean) as NewspaperEdition[]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-2xl font-serif text-amber-800">Loading The National News...</div>
      </div>
    )
  }

  if (newspaperEditions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-2xl font-serif text-amber-800">No news available</div>
      </div>
    )
  }

  const maxVisibleTabs = 5
  const totalTabs = newspaperEditions.length
  const showHamburger = totalTabs > maxVisibleTabs || screen.width < 768

  const currentEdition = newspaperEditions[activeTab]

  const handleTabSelect = (index: number) => {
    setActiveTab(index)
    setIsMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-2 sm:p-4 md:p-6 lg:p-4 xl:p-4">
      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-center">
          {showHamburger ? (
            // Hamburger Menu for many tabs
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-lg"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{currentEdition.displayDate}</span>
              </button>

              {isMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-amber-200 z-50 max-h-80 overflow-y-auto">
                  {newspaperEditions.map((edition, index) => (
                    <button
                      key={edition.date}
                      onClick={() => handleTabSelect(index)}
                      className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors duration-200 border-b border-amber-100 last:border-b-0 ${activeTab === index ? "bg-amber-100 text-amber-800 font-medium" : "text-gray-700"
                        }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{edition.displayDate}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{edition.headerInfo.edition}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Regular tabs for 5 or fewer
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 bg-amber-200/50 p-2 rounded-xl backdrop-blur-sm border border-amber-300/30">
              {newspaperEditions.map((edition, index) => {
                const isActive = activeTab === index

                return (
                  <button
                    key={edition.date}
                    onClick={() => setActiveTab(index)}
                    className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${isActive
                        ? "bg-amber-600 text-white shadow-lg transform scale-105"
                        : "bg-white/70 text-amber-800 hover:bg-white hover:shadow-md hover:scale-102"
                      }`}
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{edition.displayDate}</span>
                    <span className="sm:hidden">{edition.displayDate.split(" ")[1]}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Newspaper Content */}
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2=8"
          }`}
      >
        <div className="bg-gradient-to-b from-amber-100 to-amber-50 border-2 border-amber-800 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-4 shadow-2xl rounded-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600"></div>
          <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-20 sm:w-40 h-20 sm:h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-20 sm:w-40 h-20 sm:h-40 bg-orange-200/20 rounded-full blur-3xl"></div>

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8 relative">
            <div className="text-xs sm:text-sm text-amber-800 font-semibold mb-1 sm:mb-2 tracking-widest">
              ******* {currentEdition.headerInfo.edition} *******
            </div>
            <h1
              className={`${newsreader.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-black text-amber-950 mb-1 sm:mb-2 drop-shadow-sm leading-tight`}
            >
              {currentEdition.headerInfo.title}
            </h1>
            <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-amber-800 border-t-2 border-b-2 border-amber-800 py-1 bg-amber-50/50 gap-1 sm:gap-0">
              <span className="font-medium">{currentEdition.headerInfo.volume}</span>
              <span className="font-medium">{currentEdition.headerInfo.date}</span>
              <span className="font-medium">{currentEdition.headerInfo.price}</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2
              className={`${newsreader.className} text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-8xl font-black text-amber-950 mb-3 sm:mb-4 md:mb-6 leading-none drop-shadow-md`}
            >
              {currentEdition.headlineInfo.mainTitle}
            </h2>
            <div className="w-20 sm:w-32 md:w-40 mx-auto border-t-2 sm:border-t-4 border-amber-800 mb-3 sm:mb-4 md:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-amber-900 max-w-4xl mx-auto leading-relaxed px-2">
              {currentEdition.headlineInfo.description}
            </p>
          </div>

          {/* Main Content - Improved Layout */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            {/* Main Image - Full Width */}
            <div className="mb-4 sm:mb-6">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="relative w-full max-w-xl aspect-[16/9] overflow-hidden bg-amber-100 shadow-lg rounded-lg">
                  <Image
                    src={currentEdition.articleContent.imageUrl || "/placeholder.svg"}
                    alt="News Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-fit rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-center text-amber-800 font-semibold tracking-wide mt-2">
                {currentEdition.articleContent.imageCaption}
              </p>
            </div>

            {/* Text Content - Single Centered Paragraph */}
            <div className="prose prose-amber max-w-none text-justify">
              <div className="text-sm sm:text-base md:text-lg text-amber-950 mb-4 sm:mb-6 text-center leading-relaxed max-w-3xl mx-auto">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-amber-800 first-letter:font-serif text-justify">
                  {currentEdition.articleContent.leftColumn.join(" ")} {currentEdition.articleContent.rightColumn.join(" ")}
                </p>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="flex justify-center my-6">
              <div className="flex items-center w-full max-w-xl">
                <div className="h-0.5 flex-1 bg-amber-800"></div>
                <div className="mx-4 text-amber-800">★</div>
                <div className="h-0.5 flex-1 bg-amber-800"></div>
              </div>
            </div>
          </div>

          {/* Modern Content Section - Newspaper Style */}
          <div className="border-t-4 border-amber-800 pt-4 sm:pt-6">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 mb-2 sm:mb-4">
                {currentEdition.globalNewsContent.title}
              </h2>
              <div className="w-24 sm:w-32 mx-auto border-t-2 border-amber-800 mb-3 sm:mb-4"></div>
              <p className="text-sm sm:text-base leading-relaxed max-w-5xl mx-auto px-2 sm:px-4">
                {currentEdition.globalNewsContent.introduction}
              </p>
            </div>

            {/* Newspaper-style columns */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6">
              {currentEdition.globalNewsContent.sections.map((section, index) => (
                <div key={`section-${index}`} className="break-inside-avoid mb-4 sm:mb-6">
                  {/* Section Header */}
                  <div className="border-b-2 border-amber-800 mb-2 sm:mb-3 pb-1 sm:pb-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-amber-950 uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>

                  {/* Section Content */}
                  <div className="text-sm sm:text-base text-amber-950 leading-relaxed text-justify">
                    <p className="first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1 sm:first-letter:mr-2 first-letter:mt-1 first-letter:text-amber-800">
                      {section.content}
                    </p>
                  </div>

                  {/* Decorative separator */}
                  {index < currentEdition.globalNewsContent.sections.length - 1 && (
                    <div className="flex justify-center mt-3 sm:mt-4 mb-2 sm:mb-3">
                      <div className="w-8 sm:w-12 border-t border-amber-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom border decoration */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-600">
              <div className="text-center text-xs sm:text-sm text-amber-700 font-medium">*** END OF EDITION ***</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
