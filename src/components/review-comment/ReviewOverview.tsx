import { getDayTime } from "../../utils";
import { Rating } from "../Rating";
export const ReviewOverview = ({ data }: { data: Review }) => {
  return (
    <>
      <div className="review-comment-head">
        <div className="review-comment-head-wrap">
          <div className="review-comment-name">{data.name}</div>
          <div className="review-comment-title">{data.status}</div>
        </div>
        <div className="review-comment-time">{getDayTime(data.createdAt)}</div>
      </div>
      <Rating rating={data.rating} width={9.605} height={9.605}></Rating>
      <p className="heading-great">{data.pairsWellWith}</p>
      <p className="review-comment-content">{data.description.slice(0, 20)}</p>
    </>
  );
};
