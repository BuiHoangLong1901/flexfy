import { useEffect, useState } from "react";
import Modal from "../modal";
import { Image } from "../Image";

export const FindSizeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeBtn = document.querySelector(
      'div[role="button"].js-SizeChart-close'
    );
    closeBtn?.addEventListener("click", () => setIsOpen(false));
    return () => closeBtn?.removeEventListener("click", () => setIsOpen(false));
  }, [isOpen]);

  return (
    <>
      <Modal
        showModal={isOpen}
        id="findSize"
        className="shipping-modal-container"
      >
        <div className="shipping-modal">
          <div className="modal-header">
            <h2 className="modal-title">Find Your Size</h2>
            <Image
              src="/assets/icons/x.svg"
              alt="close-icon"
              ariaLabel="close-icon"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="NewSizeChart-content">
            <p>
              Not sure about your bra size? Dont sweat it! It takes 2 minutes to
              find the perfect size and you can do it right at home.
            </p>
            <div className="NewSizeChart-video">
              <iframe
                src="https://player.vimeo.com/video/803094822?h=2191a4e2bb&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                title="01_Lively Fit Guide 16x9 FINAL"
              />
            </div>
            <h2 className="NewSizeChart-title" tabIndex={0}>
              Getting Started
            </h2>
            <p>
              Stand in front of the mirror wearing your best fitting, least
              padded bra and grab a soft measuring tape.
            </p>
            <h2 className="NewSizeChart-title" tabIndex={0}>
              Step 1 - Find Your Band Size
            </h2>
            <img
              className="NewSizeChart-image"
              src="https://www.wearlively.com/s/files/1/1115/6560/files/03_Step_One_01.jpg?v=1677076983&em-origin=cdn.shopify.com&em-format=avif"
              alt="Step One - Find Your Band Size"
              decoding="async"
            />
            <p>
              Wrap a soft measuring tape around your back, just below the
              shoulder blades and under your bust. Pull to a snug fit and take
              that measurement.
              <br />
              Use this number to find your <strong>band size</strong> on the
              chart below.
            </p>
            <div className="NewSizeChart-table NewSizeChart-table--bras">
              <header className="NewSizeChart-table-header NewSizeChart-table-header--bras">
                <h3 tabIndex={0}>underbust</h3> <h3 tabIndex={0}>band size</h3>
              </header>
              <div className="NewSizeChart-table-body NewSizeChart-table-body--bras">
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    27-28"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    32
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    29-30"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    34
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    31-32"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    36
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    33-35"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    38
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    36-38"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    40
                  </div>
                </div>
              </div>
            </div>
            <h2 className="NewSizeChart-title" tabIndex={0}>
              Step 2 - Measure Your Bust Size
            </h2>
            <img
              className="NewSizeChart-image"
              src="https://www.wearlively.com/s/files/1/1115/6560/files/05_Step_Two_01.jpg?v=1677076942&em-origin=cdn.shopify.com&em-format=avif"
              alt="Step Two - Measure your bust size"
              decoding="async"
            />
            <p>
              Slide the measuring tape up your back, across the shoulder blades
              and around the fullest part of your bust. Hold loosely without
              pressing into the skin.
              <br />
              Note this measurement. This is your <strong>bust size.</strong>
            </p>
            <h2 className="NewSizeChart-title" tabIndex={0}>
              Step 3 - Find Your Cup Size
            </h2>
            <p>
              Find your cup size by subtracting your <strong>band size</strong>
              from your
              <strong>bust size.</strong> Use the difference to determine your
              cup size on the chart below.
            </p>
            <div className="NewSizeChart-table NewSizeChart-table--bras">
              <header className="NewSizeChart-table-header NewSizeChart-table-header--bras">
                <h3 tabIndex={0}>difference</h3> <h3 tabIndex={0}>cup size</h3>
              </header>
              <div className="NewSizeChart-table-body NewSizeChart-table-body--cups">
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    1"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    A
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    2"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    B
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    3"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    C
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    4"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    D
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    5"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    DD
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    6"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    DDD
                  </div>
                </div>
                <div className="NewSizeChart-cell NewSizeChart-cell--bras">
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    7"
                  </div>
                  <div className="NewSizeChart-subcell" tabIndex={0}>
                    G
                  </div>
                </div>
              </div>
            </div>
            <div className="NewSizeChart-grabAsister" id="sister" tabIndex={0}>
              <header>
                <h3 className="NewSizeChart-subtitle">Grab A Sister</h3>
                <div className="NewSizeChart-text">
                  Band size too tight? Cup size too small? Enter your size below
                  to find out your sister size.
                </div>
              </header>
              <div className="NewSizeChart-sisterForm">
                <input
                  className="NewSizeChart-sisterSize"
                  type="text"
                  placeholder="Enter your current size"
                  aria-label="Enter your current size"
                />
                <br />
                <button
                  className="button NewSizeChart-btnSister "
                  type="submit"
                >
                  Find your sister!
                </button>
              </div>
              <div
                className="NewSizeChart-sistersWrap"
                style={{ display: "none" }}
              >
                <p className="NewSizeChart-sisters" style={{ display: "none" }}>
                  If your band is too tight, try a
                  <span className="NewSizeChart-band" />
                </p>
                <p className="NewSizeChart-sisters" style={{ display: "none" }}>
                  If your band is too loose, try a
                  <span className="NewSizeChart-cup" />
                </p>
                <p
                  className="NewSizeChart-sisters--sorry"
                  style={{ display: "none" }}
                >
                  We don`t carry that sister size :(
                </p>
                <p
                  className="NewSizeChart-sisters--single"
                  style={{ display: "none" }}
                >
                  Here`s your sister: <span className="NewSizeChart-single" />
                </p>
              </div>
            </div>
            <div className="NewSizeChart-content" style={{ marginTop: "4rem" }}>
              <h2 className="NewSizeChart-title" tabIndex={0}>
                Flex No-Wire Bras
              </h2>
              <div className="NewSizeChart-text">
                Now that you`e got your cup size, this will be a piece a of
                cake. Find your size below.
              </div>
              <div
                className="NewSizeChart-table flex-no-table"
                role="table"
                aria-label="Size Chart"
                aria-rowcount={1}
                aria-describedby="NewSizeChart-title"
              >
                <header className="flex-no-table NewSizeChart-table-header">
                  <h3 tabIndex={0}>XS</h3> <h3 tabIndex={0}>S</h3>
                  <h3 tabIndex={0}>M</h3>
                  <h3 tabIndex={0}>L</h3>
                </header>
                <div className="NewSizeChart-table-body" role="row">
                  <div className="NewSizeChart-cell" role="cell" tabIndex={0}>
                    32A
                    <br />
                    32B
                    <br />
                    <br />
                    34A
                  </div>
                  <div className="NewSizeChart-cell" role="cell" tabIndex={0}>
                    32C
                    <br />
                    32D
                    <br />
                    <br />
                    34B
                    <br />
                    34C
                    <br />
                    <br />
                    36A
                    <br />
                    36B
                  </div>
                  <div className="NewSizeChart-cell" role="cell" tabIndex={0}>
                    32C
                    <br />
                    32D
                    <br />
                    32DD
                    <br />
                    <br />
                    34C
                    <br />
                    34D
                    <br />
                    34DD
                    <br />
                    <br />
                    36A
                    <br />
                    36B
                  </div>
                  <div className="NewSizeChart-cell" role="cell" tabIndex={0}>
                    34D
                    <br />
                    34DD
                    <br />
                    <br />
                    36C
                    <br />
                    36D
                    <br />
                    <br />
                    38B
                    <br />
                    38C
                  </div>
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="button NewSizeChart-btn js-SizeChart-close"
            >
              close
            </div>
          </div>
        </div>
      </Modal>
      <span
        className="product-detail-choose"
        onClick={() => setIsOpen(!isOpen)}
      >
        find my size
      </span>
    </>
  );
};
