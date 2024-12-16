import './Loader.css';

type Props = {
  isLoading: boolean;
};

export function Loader(props: Props) {
  return <div className={props.isLoading ? 'loading' : 'hidden'} />;
}
