import Image from 'next/image';
import Login from '@/modules/auth/components/form-login/login';


const Home = () => {
  return (
    <div className="flex flex-col justify-between lg:flex-row h-screen">
      <div className="lg:w-1/2 h-screen flex justify-center items-center">
        <Login />
      </div>
      <div className="hidden lg:inline lg:w-1/2 relative">
        <Image src="/porsh.jpg" alt="Cresca Logo" fill
          className="mx-auto"
        />
      </div>
    </div>
  );
}

export default Home;