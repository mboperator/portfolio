import {Product} from "@/types";
import {IlaSpecs} from "@/components/ilaSpecs";
import {IlaImplementation} from "@/components/ilaImplementation";
import {RedeemersApp} from "@/components/redeemersApp";
import {OdysseyApp} from "@/components/odysseyApp";

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
        {
          description: 'The lantern is designed to deliver best in class battery life, brightness, and resilience.',
          component: IlaSpecs
        },
        {
          description: 'I\'m responsible for product management, industrial design, UI/UX, and firmware and mobile app.',
          component: IlaImplementation
        }
      ]
    },
    {
      slug: 'redeemers-church-ventura',
      organization: "Redeemer's Church Ventura",
      name: "Redeemer's Community",
      description: "The community app for Redeemer's Church Ventura. This project was started to solve a need for Redeemer\'s Church Ventura during COVID.",
      platform: ['mobile', 'web'],
      technologies: ['react-native', 'ruby-on-rails', 'mobx', 'nextjs'],
      coverImage: '/redeemers-church/landing-page.png',
      coverImageSize: 'contain',
      slides: [
        {
          image: "/redeemers-church/prayer-requests.png",
          imageSize: 'contain',
          description: 'At the time, prayer requests were being submitted and received by hand. The solution was to digitize the entire process to keep both staff and congregants as safe as possible.'
        },
        {
          component: RedeemersApp,
          description: 'Today, congregants use the app to watch sermons, receive announcements, and to view prayer requests.'
        },
        { image: "/redeemers-church/admin.png", imageSize: 'contain', description: 'I\'m responsible for product discovery, UI/UX design, and for implementing the congregant mobile apps, as well as the staff\'s management system. This app is implemented using Ruby on Rails, React Native, Nextjs, Postgres, and Twilio.'},
      ]
    },
    {
      slug: 'odyssey-journal',
      organization: 'Totum Technologies',
      name: 'Odyssey Journal',
      description: "The private, encrypted journal for one's walk with God.",
      platform: ['mobile', 'web'],
      technologies: ['react-native', 'mobx'],
      coverImage: '/odyssey-journal/landing-page.png',
      coverImageSize: 'contain',
      slides: [
        {
          component: OdysseyApp,
          description: 'Odyssey is implemented using React Native, Firebase, the compromise NLP library, and Nextjs.'
        },
      ],
    },
    {
      slug: 'prequalification',
      organization: 'Procore Technologies',
      name: 'Prequalification',
      description: "A single platform for assessing a company’s risk, putting together a plan, and inviting them onto construction projects.",
      platform: ['web'],
      technologies: ['react', 'ruby-on-rails', 'mobx'],
      coverImage: 'prequal-1.png',
      coverImageSize: 'contain',
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
      coverImageSize: 'contain',
      slides: [{
        image: 'project-financials.png',
        imageAnchor: 'left',
        imageSize: 'contain'
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
      coverImageSize: 'contain',
    },
  ]

}
