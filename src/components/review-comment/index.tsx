import { Image } from "../Image";
import { ReviewOption } from "./ReviewOption";
import { ReviewOverview } from "./ReviewOverview";
export const ReviewComment = ({ dataComment }: { dataComment: Review }) => {
  return (
    <div className="stamped-review-comment">
      <ReviewOverview data={dataComment} />
      <div className="review-comment-bot">
        <ReviewOption data={dataComment} />
        <div className="stamped-review-rating">
          <p>Was this helpful?</p>
          <div className="button-rate-review">
            <Image ariaLabel="icon_like" alt="Icon" src="/assets/icons/like.svg" />
            <div className="text-wrapper-3">{dataComment.like}</div>
          </div>
          <div className="button-rate-review">
            <Image ariaLabel="icon_dislike" alt="Icon" src="/assets/icons/dislike.svg" />
            <div className="text-wrapper-3">{dataComment.dislike}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
