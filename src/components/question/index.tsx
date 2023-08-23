import { getDayTime } from "../../utils";
import { Image } from "../Image";
export const Question = ({ dataQuestion }: { dataQuestion: Question }) => {
  return (
    <div className="stamped-question-comment">
      <div className="question-comment-head">
        <div className="question-comment-head-wrap">
          <div className="question-comment-name">{dataQuestion.name}</div>
        </div>
        <div className="question-comment-time">
          {getDayTime(dataQuestion.createdAt.toString())}
        </div>
      </div>
      <p className="question-comment-content">{dataQuestion.question}</p>
      <p className="question-comment-name">
        Answers ({dataQuestion.answers.length || 0})
      </p>
      {dataQuestion.answers.length > 0 && (
        <div>
          {dataQuestion.answers.map((a, idx) => {
            return (
              <div key={a.name + idx} className="question-answers">
                <div className="answers-header">
                  <p className="question-comment-name">{a.name}</p>
                  <p className="question-comment-time">
                    {getDayTime(a?.createdAt?.toString())}
                  </p>
                </div>
                <p className="question-comment-content">{a.answers}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="question-comment-bot">
        <div className="stamped-question-rating">
          <p>Was this helpful?</p>
          <div className="button-rate-question">
            <Image
              ariaLabel="icon_like"
              alt="Icon"
              src="/assets/icons/like.svg"
            />
            <div className="text-wrapper-3">{dataQuestion.like}</div>
          </div>
          <div className="button-rate-question">
            <Image
              ariaLabel="icon_dislike"
              alt="Icon"
              src="/assets/icons/dislike.svg"
            />
            <div className="text-wrapper-3">{dataQuestion.dislike}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
