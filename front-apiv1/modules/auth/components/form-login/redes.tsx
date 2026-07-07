import Image from "next/image";

const Redes = () => {
  return (
    <div className="flex justify-center gap-2">
      <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100">
        <Image
          src="/icon-gmail.svg"
          alt="Google Icon"
          width={20}
          height={20}
          className=""
        />
      </button>
      <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100">
        <Image
          src="/icon-linkedin.svg"
          alt="Apple Icon"
          width={20}
          height={20}
          className=""
        />
      </button>
      <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100">
        <Image
          src="/icon-mac-os.svg"
          alt="Apple Icon"
          width={20}
          height={20}
          className=""
        />
      </button>
    </div>
  );
}

export default Redes;