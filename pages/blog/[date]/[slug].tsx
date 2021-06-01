import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";

const Entry = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <dl>
      <dt>props</dt>
      <dd>{JSON.stringify(props)}</dd>
      <dt>router.query</dt>
      <dd>{JSON.stringify(router.query)}</dd>
    </dl>
  );
};

type Params = {
  date: string;
  slug: string;
};

export const getStaticProps = async ({ params }: { params: Params }) => {
  return {
    props: { ...params },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export default Entry;
