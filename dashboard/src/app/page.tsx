'use client'

import { useEffect, useState } from 'react'
import Carousel from '@/components/Carousel'
import Header from '@/components/Header'
import Services from '@/components/Services'
import CoreValues from '@/components/CoreValues'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

interface CarouselImage {
  id: number
  title: string
  image: string
  description: string
}

interface Service {
  id: number
  name: string
  time: string
  day: string
  description: string
}

export default function Home() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        
        const [carouselRes, servicesRes] = await Promise.all([
          fetch(`${apiUrl}/api/landing/carousel`),
          fetch(`${apiUrl}/api/landing/services`)
        ])

        const carouselData = await carouselRes.json()
        const servicesData = await servicesRes.json()

        if (carouselData.success) {
          setCarouselImages(carouselData.data)
        }
        if (servicesData.success) {
          setServices(servicesData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback data if API is not available
        setCarouselImages([
          {
            id: 1,
            title: "Core Values",
            image: "/churchcorevalues.jpeg",
            description: "Prayer, Stewardship, Holiness, Advocacy, Unity"
          },
          {
            id: 2,
            title: "Sunday Services",
            image: "/sundayservices.jpeg",
            description: "Join us for worship every Sunday"
          },
          {
            id: 3,
            title: "Bible Study",
            image: "/biblestudysundaymorning.jpeg",
            description: "Every Sunday 8:00 AM - 9:00 AM"
          },
          {
            id: 4,
            title: "Tefillah Night",
            image: "/midweekservicefriday.jpeg",
            description: "Every Friday 8:00 PM to Dawn"
          },
          {
            id: 5,
            title: "Online Connect Fellowship",
            image: "/onlineconnectthurday.jpeg",
            description: "Every Thursday 8:30 PM - 9:30 PM"
          }
        ])
        setServices([
          {
            id: 1,
            name: "Watch Hour",
            time: "6:00 AM - 8:00 AM",
            day: "Daily",
            description: "Early morning prayer and watch service"
          },
          {
            id: 2,
            name: "Bible Study",
            time: "8:00 AM - 9:00 AM",
            day: "Sunday",
            description: "Welcome to the Bible Study"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <main>
      <Header />
      <Carousel images={carouselImages} />
      <Services services={services} />
      <CoreValues />
      <ContactSection />
      <Footer />
    </main>
  )
}
