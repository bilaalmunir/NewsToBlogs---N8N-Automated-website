"use client"

import Image from "next/image"
import { Newsreader } from "next/font/google"
import { useState, useEffect } from "react"
import { Calendar, Menu, X } from "lucide-react"
import { getBlogs } from "./data"

const newsreader = Newsreader({ subsets: ["latin"] })

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs()
      console.log('dataaaa:',data)
      setBlogs(data)
      setIsLoaded(true)
    }
    fetchBlogs()
  }, [])

  // Multiple newspaper editions data
  const newspaperEditions = [
    {
      date: "2024-05-29",
      displayDate: "May 29, 2024",
      headerInfo: {
        edition: "SPECIAL MEMORIAL EDITION",
        title: "The National News",
        volume: "VOL. XIV - № 1230",
        date: "TUESDAY, MAY 29, 2024",
        price: "PRICE TEN CENTS",
      },
      headlineInfo: {
        mainTitle: "GLOBAL SUMMIT",
        subTitle: "WORLD LEADERS UNITE FOR CLIMATE ACTION",
        description: "Historic Agreement Reached on Carbon Emissions and Renewable Energy Initiatives",
      },
      articleContent: {
        leftColumn: [
          "World leaders gathered in Geneva for an unprecedented climate summit, marking a turning point in global environmental policy. The three-day conference concluded with binding commitments from 195 nations to reduce carbon emissions by 50% within the next decade.",
          "The agreement, dubbed the 'Geneva Accord,' represents the most ambitious climate action plan in history, with detailed implementation strategies and accountability measures that surpass previous international agreements.",
        ],
        rightColumn: [
          "Environmental scientists have praised the accord as a 'game-changer' for planetary health. Dr. Sarah Chen, lead climate researcher at MIT, stated that these commitments could limit global warming to 1.5°C above pre-industrial levels.",
          "The economic implications are substantial, with an estimated $2 trillion investment in renewable energy infrastructure expected over the next five years, creating millions of jobs worldwide.",
        ],
        imageCaption: "Climate Summit 2024",
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2163695117.jpg?c=16x9&q=w_800,c_fill",
      },
      globalNewsContent: {
        title: "Global News Roundup: May Edition",
        introduction:
          "As we move through the complexities of the world, it's essential to stay informed and engaged. This month's global news roundup highlights the latest developments from around the globe, covering a range of topics from business and politics to entertainment and beyond.",
        sections: [
          {
            title: "Global Economy and Business",
            content:
              "The global economy has experienced significant shifts in recent months, with several major trends emerging. In the airline industry, Southwest Airlines has introduced a new fee structure for checked bags, aimed at improving efficiency and revamping their services. Meanwhile, Tesla's European sales have taken a substantial hit, with the company's brand suffering due to CEO Elon Musk's involvement in politics. Market analysts predict continued volatility as companies adapt to changing consumer preferences and regulatory environments.",
          },
          {
            title: "Politics and International Relations",
            content:
              "Diplomatic relations have strengthened between major powers as they collaborate on climate initiatives and sustainable development goals. The recent Geneva Accord has created new frameworks for international cooperation, with smaller nations playing increasingly important roles in global decision-making processes. Trade agreements are being restructured to include environmental clauses and sustainability metrics.",
          },
          {
            title: "Entertainment and Culture",
            content:
              "The entertainment industry is embracing sustainability with eco-friendly production methods and climate-conscious storytelling. Major film studios have committed to carbon-neutral productions by 2030, while streaming platforms are investing heavily in renewable energy to power their data centers. Cultural institutions worldwide are also adapting their programming to address environmental themes and social responsibility.",
          },
          {
            title: "Social and Environmental Issues",
            content:
              "Communities worldwide are implementing innovative solutions to address climate change at the local level. Urban farming initiatives have increased by 200% in major cities, while renewable energy cooperatives are providing affordable clean power to rural areas. Educational institutions are integrating climate science into their curricula, preparing the next generation for environmental challenges.",
          },
          {
            title: "Conclusion: Embracing the Complexity of the World",
            content:
              "As we navigate these interconnected global challenges, the importance of informed citizenship and international cooperation becomes ever more apparent. The events of this month demonstrate that meaningful change is possible when nations, communities, and individuals work together toward common goals. The path forward requires continued vigilance, innovation, and commitment to sustainable practices across all sectors of society.",
          },
        ],
      },
    },
    {
      date: "2024-05-27",
      displayDate: "May 27, 2024",
      headerInfo: {
        edition: "SPORTS SPECTACULAR",
        title: "The National News",
        volume: "VOL. XIV - № 1228",
        date: "SUNDAY, MAY 27, 2024",
        price: "PRICE TEN CENTS",
      },
      headlineInfo: {
        mainTitle: "CHAMPIONSHIP WIN",
        subTitle: "HISTORIC VICTORY BREAKS 50-YEAR RECORD",
        description: "Underdog Team Achieves Unprecedented Success in International Tournament",
      },
      articleContent: {
        leftColumn: [
          "In a stunning upset that has captivated sports fans worldwide, the underdog Phoenix Eagles defeated the defending champions 3-2 in overtime, breaking a 50-year championship drought.",
          "The victory marks the first time in the team's history that they have won the international championship, with rookie player Maria Santos scoring the winning goal.",
        ],
        rightColumn: [
          "The economic impact on the city is expected to be substantial, with tourism and merchandise sales projected to increase by 300% over the next year.",
          "Team captain James Rodriguez dedicated the victory to the fans who have supported the team through decades of near-misses and heartbreak.",
        ],
        imageCaption: "Championship Celebration",
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2163695117.jpg?c=16x9&q=w_800,c_fill",
      },
      globalNewsContent: {
        title: "Sports Roundup: May Edition",
        introduction:
          "The sports world has been electrified by unexpected victories and record-breaking performances across multiple disciplines.",
        sections: [
          {
            title: "Championship Results",
            content:
              "Multiple tournaments have concluded with surprising outcomes that have reshuffled rankings across various sports. The Phoenix Eagles' victory represents the biggest upset in tournament history.",
          },
          {
            title: "Olympic Preparations",
            content:
              "Athletes worldwide are intensifying their training as the next Olympic Games approach. New training facilities and technologies are helping athletes reach peak performance.",
          },
          {
            title: "Sports Technology",
            content:
              "Advanced analytics and performance tracking are revolutionizing how athletes train and compete. Wearable technology and AI-powered analysis are becoming standard tools.",
          },
        ],
      },
    },
    {
      date: "2024-05-26",
      displayDate: "May 26, 2024",
      headerInfo: {
        edition: "SCIENCE DISCOVERY",
        title: "The National News",
        volume: "VOL. XIV - № 1227",
        date: "SATURDAY, MAY 26, 2024",
        price: "PRICE TEN CENTS",
      },
      headlineInfo: {
        mainTitle: "MARS MISSION",
        subTitle: "SUCCESSFUL LANDING ON RED PLANET",
        description: "Robotic Explorer Discovers Evidence of Ancient Water Systems",
      },
      articleContent: {
        leftColumn: [
          "The Mars Explorer mission has achieved a historic milestone with the successful landing of the most advanced robotic explorer ever sent to the Red Planet.",
          "Initial data transmission has revealed compelling evidence of ancient water systems, bringing us closer to understanding Mars' potential for past or present life.",
        ],
        rightColumn: [
          "The mission represents a collaboration between multiple space agencies and marks a new era in interplanetary exploration.",
          "Scientists expect the rover to operate for at least two Earth years, conducting experiments and collecting samples for future return missions.",
        ],
        imageCaption: "Mars Surface",
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2163695117.jpg?c=16x9&q=w_800,c_fill",
      },
      globalNewsContent: {
        title: "Science Roundup: May Edition",
        introduction:
          "Scientific discoveries continue to expand our understanding of the universe and our place within it.",
        sections: [
          {
            title: "Space Exploration",
            content:
              "Multiple missions to Mars and beyond are providing unprecedented insights into our solar system. The successful Mars landing marks a new chapter in human exploration.",
          },
          {
            title: "Medical Breakthroughs",
            content:
              "Revolutionary treatments and diagnostic tools are transforming healthcare worldwide. Gene therapy and personalized medicine are becoming more accessible.",
          },
          {
            title: "Environmental Science",
            content:
              "Climate research is providing crucial data for understanding and addressing global environmental challenges. New monitoring technologies are improving our ability to track changes.",
          },
        ],
      },
    },
    {
      date: "2024-05-25",
      displayDate: "May 25, 2024",
      headerInfo: {
        edition: "ECONOMIC FOCUS",
        title: "The National News",
        volume: "VOL. XIV - № 1226",
        date: "FRIDAY, MAY 25, 2024",
        price: "PRICE TEN CENTS",
      },
      headlineInfo: {
        mainTitle: "MARKET SURGE",
        subTitle: "RENEWABLE ENERGY STOCKS REACH ALL-TIME HIGH",
        description: "Green Technology Investment Drives Unprecedented Market Growth",
      },
      articleContent: {
        leftColumn: [
          "Renewable energy stocks have reached unprecedented heights as investors pour capital into green technology companies, driving the largest market surge in the sector's history.",
          "Solar and wind energy companies have seen their valuations triple over the past year, reflecting growing confidence in sustainable energy solutions.",
        ],
        rightColumn: [
          "Economic analysts predict this trend will continue as governments worldwide implement policies favoring renewable energy adoption.",
          "The shift represents a fundamental change in how investors view the energy sector, with traditional fossil fuel companies adapting or facing obsolescence.",
        ],
        imageCaption: "Stock Market Data",
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2163695117.jpg?c=16x9&q=w_800,c_fill",
      },
      globalNewsContent: {
        title: "Economic Roundup: May Edition",
        introduction:
          "The global economy is experiencing a significant shift toward sustainable and technology-driven growth.",
        sections: [
          {
            title: "Green Energy Investment",
            content:
              "Massive capital flows into renewable energy are reshaping the global investment landscape. Solar and wind technologies are becoming increasingly cost-competitive.",
          },
          {
            title: "Technology Sector Growth",
            content:
              "Tech companies continue to drive economic growth with innovative solutions and services. Artificial intelligence and automation are creating new market opportunities.",
          },
          {
            title: "Global Trade Patterns",
            content:
              "International trade is adapting to new sustainability requirements and technological capabilities. Supply chains are being restructured to reduce environmental impact.",
          },
        ],
      },
    },
    {
      date: "2024-05-24",
      displayDate: "May 24, 2024",
      headerInfo: {
        edition: "CULTURAL EDITION",
        title: "The National News",
        volume: "VOL. XIV - № 1225",
        date: "THURSDAY, MAY 24, 2024",
        price: "PRICE TEN CENTS",
      },
      headlineInfo: {
        mainTitle: "ART RENAISSANCE",
        subTitle: "DIGITAL ART REVOLUTION TRANSFORMS GALLERIES",
        description: "Virtual Reality and AI Create New Forms of Artistic Expression",
      },
      articleContent: {
        leftColumn: [
          "The art world is experiencing a digital renaissance as virtual reality and artificial intelligence technologies create entirely new forms of artistic expression and gallery experiences.",
          "Major museums worldwide are investing in digital infrastructure, allowing visitors to experience art in immersive virtual environments that transcend physical limitations.",
        ],
        rightColumn: [
          "Artists are collaborating with AI systems to create works that challenge traditional notions of creativity and authorship, sparking debates about the nature of art itself.",
          "The democratization of digital art tools is enabling a new generation of creators to participate in the global art market without traditional barriers to entry.",
        ],
        imageCaption: "Digital Art Installation",
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2163695117.jpg?c=16x9&q=w_800,c_fill",
      },
      globalNewsContent: {
        title: "Cultural Roundup: May Edition",
        introduction:
          "The cultural landscape is being transformed by technology, creating new opportunities for artistic expression and cultural exchange.",
        sections: [
          {
            title: "Digital Art Revolution",
            content:
              "Virtual reality and AI are creating new forms of artistic expression that challenge traditional boundaries. Museums are adapting to showcase digital works alongside classical pieces.",
          },
          {
            title: "Global Cultural Exchange",
            content:
              "Digital platforms are enabling unprecedented cultural exchange between communities worldwide. Virtual festivals and exhibitions are reaching global audiences.",
          },
          {
            title: "Preservation and Innovation",
            content:
              "Technology is being used both to preserve cultural heritage and to create entirely new forms of cultural expression. 3D scanning and virtual reconstruction are saving historical artifacts.",
          },
        ],
      },
    },
  ]

  const maxVisibleTabs = 5
  const totalTabs = newspaperEditions.length
  const showHamburger = totalTabs > maxVisibleTabs

  const currentEdition = newspaperEditions[activeTab]

  const handleTabSelect = (index: number) => {
    setActiveTab(index)
    setIsMenuOpen(false)
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12">
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
                      className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors duration-200 border-b border-amber-100 last:border-b-0 ${
                        activeTab === index ? "bg-amber-100 text-amber-800 font-medium" : "text-gray-700"
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
                    className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                      isActive
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
        className={`max-w-6xl mx-auto transition-all duration-700 transform ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-gradient-to-b from-amber-100 to-amber-50 border-2 border-amber-800 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 shadow-2xl rounded-lg relative overflow-hidden">
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
              className={`${newsreader.className} text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-amber-950 mb-1 sm:mb-2 drop-shadow-sm leading-tight`}
            >
              {currentEdition.headerInfo.title}s
            </h1>
            <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-amber-800 border-t-2 border-b-2 border-amber-800 py-2 bg-amber-50/50 gap-1 sm:gap-0">
              <span className="font-medium">{currentEdition.headerInfo.volume}</span>
              <span className="font-medium">{currentEdition.headerInfo.date}</span>
              <span className="font-medium">{currentEdition.headerInfo.price}</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2
              className={`${newsreader.className} text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-black text-amber-950 mb-3 sm:mb-4 md:mb-6 leading-none drop-shadow-md`}
            >
              {currentEdition.headlineInfo.mainTitle}
            </h2>
            <div className="w-20 sm:w-32 md:w-40 mx-auto border-t-2 sm:border-t-4 border-amber-800 mb-3 sm:mb-4 md:mb-6"></div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-950 mb-2 sm:mb-3 tracking-wide px-2">
              {currentEdition.headlineInfo.subTitle}
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-amber-900 max-w-4xl mx-auto leading-relaxed px-2">
              {currentEdition.headlineInfo.description}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
            {/* Left Column */}
            <div className="lg:col-span-1 text-sm sm:text-base text-amber-950 space-y-3 sm:space-y-4">
              {currentEdition.articleContent.leftColumn.map((paragraph, index) => (
                <p
                  key={`left-${index}`}
                  className={`leading-relaxed ${
                    index === 0
                      ? "first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-amber-800"
                      : ""
                  }`}
                >
                 {paragraph}
                </p>
              ))}
            </div>

            {/* Center Column with Image */}
            <div className="lg:col-span-1 flex flex-col items-center order-first lg:order-none">
              <div className="relative w-full max-w-sm lg:max-w-none aspect-square border-2 sm:border-4 border-amber-800 overflow-hidden mb-2 sm:mb-3 rounded-lg shadow-lg group">
                <Image
                  src={currentEdition.articleContent.imageUrl || "/placeholder.svg"}
                  alt="News Image"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="text-xs sm:text-sm text-center text-amber-800 font-semibold tracking-wide">
                {currentEdition.articleContent.imageCaption}
              </p>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 text-sm sm:text-base text-amber-950 space-y-3 sm:space-y-4">
              {currentEdition.articleContent.rightColumn.map((paragraph, index) => (
                <p key={`right-${index}`} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
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
