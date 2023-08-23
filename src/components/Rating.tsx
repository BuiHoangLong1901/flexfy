import { useEffect, useState } from "react";
import { StarIcon } from "../icon";
import { getReviewByProduct } from "../server-side/api";
import { ProductQuestion } from "./product-detail/ProductQuestion";
import { ProductReview } from "./product-detail/ProductReview";
import Tabs from "./tab";
interface RatingProps {
  rating: number;
  color?: string;
  width?: number;
  height?: number;
}
export const Rating = (props: RatingProps) => {
  const { rating, color = "#ffb4b4", width, height } = props;
  return (
    <ul className="product-rating">
      {Array.from(Array(5)).map((_, idx) => (
        <li className="rating-list" key={"star_" + idx}>
          <StarIcon
            width={width}
            height={height}
            fill={idx < rating ? color : "transparent"}
            stroke={color}
          />
        </li>
      ))}
    </ul>
  );
};

interface OptionProp {
  children: React.ReactNode;
  rating: number;
  text: string[];
}
export const ReviewOptionItem = ({ children, rating, text }: OptionProp) => {
  return (
    <div className="review-option-item">
      <div className="review-option-title">
        <div className="text-wrapper">{children}</div>
      </div>
      <div>
        <div className="stamped-review-2">
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              return (
                <div
                  className={`stamped-review-item ${rating > idx && "active"}`}
                  key={idx}
                ></div>
              );
            })}
        </div>
        <div className="review-size-wrap">
          {text.map((i, idx) => (
            <span key={idx}>{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RatingOverview = ({ slug }: { slug: string }) => {
  const [reviewOverview, setReviewOverview] = useState<ReviewsOverview | null>(
    null
  );
  const [form, setForm] = useState<{
    defaultValue?: number;
    review?: boolean;
    question?: boolean;
  }>({
    review: false,
    question: false,
    defaultValue: 0,
  });
  const fetchData = async () => {
    const data = await getReviewByProduct(slug);
    setReviewOverview(data);
  };
  useEffect(() => {
    slug && fetchData();
  }, [slug]);
  console.log(
    "%cRating.tsx line:85 reviewOverview",
    "color: #007acc;",
    reviewOverview
  );
  return (
    <>
      <div className="rating-header">
        <h3 className="component-title">customer review</h3>
        <div className="box">
          <span className="customer-say">
            Customers say: If you’re between sizes, size up in band and size
            down in cup!
          </span>
        </div>
      </div>
      <div className="rating-overview-wrap">
        <div className="container-1">
          <div className="star-number-wrapper">
            <div className="star-number">
              <h2>{reviewOverview?.averageReviews.toFixed(1)}</h2>
              <Rating
                rating={reviewOverview?.averageReviews!}
                width={28}
                height={28}
              />
            </div>
            <p>based on {reviewOverview?.totalRecords?.reviews || 0} reviews</p>
          </div>
          <div className="rating-count-wrap">
            {reviewOverview?.totalRatings?.map(
              ({ value, count }, idx: number) => {
                return (
                  <div
                    key={"rating_overview_" + idx}
                    className="review-wrapper"
                  >
                    <Rating
                      rating={value}
                      color="#777"
                      width={15}
                      height={15}
                    />
                    <div className="chart-number-wrapper">
                      <div className="chart-number-bg">
                        <div
                          className="chart-main"
                          style={{
                            width:
                              (count /
                                Number(
                                  reviewOverview?.totalRecords.reviews || 0
                                )) *
                                100 +
                              "%",
                          }}
                        />
                      </div>
                      <span>({count})</span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="container-2">
          <div className="review-size">
            <SizeOverview
              value={reviewOverview?.totalTrueToSize || 0}
              title="true to size"
              maxLabel="large"
              minLabel="small"
            />

            <SizeOverview
              value={reviewOverview?.totalTrueToBand || 0}
              title="true to size - band"
              maxLabel="tight"
              minLabel="loose"
            />

            <SizeOverview
              value={reviewOverview?.totalTrueToCup || 0}
              title="true to size - cup"
              maxLabel="large"
              minLabel="small"
            />
          </div>

          <div className="review-button">
            <button
              onClick={() => setForm({ review: true, defaultValue: 0 })}
              className="review"
            >
              <span>write a review</span>
            </button>
            <button
              onClick={() => setForm({ question: true, defaultValue: 1 })}
              className="question"
            >
              <span>ask a question</span>
            </button>
          </div>
        </div>
      </div>
      <Tabs
        defaultValue={form.defaultValue}
        handleChangeTab={(index: number) => {
          setForm((s) => ({
            defaultValue: index,
            question: false,
            review: false,
          }));
        }}
        tabs={[
          {
            label: "Reviews",
            render: <ProductReview showForm={form.review} slug={slug} />,
            value: reviewOverview?.totalRecords?.reviews || 0,
          },
          {
            label: "Questions",
            render: <ProductQuestion showForm={form.question} slug={slug} />,
            value: reviewOverview?.totalRecords?.questions || 0,
          },
        ]}
        className="rating-box"
      />
    </>
  );
};

const SizeOverview = (props: {
  title: string;
  value: number;
  maxLabel: string;
  minLabel: string;
}) => {
  const { title, maxLabel, minLabel, value = 0 } = props;
  return (
    <div className="container">
      <span className="title">{title}</span>
      <span className="option">
        <div
          className="value"
          style={{
            left: `calc(${value > 4 ? 100 : 25 * (value - 1)}% - 12px)`,
          }}
        ></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </span>
      <div className="description">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};
