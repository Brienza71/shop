import Image from "next/image";

const HomeBanner =  () =>{
    return (
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="md-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Promoção de Inverno</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Aproveite os descontos em produtos selecionados</p>
                    <p className="text-2xl md:text-5xl text-yellow-400 font-bold">ATÉ 50% OFF</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image
                    src='/banner-image.png'
                    fill
                    alt= 'Banner Image'
                    className="object-contain"
                    />                
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;