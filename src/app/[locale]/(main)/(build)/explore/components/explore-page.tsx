import ExploreHackathon from './explore-hackathon'
import ExploreHeader from './explore-header'
import ExploreHighlight from './explore-highlight'

const HackathonExplorePage = () => {
  return (
    <div className="px-6 sm:container">
      <ExploreHeader />
      <ExploreHighlight />
      <ExploreHackathon />
    </div>
  )
}

export default HackathonExplorePage
