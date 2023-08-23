import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRatingList } from "../../server-side/api";
import { Rating } from "../Rating";
import { ReviewComment } from "../review-comment";
import { ReviewFilter } from "../review-comment/ReviewFilter";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
type State = { data: Review[]; pagination: IPagination } | null;
type Props = { slug: string; showForm?: boolean };

export const ProductReview = (props: Props) => {
  const { slug, showForm } = props;
  const [ratings, setRatings] = useState<State>(null);

  const fetchData = async () => {
    const data = await getRatingList(slug);
    setRatings(data);
  };
  useEffect(() => {
    slug && fetchData();
  }, [slug]);
  if (!ratings) return <></>;
  return (
    <div className="review-wrap-list">
      {showForm && <FormReview />}
      <ReviewFilter />
      {ratings?.data?.map((data, idx) => (
        <div key={"review-comment" + idx}>
          <ReviewComment dataComment={data} />
        </div>
      ))}
    </div>
  );
};

const FormReview = () => {
  return (
    <motion.form
      method="post"
      id="review-form"
      className="new-review-form stamped-visible"
      aria-expanded="true"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <fieldset className="stamped-form-contact">
        <div className="stamped-form-contact-name">
          <label className="stamped-form-label" htmlFor="review_author">
            Name
          </label>
          <input
            className="stamped-form-input stamped-form-input-text "
            id="review_author"
            type="text"
            defaultValue=""
            autoComplete="name"
            required
          />
        </div>
        <div className="stamped-form-contact-email">
          <label className="stamped-form-label" htmlFor="review_email">
            Email
          </label>
          <input
            className="stamped-form-input stamped-form-input-email "
            id="review_email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </fieldset>
      <fieldset className="stamped-form-review">
        <div className="stamped-form-review-rating">
          <label className="stamped-form-label" htmlFor="reviewRating">
            Rating
          </label>
          <Rating rating={0} />
        </div>
        <div className="stamped-form-review-title">
          <label className="stamped-form-label" htmlFor="review_title">
            Title of Review
          </label>
          <input
            className="stamped-form-input stamped-form-input-text"
            id="review_title"
            type="text"
            name="reviewTitle"
            required
          />
        </div>
        <div className="stamped-form-review-body">
          <label className="stamped-form-label" htmlFor="review_body">
            How was your overall experience?
          </label>
          <div className="stamped-form-input">
            <textarea
              className="stamped-form-input stamped-form-input-textarea"
              id="review_body"
              name="reviewMessage"
              rows={10}
              maxLength={5000}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="stamped-form-custom-questions">
        <div className="stamped-form-custom-question" data-type="textfield">
          <label className="stamped-form-label">
            SIZE PURCHASED
            <input
              type="text"
              name="customFormOption"
              defaultValue=""
              className="stamped-form-input stamped-form-input-text"
            />
          </label>
        </div>
        <div className="stamped-form-custom-question" data-type="textfield">
          <label className="stamped-form-label">
            USUAL SIZE
            <input
              type="text"
              name="customFormOption"
              defaultValue=""
              className="stamped-form-input stamped-form-input-text"
            />
          </label>
        </div>
        <div className="stamped-form-custom-question" data-type="scale">
          <label className="stamped-form-label">TRUE TO SIZE (CUP)</label>
          <div className="stamped-form-custom-option-scale">
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={1} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={2} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={3} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={4} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={5} />
            </label>
          </div>
          <div className="form-label-custom">
            <div className="form-label-radio">Small</div>
            <div className="form-label-radio">True to Size</div>
            <div className="form-label-radio">Large</div>
          </div>
        </div>
        <div className="stamped-form-custom-question" data-type="scale">
          <label className="stamped-form-label">TRUE TO SIZE (BAND)</label>
          <div className="stamped-form-custom-option-scale">
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={1} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={2} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={3} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={4} />
            </label>
            <div className="line" />
            <label className="label-form-scale">
              <input type="radio" name="customFormOption" defaultValue={5} />
            </label>
          </div>
          <div className="form-label-custom">
            <div className="form-label-radio">tight</div>
            <div className="form-label-radio">True to Size</div>
            <div className="form-label-radio">loose</div>
          </div>
        </div>
        <div className="stamped-form-custom-question" data-type="textfield">
          <label className="stamped-form-label">
            PAIRS WELL WITH:
            <input
              type="text"
              name="customFormOption"
              defaultValue=""
              className="stamped-form-input stamped-form-input-text"
            />
          </label>
        </div>
      </fieldset>
      <button
        id="stamped-button-submit"
        type="submit"
        className="stamped-button"
      >
        submit
      </button>
    </motion.form>
  );
};
