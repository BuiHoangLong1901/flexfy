export const NotFound = () => (
  <main
    className="page-not-found"
    style={{
      margin: "auto",
      width: "100%",
    }}
  >
    <section>
      <div className="content">
        <h1 className="error">404</h1>
        <h1 className="title">Page not found!</h1>
        <span className="go-home">
          <a aria-label="Return to home page" href="/">
            Go&nbsp;home?
          </a>
        </span>
      </div>
    </section>
  </main>
);
