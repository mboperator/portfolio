import {Product} from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: 'ila-lantern',
    organization: 'Totum Technologies',
    name: 'Ila Lantern',
    description: 'The light built for moments of connection.',
    platform: ['mobile'],
    technologies: ['react-native', 'ble', 'mobx'],
    slides: [
      {
        image: 'ila-lantern.png'
      }
    ]
  },
  {
    slug: 'redeemers-church-ventura',
    organization: "Redeemer's Church Ventura",
    name: "Redeemer's Community",
    description: "The community app for my local church family.",
    platform: ['mobile', 'web'],
    technologies: ['react-native', 'ruby-on-rails', 'mobx'],
    slides: [
      {
        image: 'redeemers-ventura.jpeg'
      }
    ]
  },
  {
    slug: 'odyssey-journal',
    organization: 'Totum Technologies',
    name: 'Odyssey Journal',
    description: "The private, encrypted journal for one's walk with God.",
    platform: ['mobile', 'web'],
    technologies: ['react-native', 'mobx'],
    slides: [
      {
        image: 'odyssey-journal.png'
      }
    ]
  },
  {
    slug: 'prequalification',
    organization: 'Procore Technologies',
    name: 'Prequalification',
    description: "A single platform for assessing a company’s risk, putting together a plan, and inviting them onto construction projects.",
    platform: ['web'],
    technologies: ['react', 'ruby-on-rails', 'mobx'],
    slides: [
      { image: 'prequal-1.png', imageSize: 'contain' },
      { image: 'prequal-2.png', imageSize: 'contain'},
      { image: "prequal-3.png", imageSize: 'contain'}
    ],
  },
  {
    slug: 'bid-management',
    organization: 'Procore Technologies',
    name: 'Bid Management',
    description: 'A single platform for creating bid packages, expanding bid coverage, analyzing bids, and converting bids to subcontracts.',
    platform: ['web'],
    technologies: ['react', 'ruby-on-rails', 'mobx'],
    slides: [],
  },
  {
    slug: 'project-financials',
    organization: 'Procore Technologies',
    name: 'Project Financials',
    description: 'A solution that makes it easier to collaboratively manage accurate budgets in one, accurate source of truth.',
    platform: ['web'],
    technologies: ['react', 'ruby-on-rails', 'redux'],
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
    slides: [{
      image: 'core-react.png'
    }]
  },
]
