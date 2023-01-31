import RatingStarItem from "./RatingStarItem";

const Index = (props) => {
  let { rating } = props;
  const rendered = [];

  for (let i = 4; i >= 0; i--) {
    rendered.push(<RatingStarItem rating={rating} key={i} />);
    rating -= 1;
  }

  return <ul className="d-flex">{rendered}</ul>;
};

export default Index;
