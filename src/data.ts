import {Product} from "@/types";
import {IlaSpecs} from "@/components/ilaSpecs";

export function getProducts(): Product[] {
  return [
    {
      slug: 'ila-lantern',
      organization: 'Totum Technologies',
      name: 'Ila Lantern',
      description: 'Ila is the lantern built for moments of connection. It has been in active development since 2020.',
      platform: ['mobile'],
      technologies: ['react-native', 'ble', 'mobx'],
      coverImage: '/ila-lantern/lantern.webp',
      slides: [
        { image: "/ila-lantern/brothers.jpeg", imageSize: 'contain', description: 'This product is a result of the combined efforts of my best friend, co-founder, and electrical engineer - Emmanuel Chagbe - and I.'},
        {
          description: 'The lantern is designed to deliver best in class battery life, brightness, and resilience.',
          component: IlaSpecs
        },
        { image: "/ila-lantern/workshop.png", imageSize: 'contain', description: 'Personally, I\'m responsible for hardware design, software architecture, and firmware and mobile app implementation.'}
      ]
    },
    {
      slug: 'redeemers-church-ventura',
      organization: "Redeemer's Church Ventura",
      name: "Redeemer's Community",
      description: "The community app for my local church family.",
      platform: ['mobile', 'web'],
      technologies: ['react-native', 'ruby-on-rails', 'mobx', 'nextjs'],
      coverImage: 'redeemers-ventura.jpeg',
      slides: [
        { image: "redeemers-ventura.jpeg", imageSize: 'contain', description: 'This project was started to solve a need for Redeemer\'s Church Ventura during COVID.'},
        { image: "redeemers-ventura.jpeg", imageSize: 'contain', description: 'At the time, prayer requests were being done by hand. The problem to solve was to digitize the entire process to keep both staff and congregants as safe as possible.'},
        { image: "redeemers-ventura.jpeg", imageSize: 'contain', description: 'Today, congregants use the app to watch sermons, receive announcements, and to view prayer requests.'},
        { image: "redeemers-ventura.jpeg", imageSize: 'contain', description: 'I\'m responsible for product discovery, UI/UX design, and for implementing the congregant mobile apps, as well as the staff\'s management system.'},
      ]
    },
    {
      slug: 'odyssey-journal',
      organization: 'Totum Technologies',
      name: 'Odyssey Journal',
      description: "The private, encrypted journal for one's walk with God.",
      platform: ['mobile', 'web'],
      technologies: ['react-native', 'mobx'],
      coverImage: 'odyssey-journal.png',
      slides: [],
    },
    {
      slug: 'prequalification',
      organization: 'Procore Technologies',
      name: 'Prequalification',
      description: "A single platform for assessing a company’s risk, putting together a plan, and inviting them onto construction projects.",
      platform: ['web'],
      technologies: ['react', 'ruby-on-rails', 'mobx'],
      coverImage: 'prequal-1.png',
      slides: [
        { image: 'prequal-2.png', imageSize: 'contain',  description: 'From this view, General Contractors can toggle fields on and off.'},
        { image: "prequal-3.png", imageSize: 'contain', description: 'General Contractors also see submitted Prequalification form results.'}
      ],
    },
    {
      slug: 'bid-management',
      organization: 'Procore Technologies',
      name: 'Bid Management',
      description: 'A single platform for creating bid packages, expanding bid coverage, analyzing bids, and converting bids to subcontracts.',
      platform: ['web'],
      technologies: ['react', 'ruby-on-rails', 'mobx'],
      coverImage: '',
      slides: []
    },
    {
      slug: 'project-financials',
      organization: 'Procore Technologies',
      name: 'Project Financials',
      description: 'A solution that makes it easier to collaboratively manage accurate budgets in one, accurate source of truth.',
      platform: ['web'],
      technologies: ['react', 'ruby-on-rails', 'redux'],
      coverImage: 'project-financials.png',
      coverImageAnchor: 'left',
      slides: [{
        image: 'project-financials.png',
        imageAnchor: 'left',
      }],
    },
    {
      slug: 'core',
      organization: 'Procore Technologies',
      name: 'CORE Component Library',
      description: 'A React implementation of Procore\'s design guidelines.',
      platform: ['web'],
      technologies: ['react', 'sass'],
      coverImage: 'core-react.png',
    },
  ]

}
