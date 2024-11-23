export const streakIcon = (size?: 'small' | 'default') => {
  const width = size === 'small' ? 13 : 24
  const height = size === 'small' ? 17 : 31
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 24 31`}
      fill="none"
    >
      <path
        d="M10.9091 30.9769C9.02118 30.8188 7.26847 30.241 5.67248 29.2106C2.7832 27.3434 0.97306 24.6953 0.245654 21.2966C-0.0390866 19.9634 -0.0498541 18.6107 0.0793561 17.2544C0.528003 12.5468 2.65997 8.65061 5.70479 5.19718C7.37495 3.30442 9.25687 1.65616 11.3446 0.254841C11.7047 0.0127719 12.0756 -0.117386 12.4835 0.142929C12.852 0.3777 12.9693 0.726814 12.9693 1.15256C12.9645 3.73382 12.9669 6.31507 12.9669 8.89633C12.9669 9.01311 12.9669 9.12988 12.9669 9.316C13.1009 9.20044 13.1834 9.13597 13.2588 9.06298C14.5485 7.84169 15.8358 6.61796 17.1267 5.39789C17.5766 4.97214 18.0982 4.98309 18.4906 5.43681C20.6034 7.8794 22.264 10.592 23.2188 13.717C24.1352 16.7179 24.3458 19.7505 23.3049 22.749C21.7113 27.3398 18.4954 30.0536 13.7888 30.938C13.522 30.9878 13.248 30.9988 12.9717 31C13.8151 30.7604 14.5617 30.3614 15.1766 29.7288C16.0883 28.7898 16.5393 27.6633 16.5214 26.3399C16.4998 24.7305 15.8657 23.3621 14.9254 22.1152C14.2973 21.2832 13.5591 20.5631 12.7312 19.9378C12.1414 19.4914 11.8459 19.478 11.2489 19.9123C9.63493 21.0861 8.32847 22.5166 7.70754 24.4812C7.25292 25.9214 7.23377 27.3519 7.9875 28.7131C8.59646 29.8128 9.51051 30.539 10.6961 30.9112C10.7679 30.9331 10.8385 30.9562 10.9103 30.9793L10.9091 30.9769Z"
        fill="#FFFCEA"
      />
    </svg>
  )
}

export const courseIcon = (size?: 'small' | 'default') => {
  const width = size === 'small' ? 15 : 26
  const height = size === 'small' ? 13 : 23
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 26 23`}
      fill="none"
    >
      <path
        d="M0 0.5H7.2C8.47304 0.5 9.69394 1.01508 10.5941 1.93192C11.4943 2.84877 12 4.09227 12 5.38889V22.5C12 21.5275 11.6207 20.5949 10.9456 19.9073C10.2705 19.2196 9.35478 18.8333 8.4 18.8333H0V0.5Z"
        fill="white"
      />
      <path
        d="M26 0.5H18.8C17.527 0.5 16.3061 1.01508 15.4059 1.93192C14.5057 2.84877 14 4.09227 14 5.38889V22.5C14 21.5275 14.3793 20.5949 15.0544 19.9073C15.7295 19.2196 16.6452 18.8333 17.6 18.8333H26V0.5Z"
        fill="white"
      />
    </svg>
  )
}

export const likeIcon = (size?: 'small' | 'default') => {
  const width = size === 'small' ? 16 : 27
  const height = size === 'small' ? 16 : 27
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 27 27`}
      fill="none"
    >
      <path
        d="M16.75 10.25V5.91668C16.75 5.05473 16.3944 4.22808 15.7615 3.61858C15.1285 3.00909 14.2701 2.66668 13.375 2.66668L8.875 12.4167V24.3333H21.565C22.1076 24.3393 22.6342 24.1561 23.0476 23.8177C23.4611 23.4793 23.7336 23.0083 23.815 22.4917L25.3675 12.7417C25.4164 12.4311 25.3947 12.1141 25.3038 11.8125C25.2128 11.5108 25.0549 11.2318 24.8408 10.9948C24.6268 10.7578 24.3618 10.5684 24.0643 10.4398C23.7667 10.3112 23.4436 10.2465 23.1175 10.25H16.75Z"
        fill="#FCFCFC"
      />
      <path
        d="M2.90901 23.6987C3.33097 24.1051 3.90326 24.3333 4.5 24.3333H7.17181V12.4167H4.5C3.90326 12.4167 3.33097 12.645 2.90901 13.0513C2.48705 13.4576 2.25 14.0087 2.25 14.5834V22.1667C2.25 22.7413 2.48705 23.2924 2.90901 23.6987Z"
        fill="#FCFCFC"
      />
    </svg>
  )
}

export const dailyData = {
  streak: {
    icon: streakIcon,
    bgColor: '#FF5125',
    borderColor: '#FFA790',
    progressText: 'Current streak',
    claimText: 'Claim Daily Streak',
  },
  course: {
    icon: courseIcon,
    bgColor: '#16A34A',
    borderColor: '#BBF7D0',
    progressText: 'Learning course',
    completeText: 'Start Learning',
  },
  project: {
    icon: likeIcon,
    bgColor: '#2584FF',
    borderColor: '#A1DEFF',
    progressText: 'Likes Project',
    completeText: 'Likes Project',
  },
}

export const mileStoneData = {
  daily: {
    image: '/images/mission-center/daily_cover.png',
    imageActive: '/images/mission-center/daily_cover_active.png',
  },
  straight: {
    image: '/images/mission-center/straight_cover.png',
    imageActive: '/images/mission-center/straight_cover_active.png',
  },
  participate: {
    image: '/images/mission-center/participate_cover.png',
    imageActive: '/images/mission-center/participate_cover_active.png',
  },
  create: {
    image: '/images/mission-center/create_cover.png',
    imageActive: '/images/mission-center/create_cover_active.png',
  },
  hackathon: {
    image: '/images/mission-center/hackathon_cover.png',
    imageActive: '/images/mission-center/hackathon_cover_active.png',
  },
  coins: {
    image: '/images/mission-center/coins_cover.png',
    imageActive: '/images/mission-center/coins_cover_active.png',
  },
}
