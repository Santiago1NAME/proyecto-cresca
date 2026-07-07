import Redes from "./redes";
import Footer from "./footer";
import FormLogin from "./form";
import Header from "./header";

const Login = () => {
  return (
    <div className="flex flex-col h-full justify-between items-center py-10 lg:w-1/2 lg:mx-auto">
      <Header />
      <div className="w-90 flex flex-col">
        <FormLogin />
        <div className="flex items-center gap-4 my-5">
          <div className="h-px flex-1 bg-border" />
            <p className="text-sm text-muted-foreground whitespace-nowrap">O continuar con</p>
          <div className="h-px flex-1 bg-border" />
        </div>
        <Redes />
      </div>
      <Footer />
    </div>
  );
}

export default Login;