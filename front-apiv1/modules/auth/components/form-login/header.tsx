import Image from "next/image";

const Header = () => {
    return(
        <div className="flex items-center">
            <Image src="/globe.svg" alt="SmartSave Logo" width={50} height={50} className="mr-5" />
            <h1 className="text-3xl font-bold">SmartSave</h1>
        </div>
    )
}

export default Header;