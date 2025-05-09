"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Mail,
  BellRing,
  Globe,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  FileText,
  ExternalLink,
  Layout,
  LifeBuoy,
  BarChart,
  ChevronRight,
  Building,
  AlertTriangle,
  Check,
  X,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Import the Modal component and useModal hook
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "next/navigation"

// Language translations
const translations = {
  en: {
    title: "We're Making Things Better",
    subtitle:
      "KATDICT is currently undergoing scheduled maintenance. We'll be back online shortly with improvements to enhance your digital experience in Katsina State.",
    countdown: "We'll be back in:",
    whileYouWait: "While You Wait...",
    getNotified: "Get Notified",
    shareFeedback: "Share Feedback",
    connect: "Connect",
    requestService: "Request Service",
    notifyTitle: "Be the first to know when we're back",
    notifyDesc: "We'll send you a notification as soon as our digital services are up and running again.",
    notifyButton: "Notify Me",
    emailPlaceholder: "Your email address",
    feedbackTitle: "Help us improve",
    feedbackDesc: "Share your thoughts on what you'd like to see when we return.",
    feedbackPlaceholder: "Your suggestions and ideas...",
    feedbackButton: "Send Feedback",
    socialTitle: "Stay connected with us",
    socialDesc: "Follow us on social media for updates and exclusive content.",
    faqTitle: "Frequently Asked Questions",
    updates: "Maintenance Updates",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    copyright: "All rights reserved.",
    contact: "For urgent inquiries, please contact",
    tagline: "Welcome to A Smart Katsina!",
    dgMessage:
      "At KATDICT, we don't just dream of a digital future; we craft it. We are committed to shaping the very essence of Katsina's technological evolution, diving into a realm where innovation knows no bounds and accessibility is the key to unlocking solutions for the challenges we all face. I sincerely apologize for any inconvenience this maintenance may cause. This temporary downtime is necessary to enhance our services and provide you with an even better digital experience when we return.",
    dgName: "Naufal Ahmad",
    dgTitle: "Director General",
    projectsTitle: "Our Key Projects",
    projectsSubtitle: "Shaping the future of Katsina, Today",
    viewProject: "View project",
    serviceRequestTitle: "Emergency Service Request",
    serviceRequestDesc:
      "Need urgent ICT support during our maintenance? Submit your request below and our team will respond within 24 hours.",
    nameLabel: "Full Name",
    namePlaceholder: "Your full name",
    organizationLabel: "Organization/Agency",
    organizationPlaceholder: "Your organization or government agency",
    emailLabel: "Email Address",
    phonePlaceholder: "Your phone number",
    phoneLabel: "Phone Number",
    serviceTypeLabel: "Service Type",
    requestDetailsLabel: "Request Details",
    requestDetailsPlaceholder: "Please describe your emergency request in detail...",
    submitRequest: "Submit Request",
    priorityLabel: "Priority Level",
    onlineServices: "Online Services Available",
    viewAllServices: "View All Services",
  },
  ha: {
    title: "Muna Inganta Ayyukanmu",
    subtitle:
      "KATDICT na cikin gyara na tsari. Za mu dawo kan layi nan ba da jimawa ba tare da ingantattun ayyuka don inganta ƙwarewarku ta dijital a Jihar Katsina.",
    countdown: "Za mu dawo cikin:",
    whileYouWait: "Yayin Da Kuke Jira...",
    getNotified: "Sami Sanarwa",
    shareFeedback: "Ba da Ra'ayi",
    connect: "Haɗa",
    requestService: "Neman Aiki",
    notifyTitle: "Kasance na farko da za ka san lokacin da muka dawo",
    notifyDesc: "Za mu aika muku sanarwa nan da nan da ayyukanmu na dijital suka dawo suna aiki.",
    notifyButton: "Sanar da Ni",
    emailPlaceholder: "Adireshin imel ɗinku",
    feedbackTitle: "Taimaka mana mu inganta",
    feedbackDesc: "Ku raba tunaninku game da abin da kuke son gani lokacin da muka dawo.",
    feedbackPlaceholder: "Shawarwari da tunaninka...",
    feedbackButton: "Aika Ra'ayi",
    socialTitle: "Ku ci gaba da haɗa kai da mu",
    socialDesc: "Ku bi mu akan kafofin sada zumunta don sabuntawa da abun ciki na musamman.",
    faqTitle: "Tambayoyi da ake yawan yi",
    updates: "Sabuntawar Gyara",
    days: "Kwanaki",
    hours: "Sa'o'i",
    minutes: "Minti",
    seconds: "Dakika",
    copyright: "Duk haƙƙoƙi na musamman ne.",
    contact: "Don tambayoyi masu gaggawa, don Allah a tuntuɓi",
    tagline: "Barka da zuwa Katsina Mai Wayo!",
    dgMessage:
      "A KATDICT, ba mu kawai mafarki game da mustakbalin dijital ba; muna ƙirƙira shi. Mun yi alkawarin tsara tushen juyin juya hali na fasaha na Katsina, muna nutsuwa cikin fanni inda ƙirƙiri ba ya da iyaka kuma samun damar buɗe mafita ga kalubalen da muke fuskanta. Ina neman afuwa game da wani wahala da wannan gyaran zai iya haifar. Wannan dakatawa na wucin gadi ne don inganta ayyukanmu da samar muku da ƙwarewar dijital mai kyau fiye da lokacin da muka dawo.",
    dgName: "Naufal Ahmad",
    dgTitle: "Darakta Janar",
    projectsTitle: "Manyan Ayyukanmu",
    projectsSubtitle: "Muna tsara makomar Katsina, a Yau",
    viewProject: "Duba aiki",
    serviceRequestTitle: "Buƙatar Aiki na Gaggawa",
    serviceRequestDesc:
      "Kuna buƙatar tallafin ICT na gaggawa yayin gyaranmu? Aika da buƙatarku a ƙasa kuma ƙungiyarmu za ta amsa cikin awanni 24.",
    nameLabel: "Suna Cikakke",
    namePlaceholder: "Sunan ku na cikakke",
    organizationLabel: "Kungiya/Hukuma",
    organizationPlaceholder: "Kungiyarku ko hukumar gwamnati",
    emailLabel: "Adireshin Imel",
    phonePlaceholder: "Lambar wayarku",
    phoneLabel: "Lambar Waya",
    serviceTypeLabel: "Nau'in Aiki",
    requestDetailsLabel: "Bayanin Buƙata",
    requestDetailsPlaceholder: "Don Allah a bayyana buƙatar gaggawa da cikakken bayani...",
    submitRequest: "Aika Buƙata",
    priorityLabel: "Matakin Muhimmanci",
    onlineServices: "Ayyukan Yanar Gizo da ke Samuwa",
    viewAllServices: "Duba Duk Ayyukan",
  },
  fr: {
    title: "Nous Améliorons Nos Services",
    subtitle:
      "KATDICT est actuellement en maintenance programmée. Nous serons de retour en ligne sous peu avec des améliorations pour améliorer votre expérience numérique dans l'État de Katsina.",
    countdown: "Nous serons de retour dans:",
    whileYouWait: "Pendant que vous attendez...",
    getNotified: "Être Notifié",
    shareFeedback: "Partager des Commentaires",
    connect: "Se Connecter",
    requestService: "Demander un Service",
    notifyTitle: "Soyez le premier à savoir quand nous serons de retour",
    notifyDesc: "Nous vous enverrons une notification dès que nos services numériques seront à nouveau opérationnels.",
    notifyButton: "Me Notifier",
    emailPlaceholder: "Votre adresse e-mail",
    feedbackTitle: "Aidez-nous à améliorer",
    feedbackDesc: "Partagez vos réflexions sur ce que vous aimeriez voir à notre retour.",
    feedbackPlaceholder: "Vos suggestions et idées...",
    feedbackButton: "Envoyer des Commentaires",
    socialTitle: "Restez connecté avec nous",
    socialDesc: "Suivez-nous sur les réseaux sociaux pour des mises à jour et du contenu exclusif.",
    faqTitle: "Questions Fréquemment Posées",
    updates: "Mises à Jour de Maintenance",
    days: "Jours",
    hours: "Heures",
    minutes: "Secondes",
    seconds: "Secondes",
    copyright: "Tous droits réservés.",
    contact: "Pour les demandes urgentes, veuillez contacter",
    tagline: "Bienvenue à Katsina Intelligente!",
    dgMessage:
      "À KATDICT, nous ne rêvons pas seulement d'un avenir numérique; nous le créons. Nous nous engageons à façonner l'essence même de l'évolution technologique de Katsina, en plongeant dans un domaine où l'innovation ne connaît pas de limites et où l'accessibilité est la clé pour débloquer des solutions aux défis auxquels nous sommes tous confrontés. Je vous présente mes sincères excuses pour tout inconvénient que cette maintenance pourrait causer. Cette interruption temporaire est nécessaire pour améliorer nos services et vous offrir une expérience numérique encore meilleure à notre retour.",
    dgName: "Naufal Ahmad",
    dgTitle: "Directeur Général",
    projectsTitle: "Nos Projets Clés",
    projectsSubtitle: "Façonner l'avenir de Katsina, aujourd'hui",
    viewProject: "Voir le projet",
    serviceRequestTitle: "Demande de Service d'Urgence",
    serviceRequestDesc:
      "Besoin d'un support TIC urgent pendant notre maintenance? Soumettez votre demande ci-dessous et notre équipe vous répondra dans les 24 heures.",
    nameLabel: "Nom Complet",
    namePlaceholder: "Votre nom complet",
    organizationLabel: "Organisation/Agence",
    organizationPlaceholder: "Votre organisation ou agence gouvernementale",
    emailLabel: "Adresse Email",
    phonePlaceholder: "Votre numéro de téléphone",
    phoneLabel: "Numéro de Téléphone",
    serviceTypeLabel: "Type de Service",
    requestDetailsLabel: "Détails de la Demande",
    requestDetailsPlaceholder: "Veuillez décrire votre demande d'urgence en détail...",
    submitRequest: "Soumettre la Demande",
    priorityLabel: "Niveau de Priorité",
    onlineServices: "Services En Ligne Disponibles",
    viewAllServices: "Voir Tous Les Services",
  },
}

// Maintenance updates
const maintenanceUpdates = [
  {
    date: "April 23, 2025 - 10:30 AM",
    title: "Digital Infrastructure Upgrade Started",
    description:
      "We've begun upgrading our core digital infrastructure to better serve Katsina State government agencies.",
    status: "in-progress",
  },
  {
    date: "April 23, 2025 - 12:45 PM",
    title: "Smart Government House Systems Update",
    description:
      "Implementing enhanced security protocols and performance improvements for the Katsina Smart Government House platform.",
    status: "completed",
  },
  {
    date: "April 23, 2025 - 2:15 PM",
    title: "Digital Bridge Initiative Integration",
    description:
      "Integrating new features for the Digital Bridge Initiative to improve collaboration between government, academia, and industry.",
    status: "in-progress",
  },
  {
    date: "April 23, 2025 - 4:00 PM",
    title: "Eye on Katsina Platform Enhancement",
    description: "Updating the Eye on Katsina monitoring system with improved analytics and reporting capabilities.",
    status: "pending",
  },
]

// Projects data
const projects = [
  {
    id: 1,
    title: "Eye on Katsina",
    category: "Capacity Building and Training",
    description:
      "A comprehensive monitoring system that provides real-time insights into government services and infrastructure across Katsina State.",
    image: "/digital-monitoring-dashboard.png",
  },
  {
    id: 2,
    title: "Katsina Smart Government House",
    category: "Infrastructure Management and Oversight",
    description:
      "Digital transformation of the Government House with integrated systems for improved efficiency, security, and service delivery.",
    image: "/placeholder.svg?key=1no7a",
  },
  {
    id: 3,
    title: "Katsina Data Revolution",
    category: "Policies and Guidelines",
    description:
      "A data-driven initiative to improve decision-making across all government departments through advanced analytics and reporting.",
    image: "/data-analytics-dashboard.png",
  },
  {
    id: 4,
    title: "Katsina Digital Bridge",
    category: "Capacity Building and Training",
    description:
      "Connecting government, academia, and industry to foster innovation and technological advancement throughout Katsina State.",
    image: "/digital-collaboration-platform.png",
  },
]

// Online services data
const onlineServices = [
  {
    id: 1,
    title: "E-Governance Portal",
    description: "Access government services, forms, and applications online.",
    icon: "Layout",
    url: "https://eportal.katdict.gov.ng",
  },
  {
    id: 2,
    title: "Document Repository",
    description: "Access and download public documents and publications.",
    icon: "FileText",
    url: "https://docs.katdict.gov.ng",
  },
  {
    id: 3,
    title: "Helpdesk",
    description: "Submit support tickets and track their status.",
    icon: "LifeBuoy",
    url: "https://help.katdict.gov.ng",
  },
  {
    id: 4,
    title: "Open Data Portal",
    description: "Access public datasets and statistics for research and analysis.",
    icon: "BarChart",
    url: "https://data.katdict.gov.ng",
  },
  {
    id: 5,
    title: "Facility Usage Request",
    description: "Request to use KATDICT facilities for events and activities.",
    icon: "Building",
    url: "/facility-usage",
    isInternal: true,
  },
]

// Facility usage guidelines
const facilityGuidelines = {
  permitted: [
    "Official government meetings and workshops",
    "ICT training sessions and educational programs",
    "Technology exhibitions and demonstrations",
    "Digital literacy programs",
    "Approved community development initiatives",
  ],
  prohibited: [
    "Political campaign events or partisan activities",
    "Religious ceremonies or sectarian gatherings",
    "Commercial activities without prior authorization",
    "Events promoting discrimination or divisive content",
    "Activities that may damage equipment or infrastructure",
  ],
  guidelines: [
    "Requests must be submitted at least 14 days before the intended date",
    "A designated point of contact must be present throughout the event",
    "Maximum capacity limits must be strictly observed",
    "All equipment must be handled according to provided instructions",
    "Premises must be vacated by the agreed end time",
    "Any damages must be reported immediately to facility management",
  ],
  penalties: [
    "Violation of guidelines may result in immediate termination of the event",
    "Damages to equipment or facilities will be charged to the requesting organization",
    "Misrepresentation of event purpose may lead to blacklisting from future facility use",
    "Failure to adhere to capacity limits may result in fines",
    "Late cancellations (less than 72 hours) may incur administrative fees",
  ],
}

export default function MaintenancePage() {
  // Language state
  const [language, setLanguage] = useState("en")
  const t = translations[language as keyof typeof translations]

  // Add this line

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Animation states for staggered animations
  const [animationStates, setAnimationStates] = useState({
    header: false,
    services: false,
    dgMessage: false,
    welcome: false,
    countdown: false,
    projects: false,
    updates: false,
    interactive: false,
    faq: false,
    footer: false,
  })

  // Refs for scroll animations
  const servicesRef = useRef<HTMLElement>(null)
  const dgMessageRef = useRef<HTMLElement>(null)
  const welcomeRef = useRef<HTMLElement>(null)
  const countdownRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const updatesRef = useRef<HTMLElement>(null)
  const interactiveRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)

  // Facility Guidelines Modal
  // Replace the showGuidelines state with useModal
  // const [showGuidelines, setShowGuidelines] = useState(false)
  const { isOpen: showGuidelines, open: openGuidelinesModal, close: closeGuidelinesModal } = useModal()

  // Remove the openGuidelinesModal and closeGuidelinesModal functions since they're now provided by useModal

  // Set end date to 24 hours from now for demo purposes
  useEffect(() => {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 1) // 24 hours from now

    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    // Initial animations
    setAnimationStates((prev) => ({ ...prev, header: true }))
    setTimeout(() => setAnimationStates((prev) => ({ ...prev, services: true })), 100)

    // Scroll animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          if (target === dgMessageRef.current) {
            setAnimationStates((prev) => ({ ...prev, dgMessage: true }))
          } else if (target === welcomeRef.current) {
            setAnimationStates((prev) => ({ ...prev, welcome: true }))
          } else if (target === countdownRef.current) {
            setAnimationStates((prev) => ({ ...prev, countdown: true }))
          } else if (target === projectsRef.current) {
            setAnimationStates((prev) => ({ ...prev, projects: true }))
          } else if (target === updatesRef.current) {
            setAnimationStates((prev) => ({ ...prev, updates: true }))
          } else if (target === interactiveRef.current) {
            setAnimationStates((prev) => ({ ...prev, interactive: true }))
          } else if (target === faqRef.current) {
            setAnimationStates((prev) => ({ ...prev, faq: true }))
          }
          observer.unobserve(target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (dgMessageRef.current) observer.observe(dgMessageRef.current)
    if (welcomeRef.current) observer.observe(welcomeRef.current)
    if (countdownRef.current) observer.observe(countdownRef.current)
    if (projectsRef.current) observer.observe(projectsRef.current)
    if (updatesRef.current) observer.observe(updatesRef.current)
    if (interactiveRef.current) observer.observe(interactiveRef.current)
    if (faqRef.current) observer.observe(faqRef.current)

    // Footer animation
    setTimeout(() => setAnimationStates((prev) => ({ ...prev, footer: true })), 1700)

    return () => {
      clearInterval(timer)
      observer.disconnect()
    }
  }, [])

  // Remove the entire FacilityGuidelinesModal function and replace it with this Modal component at the end of the return statement:
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header
        className={`w-full bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          animationStates.header ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/images/logo.png" alt="KATDICT Logo" width={150} height={60} className="h-auto" priority />
            <div className="hidden md:block h-8 w-px bg-gray-200"></div>
            <p className="hidden md:block text-sm font-medium text-[#009832]">{t.tagline}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 rounded-md border-gray-200 hover:border-[#009832] hover:text-[#009832] transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-lg border-gray-100 shadow-lg animate-in fade-in-80 zoom-in-95"
            >
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className="rounded-lg hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("ha")}
                className="rounded-lg hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
              >
                Hausa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("fr")}
                className="rounded-lg hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
              >
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Online Services Panel */}
      <section
        ref={servicesRef}
        className={`bg-gradient-to-r from-[#009832]/5 to-[#009832]/10 border-b border-[#009832]/10 transition-all duration-700 ease-in-out ${
          animationStates.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-1 bg-[#009832] rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-800">{t.onlineServices}</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm hidden sm:flex items-center text-[#009832] hover:text-[#009832] hover:bg-[#009832]/10 transition-all duration-300 rounded-md"
              >
                {t.viewAllServices} <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {onlineServices.map((service, index) => {
                const IconComponent =
                  service.icon === "Layout"
                    ? Layout
                    : service.icon === "FileText"
                      ? FileText
                      : service.icon === "LifeBuoy"
                        ? LifeBuoy
                        : service.icon === "Building"
                          ? Building
                          : BarChart

                return (
                  <a
                    key={service.id}
                    href={service.url}
                    onClick={(e) => {
                      if (service.isInternal) {
                        e.preventDefault()
                        openGuidelinesModal()
                      }
                    }}
                    target={service.isInternal ? undefined : "_blank"}
                    rel={service.isInternal ? undefined : "noopener noreferrer"}
                    className="group bg-white rounded-md p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#009832]/20 transition-all duration-300 flex flex-col h-full"
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      animation: `fadeIn 0.5s ease-out ${index * 100 + 200}ms both`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-br from-[#009832]/10 to-[#009832]/20 p-2.5 flex-shrink-0 group-hover:from-[#009832]/20 group-hover:to-[#009832]/30 transition-all duration-300">
                        <IconComponent className="h-5 w-5 text-[#009832]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#009832] transition-colors duration-300 flex items-center">
                          {service.title}
                          {service.isInternal ? (
                            <Info className="ml-1.5 h-3 w-3 text-amber-500" />
                          ) : (
                            <ExternalLink className="ml-1.5 h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs sm:text-sm sm:hidden self-center mt-2 text-[#009832] hover:text-[#009832] hover:bg-[#009832]/10 transition-all duration-300 rounded-md"
            >
              {t.viewAllServices} <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Mobile Tagline */}
          <div className="md:hidden text-center mb-8">
            <p className="text-sm font-medium text-[#009832]">{t.tagline}</p>
          </div>

          {/* DG's Message */}
          <section
            ref={dgMessageRef}
            className={`mb-12 transition-all duration-1000 ease-in-out ${
              animationStates.dgMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-all duration-500">
              <div className="p-6 md:p-8 bg-gradient-to-br from-white to-gray-50">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#009832]/10 to-[#009832]/20 flex items-center justify-center shadow-inner">
                      <User className="w-12 h-12 text-[#009832]" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{t.dgName}</h3>
                    <p className="text-sm text-[#009832] font-medium mb-4">{t.dgTitle}</p>
                    <p className="text-gray-600 italic leading-relaxed">{t.dgMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Welcome Message */}
          <section
            ref={welcomeRef}
            className={`mb-12 transition-all duration-1000 ease-in-out ${
              animationStates.welcome ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#009832] to-[#00b33c] tracking-tight">
                Welcome to KATDICT
              </h1>
              <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto backdrop-blur-sm bg-white/90">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{t.title}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
              </div>
            </div>
          </section>

          {/* Countdown Timer */}
          <section
            ref={countdownRef}
            className={`mb-16 transition-all duration-1000 ease-in-out ${
              animationStates.countdown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">{t.countdown}</h2>
              <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-md shadow-md w-20 h-20 flex items-center justify-center text-3xl font-bold text-[#009832] backdrop-blur-sm bg-white/90 hover:shadow-lg transition-all duration-300">
                    {timeLeft.days}
                  </div>
                  <span className="text-sm mt-2 text-gray-500 font-medium">{t.days}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-md shadow-md w-20 h-20 flex items-center justify-center text-3xl font-bold text-[#009832] backdrop-blur-sm bg-white/90 hover:shadow-lg transition-all duration-300">
                    {timeLeft.hours}
                  </div>
                  <span className="text-sm mt-2 text-gray-500 font-medium">{t.hours}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-md shadow-md w-20 h-20 flex items-center justify-center text-3xl font-bold text-[#009832] backdrop-blur-sm bg-white/90 hover:shadow-lg transition-all duration-300">
                    {timeLeft.minutes}
                  </div>
                  <span className="text-sm mt-2 text-gray-500 font-medium">{t.minutes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-md shadow-md w-20 h-20 flex items-center justify-center text-3xl font-bold text-[#009832] backdrop-blur-sm bg-white/90 hover:shadow-lg transition-all duration-300">
                    {timeLeft.seconds}
                  </div>
                  <span className="text-sm mt-2 text-gray-500 font-medium">{t.seconds}</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-12">
              {/* Projects Showcase */}
              <section
                ref={projectsRef}
                className={`transition-all duration-1000 ease-in-out ${
                  animationStates.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 backdrop-blur-sm bg-white/90">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{t.projectsTitle}</h2>
                    <p className="text-gray-600">{t.projectsSubtitle}</p>
                    <Separator className="mt-4 mx-auto w-24 bg-gradient-to-r from-[#009832]/60 to-[#009832]" />
                  </div>

                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="group flex flex-col md:flex-row gap-4 p-4 rounded-md hover:bg-gray-50 transition-all duration-500"
                        style={{
                          transitionDelay: `${index * 100}ms`,
                          animation: `fadeIn 0.5s ease-out ${index * 100 + 200}ms both`,
                        }}
                      >
                        <div className="md:w-1/3 aspect-video relative rounded-md overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <div className="mb-2">
                            <span className="text-xs font-medium text-[#009832] bg-gradient-to-r from-[#009832]/10 to-[#009832]/20 px-3 py-1 rounded-full">
                              {project.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-[#009832] transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#009832] border-[#009832] hover:bg-[#009832] hover:text-white transition-all duration-300 rounded-md"
                          >
                            {t.viewProject} <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section
                ref={faqRef}
                className={`transition-all duration-1000 ease-in-out ${
                  animationStates.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 backdrop-blur-sm bg-white/90">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{t.faqTitle}</h2>
                    <Separator className="mt-4 mx-auto w-24 bg-gradient-to-r from-[#009832]/60 to-[#009832]" />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-gray-100">
                      <AccordionTrigger className="text-left py-4 hover:text-[#009832] transition-colors duration-300">
                        What is KATDICT?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        KATDICT is the Katsina Directorate of Information and Communications Technology. We are
                        pioneering the digital transformation of Katsina State, committed to shaping the technological
                        evolution of our state where innovation knows no bounds and accessibility is key to unlocking
                        solutions for the challenges we all face.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b border-gray-100">
                      <AccordionTrigger className="text-left py-4 hover:text-[#009832] transition-colors duration-300">
                        Why is the KATDICT website under maintenance?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        We're upgrading our digital infrastructure to better serve the people of Katsina State. This
                        maintenance includes improvements to our core systems, enhanced security protocols, and new
                        features for our digital initiatives like the Digital Bridge, Eye on Katsina, and Smart
                        Government House platforms.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b border-gray-100">
                      <AccordionTrigger className="text-left py-4 hover:text-[#009832] transition-colors duration-300">
                        What services does KATDICT provide?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        KATDICT provides a range of services including ICT Governance & Strategy, Needs Assessment &
                        Procurement, Capacity Building & Training, Infrastructure Management & Oversight, Innovation &
                        Collaboration, and Reporting & Advocacy. We coordinate Katsina State ICT activities, implement
                        strategic policy frameworks, and drive automation initiatives to streamline government
                        processes.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border-b border-gray-100">
                      <AccordionTrigger className="text-left py-4 hover:text-[#009832] transition-colors duration-300">
                        What projects is KATDICT currently working on?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        KATDICT is currently working on several key projects including the Eye on Katsina monitoring
                        system, Katsina Smart Government House, Katsina Data Revolution, and the Katsina Digital Bridge
                        initiative. These projects aim to enhance digital governance, improve service delivery, and
                        foster innovation across Katsina State.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left py-4 hover:text-[#009832] transition-colors duration-300">
                        How can I request KATDICT's services?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        While our website is under maintenance, you can still request our services by contacting us
                        directly at support@katdict.gov.ng. Once our website is back online, you'll be able to use our
                        streamlined service request system to access our ICT governance, capacity building,
                        infrastructure management, and innovation services.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Maintenance Updates Section */}
              <section
                ref={updatesRef}
                className={`transition-all duration-1000 ease-in-out ${
                  animationStates.updates ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 backdrop-blur-sm bg-white/90">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{t.updates}</h2>
                    <Separator className="mt-4 mx-auto w-24 bg-gradient-to-r from-[#009832]/60 to-[#009832]" />
                  </div>

                  <div className="space-y-6">
                    {maintenanceUpdates.map((update, index) => (
                      <div
                        key={index}
                        className="relative pl-8 pb-6 group"
                        style={{
                          transitionDelay: `${index * 100}ms`,
                          animation: `fadeIn 0.5s ease-out ${index * 100 + 200}ms both`,
                        }}
                      >
                        {index < maintenanceUpdates.length - 1 && (
                          <div className="absolute left-[15px] top-[24px] bottom-0 w-[2px] bg-gradient-to-b from-gray-100 to-gray-200 group-hover:from-[#009832]/10 group-hover:to-[#009832]/20 transition-colors duration-500"></div>
                        )}

                        <div className="absolute left-0 top-1 rounded-full p-1 bg-white shadow-sm">
                          {update.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-[#009832]" />
                          ) : update.status === "in-progress" ? (
                            <Clock className="h-5 w-5 text-amber-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium group-hover:text-[#009832] transition-colors duration-300">
                              {update.title}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full shadow-sm">
                              {update.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{update.description}</p>
                          <div>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                update.status === "completed"
                                  ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-100"
                                  : update.status === "in-progress"
                                    ? "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-100"
                                    : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-100"
                              }`}
                            >
                              {update.status === "completed"
                                ? "Completed"
                                : update.status === "in-progress"
                                  ? "In Progress"
                                  : "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Interactive Elements */}
              <section
                ref={interactiveRef}
                className={`transition-all duration-1000 ease-in-out ${
                  animationStates.interactive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 backdrop-blur-sm bg-white/90">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{t.whileYouWait}</h2>
                    <Separator className="mt-4 mx-auto w-24 bg-gradient-to-r from-[#009832]/60 to-[#009832]" />
                  </div>

                  <Tabs defaultValue="notify" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100 p-1 rounded-md">
                      <TabsTrigger
                        value="notify"
                        className="data-[state=active]:bg-[#009832] data-[state=active]:text-white rounded-sm transition-all duration-300"
                      >
                        {t.getNotified}
                      </TabsTrigger>
                      <TabsTrigger
                        value="feedback"
                        className="data-[state=active]:bg-[#009832] data-[state=active]:text-white rounded-sm transition-all duration-300"
                      >
                        {t.shareFeedback}
                      </TabsTrigger>
                      <TabsTrigger
                        value="social"
                        className="data-[state=active]:bg-[#009832] data-[state=active]:text-white rounded-sm transition-all duration-300"
                      >
                        {t.connect}
                      </TabsTrigger>
                      <TabsTrigger
                        value="request"
                        className="data-[state=active]:bg-[#009832] data-[state=active]:text-white rounded-sm transition-all duration-300"
                      >
                        {t.requestService}
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Get Notified */}
                    <TabsContent value="notify" className="p-6 bg-gray-50 rounded-md animate-fadeIn">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg text-gray-800">{t.notifyTitle}</h3>
                        <p className="text-gray-600 text-sm">{t.notifyDesc}</p>
                        <div className="flex gap-2">
                          <Input
                            placeholder={t.emailPlaceholder}
                            className="flex-1 rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                          />
                          <Button className="bg-gradient-to-r from-[#009832] to-[#00b33c] hover:from-[#00b33c] hover:to-[#009832] text-white transition-all duration-500 hover:shadow-md rounded-md">
                            <BellRing className="mr-2 h-4 w-4" />
                            {t.notifyButton}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab 2: Share Feedback */}
                    <TabsContent value="feedback" className="p-6 bg-gray-50 rounded-md animate-fadeIn">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg text-gray-800">{t.feedbackTitle}</h3>
                        <p className="text-gray-600 text-sm">{t.feedbackDesc}</p>
                        <Textarea
                          placeholder={t.feedbackPlaceholder}
                          className="min-h-[120px] rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                        />
                        <Button className="bg-gradient-to-r from-[#009832] to-[#00b33c] hover:from-[#00b33c] hover:to-[#009832] text-white transition-all duration-500 hover:shadow-md rounded-md">
                          <Mail className="mr-2 h-4 w-4" />
                          {t.feedbackButton}
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 3: Social Media */}
                    <TabsContent value="social" className="p-6 bg-gray-50 rounded-md animate-fadeIn">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg text-gray-800">{t.socialTitle}</h3>
                        <p className="text-gray-600 text-sm">{t.socialDesc}</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <Button
                            variant="outline"
                            className="border-[#009832] text-[#009832] hover:bg-[#009832] hover:text-white transition-all duration-300 rounded-md"
                          >
                            Twitter
                          </Button>
                          <Button
                            variant="outline"
                            className="border-[#009832] text-[#009832] hover:bg-[#009832] hover:text-white transition-all duration-300 rounded-md"
                          >
                            Instagram
                          </Button>
                          <Button
                            variant="outline"
                            className="border-[#009832] text-[#009832] hover:bg-[#009832] hover:text-white transition-all duration-300 rounded-md"
                          >
                            LinkedIn
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab 4: Service Request Form */}
                    <TabsContent value="request" className="p-6 bg-gray-50 rounded-md animate-fadeIn">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-lg text-gray-800">{t.serviceRequestTitle}</h3>
                          <p className="text-gray-600 text-sm">{t.serviceRequestDesc}</p>
                        </div>

                        <form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                {t.nameLabel}
                              </label>
                              <Input
                                id="name"
                                placeholder={t.namePlaceholder}
                                className="rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="organization" className="text-sm font-medium text-gray-700">
                                {t.organizationLabel}
                              </label>
                              <Input
                                id="organization"
                                placeholder={t.organizationPlaceholder}
                                className="rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                {t.emailLabel}
                              </label>
                              <Input
                                id="email"
                                type="email"
                                placeholder={t.emailPlaceholder}
                                className="rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                {t.phoneLabel}
                              </label>
                              <Input
                                id="phone"
                                placeholder={t.phonePlaceholder}
                                className="rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="service-type" className="text-sm font-medium text-gray-700">
                                {t.serviceTypeLabel}
                              </label>
                              <Select>
                                <SelectTrigger
                                  id="service-type"
                                  className="rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                                >
                                  <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md">
                                  <SelectItem value="ict-governance">ICT Governance & Strategy</SelectItem>
                                  <SelectItem value="procurement">Needs Assessment & Procurement</SelectItem>
                                  <SelectItem value="training">Capacity Building & Training</SelectItem>
                                  <SelectItem value="infrastructure">Infrastructure Management & Oversight</SelectItem>
                                  <SelectItem value="innovation">Innovation & Collaboration</SelectItem>
                                  <SelectItem value="reporting">Reporting & Advocacy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                                {t.priorityLabel}
                              </label>
                              <Select>
                                <SelectTrigger
                                  id="priority"
                                  className="rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                                >
                                  <SelectValue placeholder="Select priority level" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md">
                                  <SelectItem value="critical">Critical - Urgent Attention Required</SelectItem>
                                  <SelectItem value="high">High - Important Issue</SelectItem>
                                  <SelectItem value="medium">Medium - Standard Request</SelectItem>
                                  <SelectItem value="low">Low - When Convenient</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="request-details" className="text-sm font-medium text-gray-700">
                              {t.requestDetailsLabel}
                            </label>
                            <Textarea
                              id="request-details"
                              placeholder={t.requestDetailsPlaceholder}
                              className="min-h-[120px] rounded-sm border-gray-200 focus:border-[#009832] focus:ring-[#009832] transition-all duration-300"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#009832] to-[#00b33c] hover:from-[#00b33c] hover:to-[#009832] text-white transition-all duration-500 hover:shadow-md rounded-md"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {t.submitRequest}
                          </Button>
                        </form>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`w-full bg-white border-t border-gray-100 py-8 transition-all duration-1000 ease-in-out ${
          animationStates.footer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} KATDICT - Katsina Directorate of Information and Communications Technology.{" "}
            {t.copyright}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {t.contact}{" "}
            <span className="text-[#009832] font-medium hover:underline transition-all duration-300">
              support@katdict.gov.ng
            </span>
          </p>
        </div>
      </footer>
      {/* Facility Guidelines Modal */}
      <Modal
        isOpen={showGuidelines}
        onClose={closeGuidelinesModal}
        title={
          <div className="flex items-center">
            <Building className="mr-2 h-5 w-5 text-[#009832]" />
            Facility Usage Guidelines
          </div>
        }
        footer={
          <div className="flex justify-end">
            <Button
              onClick={() => {
                closeGuidelinesModal()
                router.push("/facility-usage")
              }}
              className="bg-gradient-to-r from-[#009832] to-[#00b33c] hover:from-[#00b33c] hover:to-[#009832] text-white transition-all duration-300 rounded-md"
            >
              I Understand
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Please review all guidelines carefully before submitting a facility usage request. By submitting a
                request, you agree to comply with all terms and conditions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-600" />
              Permitted Activities
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.permitted.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <X className="mr-2 h-5 w-5 text-red-600" />
              Prohibited Activities
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.prohibited.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-600" />
              Usage Guidelines
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.guidelines.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
              Penalties for Violations
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.penalties.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}
