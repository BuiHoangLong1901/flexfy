import { Image } from "../Image";

export default function Menu({ slug, data }: { slug: string; data?: Menu[] }) {
  return (
    <div className="menu" id="nav-menu">
      <div className="list">
        <div className="item-link">
          <div className="label-event">
            <span className="text-wrapper text-event">
              SUMMER VIBE COLLECTION
              <span className="text-wrapper text-event-2">2023</span>
            </span>
          </div>
          <span className="toggle-menu close-icon">
            <Image
              src="/assets/icons/x.svg"
              alt="close_icon"
              ariaLabel="close_icon"
              width={20}
              height={26}
            />
          </span>
        </div>
        {data &&
          data.map((item, index) => (
            <a
              key={"menu_" + item + "_" + index}
              href={"/collections/" + item.slug}
              className={`bras-wrapper ${item.slug === slug && "active"}`}
            >
              <span className="menu-title">{item.name}</span>
            </a>
          ))}
      </div>
    </div>
  );
}
