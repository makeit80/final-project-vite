import {Helmet} from 'react-helmet-async';
type metaTagProps = {
  title: string;
  image: string;
  url: string;
  description: string;
};
const MetaTag = ({title, image, url, description}: metaTagProps) => {
  return (
    <Helmet>
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content="wepsite" />
    </Helmet>
  );
};

export default MetaTag;
