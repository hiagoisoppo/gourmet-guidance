import Footer from '../../components/Footer';
import Header from '../../components/Header/index';

function Profile() {
  return (
    <div>
      <Header title="Profile" showSearch={ false } />
      <h1>Perfil</h1>
      <Footer />
    </div>
  );
}

export default Profile;
