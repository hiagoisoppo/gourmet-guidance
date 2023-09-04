import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LogoSM from '../../images/logosm.svg';

function NotFound() {
  return (
    <main
      className="d-flex h-100 flex-column justify-content-start
      align-items-center w-100"
    >
      <Header title="Not Found" showSearch={ false } />
      <img src={ LogoSM } alt="logo" className="w-100" />
      <Footer />
    </main>
  );
}

export default NotFound;
