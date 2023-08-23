import { ReviewOptionItem } from "../Rating"
export const ReviewOption = ({ data }: {data: Review}) => {
  return (
    <div className="review-option">
      <div className="review-option-list">
      {data.purchasedSize && (
          <div className="review-option-item">
            <div className="review-option-title">
              <div className="text-wrapper">size purchased</div>
            </div>
            <div className="review-option-content">
              {`${data.purchasedSize}${data.cup}`}
            </div>
          </div>
        )}
        {data.purchasedSize && (
          <div className="review-option-item">
            <div className="review-option-title">
              <div className="text-wrapper">usual size</div>
            </div>
            <div className="review-option-content">
              {`${data.purchasedSize}${data.cup}`}
            </div>
          </div>
        )}
        <ReviewOptionItem text={["Small", "True to Size", "Large"]}  rating={data.trueToSize}>
          true to size
        </ReviewOptionItem>
        <ReviewOptionItem text={["Small", "True to Size", "Large"]}  rating={data.trueToSizeCup}>
          true to size - cup
        </ReviewOptionItem>
        <ReviewOptionItem text={["Tight", "True to Band", "Loose"]}  rating={data.trueToSizeBand}>
          true to size - band
        </ReviewOptionItem>
      </div>
      <div className="review-option-item">
        <div className="review-option-title">
          <div className="text-wrapper">PAIRS WELL WITH</div>
        </div>
        <div className="review-option-content">{data.pairsWellWith}</div>
      </div>
    </div>
  )
}