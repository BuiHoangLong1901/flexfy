import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.9f4d6c5c.mjs';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { I as Image, S as SelectBox, g as getQuestionList, a as getRatingList, b as StarIcon, c as getReviewByProduct, d as ImageAnimation, C as CollapseAni, e as getColors, f as getSizes, h as getMenu, i as getListProducts, j as getCategoryBySlug, $ as $$Layout } from './_...any_.astro.60fe0e4b.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useInView } from 'react-intersection-observer';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const currencyFormat = (number, currency, maxFraction) => {
  return new Intl.NumberFormat("en-US", {
    style: currency && "currency",
    currency: currency ?? "USD",
    maximumFractionDigits: maxFraction ?? 0
  }).format(number);
};
const getDayTime = (inputDateStr) => {
  const dateObj = new Date(inputDateStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const outputDateStr = `${day}/${month}/${year}`;
  return outputDateStr;
};

const Question = ({
  dataQuestion
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "stamped-question-comment",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "question-comment-head",
      children: [/* @__PURE__ */ jsx("div", {
        className: "question-comment-head-wrap",
        children: /* @__PURE__ */ jsx("div", {
          className: "question-comment-name",
          children: dataQuestion.name
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "question-comment-time",
        children: getDayTime(dataQuestion.createdAt.toString())
      })]
    }), /* @__PURE__ */ jsx("p", {
      className: "question-comment-content",
      children: dataQuestion.question
    }), /* @__PURE__ */ jsxs("p", {
      className: "question-comment-name",
      children: ["Answers (", dataQuestion.answers.length || 0, ")"]
    }), dataQuestion.answers.length > 0 && /* @__PURE__ */ jsx("div", {
      children: dataQuestion.answers.map((a, idx) => {
        return /* @__PURE__ */ jsxs("div", {
          className: "question-answers",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "answers-header",
            children: [/* @__PURE__ */ jsx("p", {
              className: "question-comment-name",
              children: a.name
            }), /* @__PURE__ */ jsx("p", {
              className: "question-comment-time",
              children: getDayTime(a?.createdAt?.toString())
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "question-comment-content",
            children: a.answers
          })]
        }, a.name + idx);
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "question-comment-bot",
      children: /* @__PURE__ */ jsxs("div", {
        className: "stamped-question-rating",
        children: [/* @__PURE__ */ jsx("p", {
          children: "Was this helpful?"
        }), /* @__PURE__ */ jsxs("div", {
          className: "button-rate-question",
          children: [/* @__PURE__ */ jsx(Image, {
            ariaLabel: "icon_like",
            alt: "Icon",
            src: "/assets/icons/like.svg"
          }), /* @__PURE__ */ jsx("div", {
            className: "text-wrapper-3",
            children: dataQuestion.like
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "button-rate-question",
          children: [/* @__PURE__ */ jsx(Image, {
            ariaLabel: "icon_dislike",
            alt: "Icon",
            src: "/assets/icons/dislike.svg"
          }), /* @__PURE__ */ jsx("div", {
            className: "text-wrapper-3",
            children: dataQuestion.dislike
          })]
        })]
      })
    })]
  });
};
__astro_tag_component__(Question, "@astrojs/react");

const sizeOption = [
  { label: "Small", value: "small" },
  { label: "TRUE TO SIZE - Cup", value: "true-to-size" },
  { label: "Large", value: "large" }
];
const bandOption = [
  { label: "Tight ", value: "tight" },
  { label: "TRUE TO SIZE - BAND", value: "true-to-band" },
  { label: "Loose", value: "loose" }
];
const recentOption = [
  { label: "Sort", value: "sort" },
  { label: "Most Recent", value: "most-recent" },
  { label: "Highest Rating", value: "highest-rating" },
  { label: "Lowest Rating", value: "lowest-rating" },
  { label: "Most Helpful", value: "most-helpful" }
];
const MATCH_EMAIL = new RegExp(
  /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA]+)*$/
);

const QuestionFilter = () => {
  useState(true);
  const handleChange = (item) => {
    console.log(item);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "question-filter-wrap",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "search-form",
      children: [/* @__PURE__ */ jsx(Image, {
        ariaLabel: "search_icon",
        src: "/assets/icons/search.svg",
        alt: ""
      }), /* @__PURE__ */ jsx("input", {
        type: "text"
      })]
    }), /* @__PURE__ */ jsx(SelectBox, {
      IconEnd: /* @__PURE__ */ jsx(Image, {
        ariaLabel: "end_icon",
        src: "/assets/icons/left.svg",
        alt: "end_icon"
      }),
      onChange: handleChange,
      className: "filter-option-item",
      defaultValue: recentOption[1].value,
      items: recentOption
    })]
  });
};
__astro_tag_component__(QuestionFilter, "@astrojs/react");

const backdrop$2 = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};
const ProductQuestion = (props) => {
  const {
    slug,
    showForm
  } = props;
  const [questions, setQuestions] = useState(null);
  const fetchData = async () => {
    const data = await getQuestionList(slug);
    setQuestions(data);
  };
  useEffect(() => {
    slug && fetchData();
  }, [slug]);
  return /* @__PURE__ */ jsxs("div", {
    className: "question-wrap-list",
    children: [showForm && /* @__PURE__ */ jsx(FormQuestion, {}), /* @__PURE__ */ jsx(QuestionFilter, {}), questions?.data.map((data, idx) => /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(Question, {
        dataQuestion: data
      })
    }, "question-" + idx))]
  });
};
const FormQuestion = () => {
  return /* @__PURE__ */ jsxs(motion.form, {
    method: "post",
    id: "review-form",
    className: "new-review-form stamped-visible form-question",
    "aria-expanded": "true",
    variants: backdrop$2,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    children: [/* @__PURE__ */ jsxs("fieldset", {
      className: "stamped-form-contact",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "stamped-form-contact-name",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_author",
          children: "Name"
        }), /* @__PURE__ */ jsx("input", {
          className: "stamped-form-input stamped-form-input-text ",
          id: "review_author",
          type: "text",
          defaultValue: "",
          autoComplete: "name",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-contact-email",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_email",
          children: "Email"
        }), /* @__PURE__ */ jsx("input", {
          className: "stamped-form-input stamped-form-input-email ",
          id: "review_email",
          type: "email",
          autoComplete: "email",
          required: true
        })]
      })]
    }), /* @__PURE__ */ jsx("fieldset", {
      className: "stamped-form-review",
      children: /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-review-body",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_body",
          children: "question"
        }), /* @__PURE__ */ jsx("div", {
          className: "stamped-form-input",
          children: /* @__PURE__ */ jsx("textarea", {
            className: "stamped-form-input stamped-form-input-textarea",
            id: "review_body",
            name: "reviewMessage",
            rows: 10,
            maxLength: 5e3
          })
        })]
      })
    }), /* @__PURE__ */ jsx("button", {
      id: "stamped-button-submit",
      type: "submit",
      className: "stamped-button",
      children: "submit"
    })]
  });
};
__astro_tag_component__(ProductQuestion, "@astrojs/react");

const ReviewOption = ({
  data
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "review-option",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "review-option-list",
      children: [data.purchasedSize && /* @__PURE__ */ jsxs("div", {
        className: "review-option-item",
        children: [/* @__PURE__ */ jsx("div", {
          className: "review-option-title",
          children: /* @__PURE__ */ jsx("div", {
            className: "text-wrapper",
            children: "size purchased"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "review-option-content",
          children: `${data.purchasedSize}${data.cup}`
        })]
      }), data.purchasedSize && /* @__PURE__ */ jsxs("div", {
        className: "review-option-item",
        children: [/* @__PURE__ */ jsx("div", {
          className: "review-option-title",
          children: /* @__PURE__ */ jsx("div", {
            className: "text-wrapper",
            children: "usual size"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "review-option-content",
          children: `${data.purchasedSize}${data.cup}`
        })]
      }), /* @__PURE__ */ jsx(ReviewOptionItem, {
        text: ["Small", "True to Size", "Large"],
        rating: data.trueToSize,
        children: "true to size"
      }), /* @__PURE__ */ jsx(ReviewOptionItem, {
        text: ["Small", "True to Size", "Large"],
        rating: data.trueToSizeCup,
        children: "true to size - cup"
      }), /* @__PURE__ */ jsx(ReviewOptionItem, {
        text: ["Tight", "True to Band", "Loose"],
        rating: data.trueToSizeBand,
        children: "true to size - band"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "review-option-item",
      children: [/* @__PURE__ */ jsx("div", {
        className: "review-option-title",
        children: /* @__PURE__ */ jsx("div", {
          className: "text-wrapper",
          children: "PAIRS WELL WITH"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "review-option-content",
        children: data.pairsWellWith
      })]
    })]
  });
};
__astro_tag_component__(ReviewOption, "@astrojs/react");

const ReviewOverview = ({
  data
}) => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "review-comment-head",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "review-comment-head-wrap",
        children: [/* @__PURE__ */ jsx("div", {
          className: "review-comment-name",
          children: data.name
        }), /* @__PURE__ */ jsx("div", {
          className: "review-comment-title",
          children: data.status
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "review-comment-time",
        children: getDayTime(data.createdAt)
      })]
    }), /* @__PURE__ */ jsx(Rating, {
      rating: data.rating,
      width: 9.605,
      height: 9.605
    }), /* @__PURE__ */ jsx("p", {
      className: "heading-great",
      children: data.pairsWellWith
    }), /* @__PURE__ */ jsx("p", {
      className: "review-comment-content",
      children: data.description.slice(0, 20)
    })]
  });
};
__astro_tag_component__(ReviewOverview, "@astrojs/react");

const ReviewComment = ({
  dataComment
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "stamped-review-comment",
    children: [/* @__PURE__ */ jsx(ReviewOverview, {
      data: dataComment
    }), /* @__PURE__ */ jsxs("div", {
      className: "review-comment-bot",
      children: [/* @__PURE__ */ jsx(ReviewOption, {
        data: dataComment
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-review-rating",
        children: [/* @__PURE__ */ jsx("p", {
          children: "Was this helpful?"
        }), /* @__PURE__ */ jsxs("div", {
          className: "button-rate-review",
          children: [/* @__PURE__ */ jsx(Image, {
            ariaLabel: "icon_like",
            alt: "Icon",
            src: "/assets/icons/like.svg"
          }), /* @__PURE__ */ jsx("div", {
            className: "text-wrapper-3",
            children: dataComment.like
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "button-rate-review",
          children: [/* @__PURE__ */ jsx(Image, {
            ariaLabel: "icon_dislike",
            alt: "Icon",
            src: "/assets/icons/dislike.svg"
          }), /* @__PURE__ */ jsx("div", {
            className: "text-wrapper-3",
            children: dataComment.dislike
          })]
        })]
      })]
    })]
  });
};
__astro_tag_component__(ReviewComment, "@astrojs/react");

const ReviewFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const handleChange = (item) => {
    console.log(item);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "review-filter-wrap",
    children: [/* @__PURE__ */ jsx("div", {
      className: "filter-title",
      children: "Filter Reviews:"
    }), /* @__PURE__ */ jsxs("div", {
      className: "search-form",
      children: [/* @__PURE__ */ jsx(Image, {
        ariaLabel: "search_icon",
        src: "/assets/icons/search.svg",
        alt: ""
      }), /* @__PURE__ */ jsx("input", {
        type: "text"
      })]
    }), /* @__PURE__ */ jsx(AnimatePresence, {
      initial: true,
      children: isFilterOpen && /* @__PURE__ */ jsxs(motion.div, {
        initial: "collapsed",
        animate: "open",
        exit: "collapsed",
        variants: {
          open: {
            opacity: 1,
            height: "auto"
          },
          collapsed: {
            opacity: 0,
            height: 0
          }
        },
        transition: {
          duration: 0.2
        },
        className: "filter-option-wrap",
        children: [/* @__PURE__ */ jsx(SelectBox, {
          IconEnd: /* @__PURE__ */ jsx(Image, {
            ariaLabel: "end_icon",
            src: "/assets/icons/left.svg",
            alt: "end_icon"
          }),
          onChange: handleChange,
          className: "filter-option-item",
          defaultValue: sizeOption[1].value,
          items: sizeOption
        }), /* @__PURE__ */ jsx(SelectBox, {
          IconEnd: /* @__PURE__ */ jsx(Image, {
            ariaLabel: "end_icon",
            src: "/assets/icons/left.svg",
            alt: "end_icon"
          }),
          onChange: handleChange,
          className: "filter-option-item",
          defaultValue: bandOption[1].value,
          items: bandOption
        }), /* @__PURE__ */ jsx(SelectBox, {
          IconEnd: /* @__PURE__ */ jsx(Image, {
            ariaLabel: "end_icon",
            src: "/assets/icons/left.svg",
            alt: "end_icon"
          }),
          onChange: handleChange,
          className: "filter-option-item",
          defaultValue: recentOption[1].value,
          items: recentOption
        })]
      })
    }), /* @__PURE__ */ jsxs("button", {
      onClick: () => setIsFilterOpen(!isFilterOpen),
      children: [/* @__PURE__ */ jsx(Image, {
        ariaLabel: "filter_icon",
        src: "/assets/icons/filter.svg",
        alt: ""
      }), /* @__PURE__ */ jsx("span", {
        children: isFilterOpen ? "Hide Filters" : "More Filters"
      })]
    })]
  });
};
__astro_tag_component__(ReviewFilter, "@astrojs/react");

const backdrop$1 = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};
const ProductReview = (props) => {
  const {
    slug,
    showForm
  } = props;
  const [ratings, setRatings] = useState(null);
  const fetchData = async () => {
    const data = await getRatingList(slug);
    setRatings(data);
  };
  useEffect(() => {
    slug && fetchData();
  }, [slug]);
  if (!ratings)
    return /* @__PURE__ */ jsx(Fragment, {});
  return /* @__PURE__ */ jsxs("div", {
    className: "review-wrap-list",
    children: [showForm && /* @__PURE__ */ jsx(FormReview, {}), /* @__PURE__ */ jsx(ReviewFilter, {}), ratings?.data?.map((data, idx) => /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(ReviewComment, {
        dataComment: data
      })
    }, "review-comment" + idx))]
  });
};
const FormReview = () => {
  return /* @__PURE__ */ jsxs(motion.form, {
    method: "post",
    id: "review-form",
    className: "new-review-form stamped-visible",
    "aria-expanded": "true",
    variants: backdrop$1,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    children: [/* @__PURE__ */ jsxs("fieldset", {
      className: "stamped-form-contact",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "stamped-form-contact-name",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_author",
          children: "Name"
        }), /* @__PURE__ */ jsx("input", {
          className: "stamped-form-input stamped-form-input-text ",
          id: "review_author",
          type: "text",
          defaultValue: "",
          autoComplete: "name",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-contact-email",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_email",
          children: "Email"
        }), /* @__PURE__ */ jsx("input", {
          className: "stamped-form-input stamped-form-input-email ",
          id: "review_email",
          type: "email",
          autoComplete: "email",
          required: true
        })]
      })]
    }), /* @__PURE__ */ jsxs("fieldset", {
      className: "stamped-form-review",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "stamped-form-review-rating",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "reviewRating",
          children: "Rating"
        }), /* @__PURE__ */ jsx(Rating, {
          rating: 0
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-review-title",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_title",
          children: "Title of Review"
        }), /* @__PURE__ */ jsx("input", {
          className: "stamped-form-input stamped-form-input-text",
          id: "review_title",
          type: "text",
          name: "reviewTitle",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-review-body",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          htmlFor: "review_body",
          children: "How was your overall experience?"
        }), /* @__PURE__ */ jsx("div", {
          className: "stamped-form-input",
          children: /* @__PURE__ */ jsx("textarea", {
            className: "stamped-form-input stamped-form-input-textarea",
            id: "review_body",
            name: "reviewMessage",
            rows: 10,
            maxLength: 5e3
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs("fieldset", {
      className: "stamped-form-custom-questions",
      children: [/* @__PURE__ */ jsx("div", {
        className: "stamped-form-custom-question",
        "data-type": "textfield",
        children: /* @__PURE__ */ jsxs("label", {
          className: "stamped-form-label",
          children: ["SIZE PURCHASED", /* @__PURE__ */ jsx("input", {
            type: "text",
            name: "customFormOption",
            defaultValue: "",
            className: "stamped-form-input stamped-form-input-text"
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "stamped-form-custom-question",
        "data-type": "textfield",
        children: /* @__PURE__ */ jsxs("label", {
          className: "stamped-form-label",
          children: ["USUAL SIZE", /* @__PURE__ */ jsx("input", {
            type: "text",
            name: "customFormOption",
            defaultValue: "",
            className: "stamped-form-input stamped-form-input-text"
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-custom-question",
        "data-type": "scale",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          children: "TRUE TO SIZE (CUP)"
        }), /* @__PURE__ */ jsxs("div", {
          className: "stamped-form-custom-option-scale",
          children: [/* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 1
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 2
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 3
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 4
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 5
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "form-label-custom",
          children: [/* @__PURE__ */ jsx("div", {
            className: "form-label-radio",
            children: "Small"
          }), /* @__PURE__ */ jsx("div", {
            className: "form-label-radio",
            children: "True to Size"
          }), /* @__PURE__ */ jsx("div", {
            className: "form-label-radio",
            children: "Large"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "stamped-form-custom-question",
        "data-type": "scale",
        children: [/* @__PURE__ */ jsx("label", {
          className: "stamped-form-label",
          children: "TRUE TO SIZE (BAND)"
        }), /* @__PURE__ */ jsxs("div", {
          className: "stamped-form-custom-option-scale",
          children: [/* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 1
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 2
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 3
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 4
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "line"
          }), /* @__PURE__ */ jsx("label", {
            className: "label-form-scale",
            children: /* @__PURE__ */ jsx("input", {
              type: "radio",
              name: "customFormOption",
              defaultValue: 5
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "form-label-custom",
          children: [/* @__PURE__ */ jsx("div", {
            className: "form-label-radio",
            children: "tight"
          }), /* @__PURE__ */ jsx("div", {
            className: "form-label-radio",
            children: "True to Size"
          }), /* @__PURE__ */ jsx("div", {
            className: "form-label-radio",
            children: "loose"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "stamped-form-custom-question",
        "data-type": "textfield",
        children: /* @__PURE__ */ jsxs("label", {
          className: "stamped-form-label",
          children: ["PAIRS WELL WITH:", /* @__PURE__ */ jsx("input", {
            type: "text",
            name: "customFormOption",
            defaultValue: "",
            className: "stamped-form-input stamped-form-input-text"
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("button", {
      id: "stamped-button-submit",
      type: "submit",
      className: "stamped-button",
      children: "submit"
    })]
  });
};
__astro_tag_component__(ProductReview, "@astrojs/react");

function Tabs(props) {
  const {
    tabs,
    defaultValue = 0,
    handleChangeTab,
    className
  } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[defaultValue]);
  useEffect(() => {
    setSelectedTab(tabs[defaultValue]);
  }, [tabs, defaultValue]);
  return /* @__PURE__ */ jsxs("div", {
    className,
    children: [/* @__PURE__ */ jsx("div", {
      className: "tabs-container",
      children: /* @__PURE__ */ jsx("nav", {
        children: /* @__PURE__ */ jsx("ul", {
          children: tabs.map((item, index) => /* @__PURE__ */ jsxs("li", {
            className: item === selectedTab ? "selected" : "",
            onClick: () => {
              setSelectedTab(item);
              handleChangeTab && handleChangeTab(index);
            },
            children: [item.label, /* @__PURE__ */ jsx("div", {
              className: "header-value",
              children: /* @__PURE__ */ jsx("span", {
                className: "total-value",
                children: item.value || 0
              })
            }), item === selectedTab ? /* @__PURE__ */ jsx(motion.div, {
              className: "underline",
              layoutId: "underline"
            }) : null]
          }, item.label))
        })
      })
    }), /* @__PURE__ */ jsx(AnimatePresence, {
      mode: "wait",
      children: /* @__PURE__ */ jsx(motion.div, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        exit: {
          opacity: 0
        },
        transition: {
          duration: 0.5
        },
        children: selectedTab.render
      }, selectedTab ? selectedTab.label : "empty")
    })]
  });
}
__astro_tag_component__(Tabs, "@astrojs/react");

const Rating = (props) => {
  const {
    rating,
    color = "#ffb4b4",
    width,
    height
  } = props;
  return /* @__PURE__ */ jsx("ul", {
    className: "product-rating",
    children: Array.from(Array(5)).map((_, idx) => /* @__PURE__ */ jsx("li", {
      className: "rating-list",
      children: /* @__PURE__ */ jsx(StarIcon, {
        width,
        height,
        fill: idx < rating ? color : "transparent",
        stroke: color
      })
    }, "star_" + idx))
  });
};
const ReviewOptionItem = ({
  children,
  rating,
  text
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "review-option-item",
    children: [/* @__PURE__ */ jsx("div", {
      className: "review-option-title",
      children: /* @__PURE__ */ jsx("div", {
        className: "text-wrapper",
        children
      })
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("div", {
        className: "stamped-review-2",
        children: Array(5).fill(0).map((_, idx) => {
          return /* @__PURE__ */ jsx("div", {
            className: `stamped-review-item ${rating > idx && "active"}`
          }, idx);
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "review-size-wrap",
        children: text.map((i, idx) => /* @__PURE__ */ jsx("span", {
          children: i
        }, idx))
      })]
    })]
  });
};
const RatingOverview = ({
  slug
}) => {
  const [reviewOverview, setReviewOverview] = useState(null);
  const [form, setForm] = useState({
    review: false,
    question: false,
    defaultValue: 0
  });
  const fetchData = async () => {
    const data = await getReviewByProduct(slug);
    setReviewOverview(data);
  };
  useEffect(() => {
    slug && fetchData();
  }, [slug]);
  console.log("%cRating.tsx line:85 reviewOverview", "color: #007acc;", reviewOverview);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "rating-header",
      children: [/* @__PURE__ */ jsx("h3", {
        className: "component-title",
        children: "customer review"
      }), /* @__PURE__ */ jsx("div", {
        className: "box",
        children: /* @__PURE__ */ jsx("span", {
          className: "customer-say",
          children: "Customers say: If you’re between sizes, size up in band and size down in cup!"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "rating-overview-wrap",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "container-1",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "star-number-wrapper",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "star-number",
            children: [/* @__PURE__ */ jsx("h2", {
              children: reviewOverview?.averageReviews.toFixed(1)
            }), /* @__PURE__ */ jsx(Rating, {
              rating: reviewOverview?.averageReviews,
              width: 28,
              height: 28
            })]
          }), /* @__PURE__ */ jsxs("p", {
            children: ["based on ", reviewOverview?.totalRecords?.reviews || 0, " reviews"]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "rating-count-wrap",
          children: reviewOverview?.totalRatings?.map(({
            value,
            count
          }, idx) => {
            return /* @__PURE__ */ jsxs("div", {
              className: "review-wrapper",
              children: [/* @__PURE__ */ jsx(Rating, {
                rating: value,
                color: "#777",
                width: 15,
                height: 15
              }), /* @__PURE__ */ jsxs("div", {
                className: "chart-number-wrapper",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "chart-number-bg",
                  children: /* @__PURE__ */ jsx("div", {
                    className: "chart-main",
                    style: {
                      width: count / Number(reviewOverview?.totalRecords.reviews || 0) * 100 + "%"
                    }
                  })
                }), /* @__PURE__ */ jsxs("span", {
                  children: ["(", count, ")"]
                })]
              })]
            }, "rating_overview_" + idx);
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "container-2",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "review-size",
          children: [/* @__PURE__ */ jsx(SizeOverview, {
            value: reviewOverview?.totalTrueToSize || 0,
            title: "true to size",
            maxLabel: "large",
            minLabel: "small"
          }), /* @__PURE__ */ jsx(SizeOverview, {
            value: reviewOverview?.totalTrueToBand || 0,
            title: "true to size - band",
            maxLabel: "tight",
            minLabel: "loose"
          }), /* @__PURE__ */ jsx(SizeOverview, {
            value: reviewOverview?.totalTrueToCup || 0,
            title: "true to size - cup",
            maxLabel: "large",
            minLabel: "small"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "review-button",
          children: [/* @__PURE__ */ jsx("button", {
            onClick: () => setForm({
              review: true,
              defaultValue: 0
            }),
            className: "review",
            children: /* @__PURE__ */ jsx("span", {
              children: "write a review"
            })
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => setForm({
              question: true,
              defaultValue: 1
            }),
            className: "question",
            children: /* @__PURE__ */ jsx("span", {
              children: "ask a question"
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(Tabs, {
      defaultValue: form.defaultValue,
      handleChangeTab: (index) => {
        setForm((s) => ({
          defaultValue: index,
          question: false,
          review: false
        }));
      },
      tabs: [{
        label: "Reviews",
        render: /* @__PURE__ */ jsx(ProductReview, {
          showForm: form.review,
          slug
        }),
        value: reviewOverview?.totalRecords?.reviews || 0
      }, {
        label: "Questions",
        render: /* @__PURE__ */ jsx(ProductQuestion, {
          showForm: form.question,
          slug
        }),
        value: reviewOverview?.totalRecords?.questions || 0
      }],
      className: "rating-box"
    })]
  });
};
const SizeOverview = (props) => {
  const {
    title,
    maxLabel,
    minLabel,
    value = 0
  } = props;
  return /* @__PURE__ */ jsxs("div", {
    className: "container",
    children: [/* @__PURE__ */ jsx("span", {
      className: "title",
      children: title
    }), /* @__PURE__ */ jsxs("span", {
      className: "option",
      children: [/* @__PURE__ */ jsx("div", {
        className: "value",
        style: {
          left: `calc(${value > 4 ? 100 : 25 * (value - 1)}% - 12px)`
        }
      }), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {})]
    }), /* @__PURE__ */ jsxs("div", {
      className: "description",
      children: [/* @__PURE__ */ jsx("span", {
        children: minLabel
      }), /* @__PURE__ */ jsx("span", {
        children: maxLabel
      })]
    })]
  });
};
__astro_tag_component__(Rating, "@astrojs/react");
__astro_tag_component__(ReviewOptionItem, "@astrojs/react");
__astro_tag_component__(RatingOverview, "@astrojs/react");

const variants$2 = {
  enter: {
    opacity: 0,
    translateX: "none"
  },
  center: {
    zIndex: 1,
    opacity: 1
  },
  exit: {
    zIndex: 0,
    opacity: 0.5,
    translateX: "none"
  }
};
const CardProduct = (props) => {
  const {
    className,
    product,
    extraComponent
  } = props;
  const [optionIndex, setOptionIndex] = useState(0);
  return /* @__PURE__ */ jsxs("div", {
    id: "product",
    className,
    children: [/* @__PURE__ */ jsx("div", {
      className: "product-thumbnail",
      children: /* @__PURE__ */ jsxs("a", {
        href: "/products/" + product.slug,
        children: [product?.options && /* @__PURE__ */ jsx("div", {
          className: "product-image",
          children: /* @__PURE__ */ jsx(ImageAnimation, {
            src: product?.options[optionIndex]?.thumbnail ?? "",
            ariaLabel: "product-thumbnail",
            alt: `thumbnail_${product.name}_${optionIndex}`,
            transition: {
              opacity: {
                duration: 0.5,
                delay: 0.2
              }
            },
            initial: "enter",
            animate: "center",
            variants: variants$2
          }, optionIndex)
        }), product.isNew && /* @__PURE__ */ jsx("div", {
          className: "product-new-arrival",
          children: /* @__PURE__ */ jsx("span", {
            children: "NEW ARRIVAL"
          })
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "product-content",
      children: [product.rating && /* @__PURE__ */ jsxs("div", {
        className: "product-star",
        children: [/* @__PURE__ */ jsx(Rating, {
          rating: product.rating
        }), /* @__PURE__ */ jsxs("span", {
          className: "product-review",
          children: [product.totalRating, " Reviews"]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "product-title",
        children: /* @__PURE__ */ jsx("span", {
          children: product.name
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "product-price",
        children: [product.originalPrice && /* @__PURE__ */ jsx("span", {
          className: "original-price",
          children: currencyFormat(product.originalPrice, "USD")
        }), /* @__PURE__ */ jsx("span", {
          children: currencyFormat(product.price, "USD")
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "product-options",
        children: /* @__PURE__ */ jsx("ul", {
          className: "product-options-list",
          children: product?.options?.map((option, idx) => /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx("div", {
              className: `circle ${idx === optionIndex && "active"}`,
              style: {
                background: option.color
              },
              onClick: () => setOptionIndex(idx)
            })
          }, "product_options_" + option.code))
        })
      }), extraComponent]
    })]
  });
};
const CardCategory = (props) => {
  const {
    category
  } = props;
  return /* @__PURE__ */ jsxs("div", {
    id: "category",
    className: "card-category category-section",
    children: [/* @__PURE__ */ jsx("div", {
      className: "card-image",
      children: /* @__PURE__ */ jsx(Image, {
        src: category.url,
        ariaLabel: "card-thumbnail",
        alt: category.name
      })
    }), /* @__PURE__ */ jsx("a", {
      className: "card-button",
      href: "collections" + category.path,
      children: /* @__PURE__ */ jsx("span", {
        children: category.name
      })
    })]
  });
};
const CardProductRaving = (props) => {
  const {
    item
  } = props;
  return /* @__PURE__ */ jsxs("div", {
    className: "product-raving",
    children: [/* @__PURE__ */ jsx("div", {
      className: "product-thumbnail",
      children: /* @__PURE__ */ jsx("a", {
        href: "/products/" + item.product.slug,
        children: /* @__PURE__ */ jsx("div", {
          className: "product-image",
          children: /* @__PURE__ */ jsx(Image, {
            src: item.product.thumbnail,
            ariaLabel: "product-thumbnail",
            alt: item.product.name
          })
        })
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "product-content",
      children: [/* @__PURE__ */ jsx("div", {
        className: "product-star",
        children: /* @__PURE__ */ jsx(Rating, {
          rating: item.rating
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "product-rate",
        children: /* @__PURE__ */ jsxs("span", {
          children: ["“", item.comment, "”"]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "product-author",
        children: /* @__PURE__ */ jsx("span", {
          children: item.name
        })
      }), /* @__PURE__ */ jsx("a", {
        href: "/products/" + item.product.slug,
        className: "product-shop-style",
        children: "SHOP STYLE"
      })]
    })]
  });
};
__astro_tag_component__(CardProduct, "@astrojs/react");
__astro_tag_component__(CardCategory, "@astrojs/react");
__astro_tag_component__(CardProductRaving, "@astrojs/react");

const backdrop = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};
const Modal = ({
  showModal,
  children,
  className
}) => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(AnimatePresence, {
      children: showModal && /* @__PURE__ */ jsx(motion.div, {
        className: `modal-container ${className}`,
        variants: backdrop,
        initial: "hidden",
        animate: "visible",
        exit: "hidden",
        children
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "drawler",
      style: {
        width: "100%",
        height: "100%",
        backgroundColor: "grey",
        opacity: 0.5
      }
    })]
  });
};
__astro_tag_component__(Modal, "@astrojs/react");

const boxVariant$3 = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  },
  hidden: {
    opacity: 0,
    x: -10
  }
};
const Category = ({
  data,
  slug
}) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  if (!data || !data?.name)
    return /* @__PURE__ */ jsx(Fragment, {});
  return /* @__PURE__ */ jsx(motion.div, {
    ref,
    variants: boxVariant$3,
    initial: "hidden",
    animate: control,
    className: "category-container",
    children: /* @__PURE__ */ jsx(CollapseAni, {
      collapseKey: "menu_collapse",
      btnText: data.name,
      className: {
        header: "header"
      },
      headerIcon: Number(data.subMenu.length) > 0,
      defaultOpen: true,
      children: /* @__PURE__ */ jsx(Fragment, {
        children: data?.subMenu?.map((item, idx) => /* @__PURE__ */ jsx("div", {
          onClick: () => setSelected(item),
          className: "item",
          children: /* @__PURE__ */ jsx("span", {
            style: {
              color: selected?.slug == item?.slug ? "black" : "",
              fontWeight: selected?.slug == item?.slug ? "bold" : ""
            },
            className: "item-text",
            children: item.name
          })
        }, "menu_" + idx))
      })
    })
  });
};
__astro_tag_component__(Category, "@astrojs/react");

const useProductOptionStore = create()(
  persist(
    (set, get) => ({
      sizes: [],
      colors: [],
      categories: [],
      menu: [],
      footer: [],
      addOption: (name, data) => set({ [name]: data })
    }),
    {
      name: "product-option",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const boxVariant$2 = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.6
    }
  },
  hidden: {
    opacity: 0,
    x: -30
  }
};
const Color = ({
  slug
}) => {
  const control = useAnimation();
  const {
    addOption: setColors,
    colors
  } = useProductOptionStore();
  const [selected, setSelected] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getColors();
    setColors("colors", data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!colors || colors.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsxs(motion.div, {
    ref,
    variants: boxVariant$2,
    initial: "hidden",
    animate: control,
    className: "color-container",
    children: [/* @__PURE__ */ jsx("div", {
      className: "header",
      children: /* @__PURE__ */ jsx("span", {
        children: "FILTER BY COLOR"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "content",
      children: colors?.map((item, idx) => /* @__PURE__ */ jsxs("div", {
        onClick: () => {
          setSelected(item);
        },
        className: "item",
        children: [/* @__PURE__ */ jsx("span", {
          className: "item-color",
          style: {
            backgroundColor: item.color,
            borderColor: selected?.color == item.color ? "black" : ""
          }
        }), /* @__PURE__ */ jsx("span", {
          style: {
            fontWeight: selected?.color == item.color ? "bold" : ""
          },
          className: "item-text",
          children: item.name
        })]
      }, "color_" + idx))
    })]
  });
};
__astro_tag_component__(Color, "@astrojs/react");

const boxVariant$1 = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.8
    }
  },
  hidden: {
    opacity: 0,
    x: -40
  }
};
const Size = ({
  slug
}) => {
  const {
    addOption: setSizes,
    sizes
  } = useProductOptionStore();
  const control = useAnimation();
  const [selected, setSelected] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getSizes();
    setSizes("sizes", data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!sizes || sizes.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsxs(motion.div, {
    ref,
    variants: boxVariant$1,
    initial: "hidden",
    animate: control,
    className: "size-container",
    children: [/* @__PURE__ */ jsx("div", {
      className: "header",
      children: /* @__PURE__ */ jsx("span", {
        children: "FILTER BY SIZE"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "content",
      children: sizes?.map((item, idx) => /* @__PURE__ */ jsx("div", {
        onClick: () => {
          setSelected(item);
        },
        style: {
          backgroundColor: selected?.code == item.code ? "#ffb4b4" : ""
        },
        className: "item item-size",
        children: /* @__PURE__ */ jsx("span", {
          className: "item-text",
          children: item.name
        })
      }, "size_" + idx))
    })]
  });
};
__astro_tag_component__(Size, "@astrojs/react");

const boxVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.4
    }
  },
  hidden: {
    opacity: 0,
    x: -20
  }
};
const Menu = () => {
  const control = useAnimation();
  const {
    addOption: setMenu,
    menu
  } = useProductOptionStore();
  const [selected, setSelected] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getMenu();
    console.log("%cMenu.tsx line:20 data", "color: #007acc;", data);
    setMenu("menu", data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!menu || menu.length == 0) && fetchData();
    }
  }, [control, inView]);
  if (!menu)
    return /* @__PURE__ */ jsx(Fragment, {});
  return /* @__PURE__ */ jsx(motion.div, {
    ref,
    variants: boxVariant,
    initial: "hidden",
    animate: control,
    className: "menu-container",
    children: /* @__PURE__ */ jsx(CollapseAni, {
      collapseKey: "category",
      className: {
        header: "header"
      },
      btnText: "Category",
      headerIcon: Number(menu?.length) > 0,
      defaultOpen: true,
      children: /* @__PURE__ */ jsx(Fragment, {
        children: menu?.map((item, idx) => /* @__PURE__ */ jsx("div", {
          onClick: () => {
            setSelected(item);
          },
          className: "item",
          children: /* @__PURE__ */ jsx("span", {
            style: {
              color: selected?.slug == item?.slug ? "black" : "",
              fontWeight: selected?.slug == item.slug ? "bold" : ""
            },
            className: "item-text",
            children: item.name
          })
        }, "category_" + item.name + "_" + idx))
      })
    })
  });
};
__astro_tag_component__(Menu, "@astrojs/react");

const variants$1 = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};
const FilterModal = ({
  slug,
  category
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return /* @__PURE__ */ jsxs(AnimatePresence, {
    initial: false,
    onExitComplete: () => null,
    children: [/* @__PURE__ */ jsx(motion.div, {
      transition: {
        opacity: {
          duration: 0.5,
          delay: 0.4
        }
      },
      initial: "hidden",
      animate: "visible",
      variants: variants$1,
      className: "filter-container",
      onClick: () => setModalOpen(true),
      children: /* @__PURE__ */ jsxs("span", {
        className: "filter-text",
        children: ["choose your size ", /* @__PURE__ */ jsx("span", {
          className: "filter-icon",
          children: "+"
        })]
      })
    }), modalOpen && /* @__PURE__ */ jsxs(Modal, {
      cl: true,
      showModal: modalOpen,
      setShowModal: () => setModalOpen(true),
      children: [/* @__PURE__ */ jsxs("div", {
        className: "modal-header",
        children: [/* @__PURE__ */ jsx("span", {
          className: "title",
          children: "FILTER BY"
        }), /* @__PURE__ */ jsx("span", {
          onClick: () => setModalOpen(false),
          className: "close",
          children: "X"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "modal-content",
        children: [/* @__PURE__ */ jsx(Category, {
          data: category,
          slug
        }), /* @__PURE__ */ jsx(Menu, {}), /* @__PURE__ */ jsx(Color, {
          slug
        }), /* @__PURE__ */ jsx(Size, {
          slug
        }), /* @__PURE__ */ jsx("div", {
          className: "modal-footer",
          children: /* @__PURE__ */ jsxs("span", {
            className: "modal-button",
            onClick: () => setModalOpen(!modalOpen),
            children: [/* @__PURE__ */ jsx("span", {
              children: "X"
            }), /* @__PURE__ */ jsx("span", {
              children: "Close"
            })]
          })
        })]
      })]
    })]
  });
};
__astro_tag_component__(FilterModal, "@astrojs/react");

const Pagination = (props) => {
  const {
    onChange,
    totalRecords,
    defaultValue,
    pageSize
  } = props;
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const totalPages = Number(totalRecords) / Number(pageSize);
  const onChangePage = (page) => {
    onChange && onChange(page);
    setValue(page);
  };
  return /* @__PURE__ */ jsxs("div", {
    id: "pagination",
    children: [Number(value) > 1 && /* @__PURE__ */ jsx("span", {
      onClick: () => onChangePage(Number(value) - 1),
      className: "prev",
      children: "Prev"
    }), /* @__PURE__ */ jsxs("div", {
      className: "page-index",
      children: [Number(value) >= 3 && /* @__PURE__ */ jsx("span", {
        onClick: () => onChangePage(1),
        children: "1"
      }), Number(value) >= 3 && /* @__PURE__ */ jsx("span", {
        className: "no-index",
        children: "..."
      }), Array.from({
        length: Number(totalPages.toFixed(0))
      }, (_, i) => {
        const index = i + 1;
        if (index == Number(value) - 1 || index == Number(value) + 1 || index == value)
          return /* @__PURE__ */ jsx("span", {
            onClick: () => {
              if (index == value)
                return;
              onChangePage(index);
            },
            className: `${index == value && "active"}`,
            children: index
          });
        return /* @__PURE__ */ jsx(Fragment, {});
      }), Number(totalPages) - Number(value) >= 2 && /* @__PURE__ */ jsx("span", {
        className: "no-index",
        children: "..."
      }), Number(totalPages) - Number(value) >= 1 && /* @__PURE__ */ jsx("span", {
        onClick: () => onChangePage(Number(totalPages.toFixed(0))),
        children: totalPages.toFixed(0)
      })]
    }), Number(value) * Number(pageSize) < Number(totalRecords) && /* @__PURE__ */ jsx("span", {
      onClick: () => onChangePage(Number(value) + 1),
      className: "next",
      children: "Next"
    })]
  });
};
__astro_tag_component__(Pagination, "@astrojs/react");

const variants = {
  enter: {
    opacity: 0
  },
  center: {
    zIndex: 1,
    opacity: 1
  }
};
const Products = (props) => {
  const {
    category,
    slug
  } = props;
  const [column, setColumn] = useState(4);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  const handleClickColumn = (value) => setColumn(value);
  const fetchProductList = async (query) => {
    setLoading(true);
    setProducts(null);
    const response = await getListProducts(query);
    setProducts(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchProductList();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(ImageAnimation, {
      ariaLabel: "product-thumbnail",
      alt: `thumbnail_${slug}`,
      transition: {
        opacity: {
          duration: 0.5,
          delay: 0.2
        }
      },
      initial: "enter",
      animate: "center",
      variants,
      className: "banner",
      src: category?.banner
    }), /* @__PURE__ */ jsx(FilterModal, {
      category,
      slug
    }), /* @__PURE__ */ jsxs(motion.div, {
      transition: {
        opacity: {
          duration: 0.5,
          delay: 0.7
        }
      },
      initial: "enter",
      animate: "center",
      variants,
      className: "product-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "header-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "title",
          children: category?.name
        }), /* @__PURE__ */ jsx("span", {
          className: "description",
          children: category?.description
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "header-column",
        children: [/* @__PURE__ */ jsx(ColumnComponent, {
          handleClick: handleClickColumn,
          value: 2,
          active: column == 2
        }), /* @__PURE__ */ jsx(ColumnComponent, {
          handleClick: handleClickColumn,
          value: 4,
          active: column == 4
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: loading ? 0.2 : 1
      },
      className: `product-list-container ${column == 2 ? "grid_2" : "grid_4"} `,
      children: !!products?.data.length ? /* @__PURE__ */ jsx(Fragment, {
        children: products?.data.map((product, index) => {
          return /* @__PURE__ */ jsx(motion.div, {
            transition: {
              opacity: {
                duration: 0.5,
                delay: 0.2 + (index / 10 + 0.2)
              }
            },
            initial: "enter",
            animate: "center",
            variants,
            children: /* @__PURE__ */ jsx(CardProduct, {
              className: "product-card",
              product
            })
          });
        })
      }) : /* @__PURE__ */ jsx(Fragment, {})
    }), /* @__PURE__ */ jsx(Pagination, {
      onChange: (page) => fetchProductList({
        page
      }),
      totalRecords: products?.pagination.totalRecords,
      pageSize: products?.pagination.pageSize,
      defaultValue: products?.pagination.page
    })]
  });
};
const ColumnComponent = (props) => {
  const {
    value,
    active,
    handleClick
  } = props;
  return /* @__PURE__ */ jsx("span", {
    onClick: () => handleClick(value),
    className: `text ${active && "active"}`,
    children: value
  });
};
__astro_tag_component__(Products, "@astrojs/react");

const $$Astro$1 = createAstro("https://flexfy.meta-book.online");
const $$slug$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$slug$1;
  const { slug } = Astro2.params;
  const category = await getCategoryBySlug(slug);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": slug?.toLocaleUpperCase() }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="collection-container"><div class="collection-left">${renderComponent($$result2, "Category", Category, { "client:load": true, "data": category, "slug": slug, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/Category", "client:component-export": "Category" })}${renderComponent($$result2, "Menu", Menu, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/Menu", "client:component-export": "Menu" })}${renderComponent($$result2, "Color", Color, { "client:load": true, "slug": slug, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/ListColor", "client:component-export": "Color" })}${renderComponent($$result2, "Size", Size, { "client:load": true, "slug": slug, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/ListSize", "client:component-export": "Size" })}</div><div class="collection-right">${renderComponent($$result2, "Products", Products, { "client:load": true, "slug": slug, "category": category, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/Products", "client:component-export": "Products" })}</div></div>` })}`;
}, "D:/src/src/pages/collections/[slug].astro", void 0);

const $$file$1 = "D:/src/src/pages/collections/[slug].astro";
const $$url$1 = "/collections/[slug]";

const _slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const title = slug?.replace(/-/g, " ").replace(/\b[a-z]/g, function(slug2) {
    return slug2.toUpperCase();
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Flexfy - ${title ?? "Product Detail"}` }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div id="productDetail">${renderComponent($$result2, "ProductDetail", null, { "slug": slug, "client:only": "react", "client:component-hydration": "only", "client:component-path": "D:/src/src/components/product-detail", "client:component-export": "ProductDetail" })}</div>` })}`;
}, "D:/src/src/pages/products/[slug].astro", void 0);

const $$file = "D:/src/src/pages/products/[slug].astro";
const $$url = "/products/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { CardProduct as C, MATCH_EMAIL as M, _slug_$1 as _, CardCategory as a, CardProductRaving as b, _slug_ as c };
