import { StarFilled } from "@ant-design/icons";

const Stars = ({stars}) => {
  const starsComponents = []
  for (let i=0; i<stars; i++) {
    starsComponents.push(<StarFilled key={i} />)
  }
  return starsComponents
}

export default Stars