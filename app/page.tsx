"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const toggleOpen = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
        setIsOpen(!isOpen)
      }, 2500) // Total duration of the shrinking animation sequence
    }
  }

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
  }

  const handleCloseImage = () => {
    setSelectedImage(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-pink-100 to-purple-100">
      {/* Add Analytics and SpeedInsights here */}
      <Analytics />
      <SpeedInsights />

      <motion.div
        className="bg-pink-300 w-64 h-64 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-pink-400 transition-colors"
        onClick={toggleOpen}
        animate={isAnimating ? { scale: [1, 0.8, 1, 0.8, 1, 0.8, 1, 0.8, 1, 0.8, 1] } : {}}
        transition={isAnimating ? { duration: 2.5, ease: "easeInOut" } : {}}
      >
        <p className="text-2xl font-bold text-white">Open Your Surprise</p>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto"
            onClick={toggleOpen}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-lg max-w-3xl w-full m-4 overflow-y-auto max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">{process.env.NEXT_PUBLIC_TITLE}</h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {["/images/isda.jpg", "/images/sha.jpg", "/images/both.jpg", "/images/shannen.jpg"].map((src, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleImageClick(src)}
                  >
                    <Image
                      src={src}
                      alt={`Girlfriend ${index + 1}`}
                      width={250}
                      height={250}
                      className="rounded-lg shadow-md"
                    />
                  </motion.div>
                ))}
              </div>
              <Letter />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseImage}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected"
                width={500}
                height={500}
                className="rounded-lg shadow-md"
              />
              <button
                className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
                onClick={handleCloseImage}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function Letter() {
  return (
    <motion.div
      initial="folded"
      animate="unfolded"
      variants={{
        folded: { height: 0, opacity: 0 },
        unfolded: { height: "auto", opacity: 1, transition: { duration: 1, ease: "easeOut" } },
      }}
      className="bg-pink-100 p-6 rounded-lg overflow-hidden shadow-inner"
    >
      <motion.div
        variants={{
          folded: { rotateX: 90 },
          unfolded: { rotateX: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
        }}
      >
        <h3 className="text-xl font-semibold mb-4 text-pink-700">Dear {process.env.NEXT_PUBLIC_GIRLFRIEND_NAME},</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">{process.env.NEXT_PUBLIC_LETTER_CONTENT}</p>
        <p className="text-right text-pink-600">Love always,</p>
        <p className="text-right font-semibold text-pink-700">{process.env.NEXT_PUBLIC_YOUR_NAME}</p>
      </motion.div>
    </motion.div>
  )
}