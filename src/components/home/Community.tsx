import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getCommunities } from "../../server-side/api";
import { Image } from "../Image";

export const Community = () => {
  const [ref, inView] = useInView();
  const [communities, setCommunities] = useState<string[] | null>(null);
  const fetchData = async () => {
    const data = await getCommunities();
    setCommunities(data);
  };

  useEffect(() => {
    if (inView) {
      !communities && fetchData();
    }
  }, [inView]);
  return (
    <div className="home-community" ref={ref}>
      <div className="home-community-header">
        <motion.div
          className="home-community-join"
          initial={{ opacity: 0, translateX: 30 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>join the community</h2>
          {/* <a href={"kols"}>
            <button>Become our KOLs</button>
          </a> */}
        </motion.div>
        <motion.div
          className="home-community-social"
          initial={{ opacity: 0, translateX: -30 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button className="home-community-ista">
            <Image
              ariaLabel="Instagram-Icon"
              src="/assets/icons/Instagram-4.svg"
              alt="Instagram"
            />
          </button>
          <button className="home-community-tiktok">
            <Image
              ariaLabel="Tiktok-Icon"
              className="home-community-tiktok-img"
              src="/assets/icons/tiktok-1.svg"
              alt="Tiktok"
            />
          </button>
        </motion.div>
      </div>
      <div className="home-community-images">
        <div className="home-community-wrapper">
          {communities &&
            communities.length !== 0 &&
            communities.map((url: string, index: number) => (
              <motion.div
                className="home-community-img"
                key={"home_community_" + index}
                initial={{ opacity: 0, translateY: 30 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              >
                <Image
                  src={url}
                  alt={"home_community"}
                  ariaLabel={"home_community"}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
