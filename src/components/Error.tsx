interface Props {
  error: string;
}

const ProductNotFound = ({ error }: Props) => {
  return (
    <div className="w-full h-80 flex flex-col items-center justify-center">
      <h4 className="text-16 md:text-xl tracking-wide font-semibold text-main-color">
        {error}
      </h4>
    </div>
  );
};

export { ProductNotFound };
