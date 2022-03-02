import { HomeHeaderContent } from "./HomeHeader/HomeHeaderContent"
import { HomeHeaderImage } from "./HomeHeader/HomeHeaderImage"

export const HomeHeader = ({ popularServices }) => {
  return (
    <div className="flex flex-col gap-10 mx-auto w-11/12 lg:w-10/12 lg:flex-row">
      <HomeHeaderContent popularServices={popularServices} />
      <HomeHeaderImage />
    </div>
  )
}
