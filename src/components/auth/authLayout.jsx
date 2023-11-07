import logo from "../../assets/Paylony logo 1.png"
export const AuthLayout =({children,adjHeight,style})=>{
    return(
        <div className={`${adjHeight?"ht-100":" h-screen"} authLayout py-3 flex justify-cebter items-center `}>
            <div className={`${style? style:"mx-auto lg:w-2/6 xl:w-2/6 md:w-2/6 sm:w-full xs:w-full xxs:w-full"} p-3`}>
                <div className="mb-4 m-auto w-fit">
                    <img 
                        src={logo}
                        alt="object not found"
                        className="w-17 h-17"
                    />
                </div>
                <div className="overflow-auto bg-white rounded-lg p-10 ">
                    {children}
                </div>
            </div>
        </div>
    )
}