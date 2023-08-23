type Props = {
  data?: { title?: string; description?: string }[];
};
export const ProductFeature = ({ data }: Props) => {
  if (!data || data.length <= 0) return <></>;
  return (
    <div className="product-detail-feature">
      <h3 className="product-detail-feature-title">key features</h3>
      <ul className="product-detail-feature-list">
        {data?.map((feature, index) => {
          return (
            <li key={"feature_" + index}>
              <div className="product-detail-index">{index + 1}</div>
              <div className="product-detail-content">
                <p>{feature.title}</p>
                <span>{feature.description}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
