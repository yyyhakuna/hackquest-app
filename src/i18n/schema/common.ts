import type { I18nSchema } from '../config'

export const commonSchema: I18nSchema = {
  google: {
    value: 'Google',
    description: 'Google button text',
  },
  LocaleSwitcher: {
    lang: {
      value: 'Language',
      description: 'Language switcher label text',
    },
    en: {
      value: 'English',
      description: 'English language option',
    },
    zh: {
      value: 'Chinese',
      description: 'Chinese language option',
    },
    about: {
      value: 'About',
      description: 'About page title',
    },
  },
  landing: {
    header: {
      auth: {
        login: {
          value: 'login',
          description: 'login button text',
        },
        logout: {
          value: 'logout',
          description: 'logout button text',
        },
      },
    },
    content: {
      value: 'content',
      description: 'content description',
    },
    footer: {
      value: 'footer',
      description: 'footer description',
    },
  },
  buttonText: {
    submit: {
      value: 'Submit',
      description: 'submit button text',
    },
    close: {
      value: 'Close',
      description: 'close button text',
    },
    continue: {
      value: 'Continue',
      description: 'continue button text',
    },
    skip: {
      value: 'Skip',
      description: 'skip button text',
    },
    tryAgain: {
      value: 'Try Again',
      description: 'try again button text',
    },
    confirm: {
      value: 'Confirm',
      description: 'confirm button text',
    },
  },
  sideBar: {
    home: {
      value: 'Home',
      description: 'sidebar home label text',
    },
    quest: {
      value: 'Quest',
      description: 'sidebar quest label text',
    },
    learn: {
      value: 'LEARN',
      description: 'sidebar Learn label text',
    },
    learningTrack: {
      value: 'Learning Track',
      description: 'sidebar Learning Track label text',
    },
    project: {
      value: 'Project',
      description: 'sidebar project label text',
    },
    community: {
      value: 'COMMUNITY',
      description: 'sidebar community label text',
    },
    event: {
      value: 'Event',
      description: 'sidebar event label text',
    },
    advocate: {
      value: 'Advocate',
      description: 'sidebar advocate label text',
    },
    coLearning: {
      value: 'Co-learning',
      description: 'sidebar Co-learning label text',
    },
    build: {
      value: 'Build',
      description: 'sidebar Build label text',
    },
    buildHome: {
      value: 'Builder Home',
      description: 'sidebar Builder Home label text',
    },
    explore: {
      value: 'Explore',
      description: 'sidebar Explore label text',
    },
    pastProject: {
      value: 'Past Project',
      description: 'sidebar Past Project label text',
    },
    hackathonTeam: {
      value: 'Hackathon Team',
      description: 'sidebar Hackathon Team label text',
    },
    more: {
      value: 'More',
      description: 'sidebar More label text',
    },
    glossary: {
      value: 'Glossary',
      description: 'sidebar Glossary label text',
    },
    blog: {
      value: 'Blog',
      description: 'sidebar Blog label text',
    },
    faucets: {
      value: 'Faucets',
      description: 'sidebar faucets label text',
    },
    jobStation: {
      value: 'Job Station',
      description: 'sidebar Job Station label text',
    },
    pressKit: {
      value: 'Press Kit',
      description: 'sidebar Press Kit label text',
    },
    partnership: {
      value: 'Partnership',
      description: 'sidebar Partnership label text',
    },
    organizer: {
      value: 'Organizer',
      description: 'sidebar Organizer label text',
    },
    missionCenter: {
      value: 'Mission Center',
      description: 'sidebar Mission Center label text',
    },
  },
  back: {
    value: 'Back',
    description: 'page back text',
  },
  share: {
    value: 'Share',
    description: 'page share text',
  },
  optional: {
    value: 'Optional',
    description: 'optional text',
  },
  or: {
    value: 'Or',
    description: 'or text',
  },
  404: {
    title: {
      value: 'Page Not Found :(',
      description: '404 page title',
    },
    description: {
      value: 'We could not find this page',
      description: '404 page We could not find this page text',
    },
    button: {
      value: 'Back to home',
      description: '404 page back to home button text title',
    },
  },
  errorPage: {
    title: {
      value: 'Something went wrong :(',
      description: 'error page title',
    },
    description: {
      value: 'Please refresh this page or contact',
      description: 'error page Please refresh this page or contact text',
    },
    reloadButton: {
      value: 'Reload',
      description: '404 page reload button text',
    },
    backToHomeButton: {
      value: 'Back to home',
      description: '404 page back to home button text title',
    },
  },
}
