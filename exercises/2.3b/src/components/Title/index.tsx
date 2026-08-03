interface TitleProps {
  title:string;
};

const Title = (props: TitleProps) => {
  return (
     <h1>{props.title}</h1>
  );
};

export default Title;