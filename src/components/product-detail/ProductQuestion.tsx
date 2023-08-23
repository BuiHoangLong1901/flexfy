import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getQuestionList } from "../../server-side/api";
import { Question } from "../question";
import { QuestionFilter } from "../question/QuestionFilter";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

type State = { data: Question[]; pagination: IPagination } | null;

type Props = { slug: string; showForm?: boolean };
export const ProductQuestion = (props: Props) => {
  const { slug, showForm } = props;
  const [questions, setQuestions] = useState<State>(null);

  const fetchData = async () => {
    const data = await getQuestionList(slug);
    setQuestions(data);
  };
  useEffect(() => {
    slug && fetchData();
  }, [slug]);
  return (
    <div className="question-wrap-list">
      {showForm && <FormQuestion />}
      <QuestionFilter />
      {questions?.data.map((data, idx) => (
        <div key={"question-" + idx}>
          <Question dataQuestion={data} />
        </div>
      ))}
    </div>
  );
};

const FormQuestion = () => {
  return (
    <motion.form
      method="post"
      id="review-form"
      className="new-review-form stamped-visible form-question"
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
        <div className="stamped-form-review-body">
          <label className="stamped-form-label" htmlFor="review_body">
            question
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
